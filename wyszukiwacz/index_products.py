import psycopg2
import chromadb
from sentence_transformers import SentenceTransformer
import uuid # Can keep for other potential uses
from decimal import Decimal
import os
from dotenv import load_dotenv

# --- Configuration ---
# load_dotenv() # Uncomment if needed

# PostgreSQL Connection Details
DB_NAME = "postgres"
DB_USER = "admin"
DB_PASSWORD = 12345
DB_HOST = "postgres-db"
DB_PORT = "5432"
TABLE_NAME = "products" # Make sure this matches your actual table name

# Vector DB Configuration
CHROMA_PATH = "./product_chroma_db"
COLLECTION_NAME = "product_embeddings"

# Embedding Model Configuration
EMBEDDING_MODEL_NAME = 'paraphrase-multilingual-mpnet-base-v2'

# --- Helper Functions ---

def connect_db():
    """Establishes connection to the PostgreSQL database."""
    try:
        conn = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT
        )
        print("Successfully connected to PostgreSQL.")
        return conn
    except psycopg2.DatabaseError as e:
        print(f"PostgreSQL connection error: {e}")
        return None

def fetch_all_products(conn):
    """Fetches all product data from the database using the new schema with 'id'."""
    products = []
    if not conn:
        return products
    try:
        with conn.cursor() as cursor:
            # --- CORRECTED: Selecting the 'id' column ---
            select_query = f"""
                SELECT
                    id,  -- <<< USING the correct unique ID column name
                    name,
                    photoUrl,
                    price,
                    currency,
                    description,
                    category,
                    person_id,
                    actionType
                FROM {TABLE_NAME};
            """
            # ---------------------------------------------
            cursor.execute(select_query)
            colnames = [desc[0] for desc in cursor.description]
            for row in cursor.fetchall():
                products.append(dict(zip(colnames, row)))
        print(f"Fetched {len(products)} products from PostgreSQL.")
    except psycopg2.Error as e:
        print(f"Error fetching products from PostgreSQL: {e}")
        print("Check if the table structure and column names are correct.")
    return products

def create_product_embedding_text(product):
    """Creates a single text string for embedding using new field names."""
    parts = [
        f"Nazwa: {product.get('name', '')}",
        f"Kategoria: {product.get('category', '')}",
        f"Typ Oferty: {product.get('actionType', '')}",
        f"Opis: {product.get('description', '')}",
    ]
    return "\n".join(filter(None, parts))

def get_embedding_model():
    """Loads the Sentence Transformer model."""
    print(f"Loading embedding model: {EMBEDDING_MODEL_NAME}...")
    try:
        model = SentenceTransformer(EMBEDDING_MODEL_NAME)
        print("Embedding model loaded.")
        return model
    except Exception as e:
        print(f"Error loading embedding model: {e}")
        return None

def get_chroma_collection(clear_existing=False):
    """Initializes ChromaDB client and gets/creates the collection."""
    print(f"Initializing ChromaDB client (persistent path: {CHROMA_PATH})...")
    try:
        client = chromadb.PersistentClient(path=CHROMA_PATH)
        if clear_existing:
             try:
                 print(f"Attempting to delete existing collection: {COLLECTION_NAME}...")
                 client.delete_collection(name=COLLECTION_NAME)
                 print(f"Collection {COLLECTION_NAME} deleted.")
             except Exception as delete_err:
                 if "does not exist" in str(delete_err).lower():
                      print(f"Collection {COLLECTION_NAME} did not exist, proceeding to create.")
                 else:
                     print(f"Warning: Could not delete collection {COLLECTION_NAME}: {delete_err}")

        print(f"Getting or creating Chroma collection: {COLLECTION_NAME}...")
        collection = client.get_or_create_collection(
            name=COLLECTION_NAME,
            metadata={"hnsw:space": "cosine"}
        )
        print(f"Using Chroma collection: {collection.name} (Initial Count: {collection.count()})")
        return collection
    except Exception as e:
        print(f"Error initializing ChromaDB: {e}")
        return None

def index_products_batch(collection, model, products):
    """Generates embeddings and indexes products using 'id' column."""
    if not products:
        print("No products provided for indexing.")
        return

    print(f"Preparing to index {len(products)} products...")
    # --- CORRECTED: Use 'id' column for Chroma IDs ---
    ids_to_index = [str(p['id']) for p in products] # Convert the integer ID to string for Chroma
    # -------------------------------------------------
    texts_to_index = [create_product_embedding_text(p) for p in products]
    metadatas_to_index = [{"name": p.get('name'), "category": p.get('category')} for p in products]

    print("Checking for existing IDs in ChromaDB...")
    try:
        existing_items = collection.get(ids=ids_to_index, include=[])
        existing_ids = set(existing_items['ids'])
        print(f"Found {len(existing_ids)} existing IDs that will be skipped.")
    except Exception as e:
        print(f"Warning: Could not efficiently check for existing IDs: {e}. Proceeding to add all.")
        existing_ids = set()

    new_ids = []
    new_texts = []
    new_metadatas = []
    for i, prod_id in enumerate(ids_to_index):
        if prod_id not in existing_ids:
            new_ids.append(prod_id)
            new_texts.append(texts_to_index[i])
            new_metadatas.append(metadatas_to_index[i])

    if not new_ids:
        print("No new products to index.")
        return

    print(f"Generating embeddings for {len(new_ids)} new products...")
    try:
        embeddings = model.encode(new_texts, show_progress_bar=True, batch_size=32)
    except Exception as e:
        print(f"Error generating embeddings: {e}")
        return

    print(f"Adding {len(new_ids)} new embeddings to Chroma collection in batches...")
    batch_size = 500
    added_count = 0
    batch_ids = [] # Define batch_ids outside the loop for the except block
    try:
        for i in range(0, len(new_ids), batch_size):
            batch_ids = new_ids[i:i + batch_size]
            batch_embeddings = embeddings[i:i + batch_size]
            batch_metadatas = new_metadatas[i:i + batch_size]
            if not batch_ids: continue
            print(f"  Adding batch {i//batch_size + 1} ({len(batch_ids)} items)...")
            collection.add(
                ids=batch_ids,
                embeddings=batch_embeddings.tolist(),
                metadatas=batch_metadatas
            )
            added_count += len(batch_ids)
        print(f"Successfully added {added_count} items to Chroma.")
    except Exception as e:
        print(f"Error adding batch embeddings to Chroma: {e}")
        if batch_ids:
             print(f"Attempted to add IDs starting with: {batch_ids[:5]}...")


# --- Main Execution ---
if __name__ == "__main__":
    print("--- Starting Product Indexing Process ---")

    CLEAR_EXISTING_COLLECTION = True # Set True to wipe Chroma collection first

    db_conn = connect_db()
    if not db_conn:
        print("Exiting due to database connection failure.")
        exit(1)

    products = fetch_all_products(db_conn)
    db_conn.close()
    print("PostgreSQL connection closed.")

    if not products:
        print("No products found in the database to index. Exiting.")
        exit(0)

    embedding_model = get_embedding_model()
    if not embedding_model:
        print("Exiting due to embedding model loading failure.")
        exit(1)

    chroma_collection = get_chroma_collection(clear_existing=CLEAR_EXISTING_COLLECTION)
    if not chroma_collection:
        print("Exiting due to ChromaDB initialization failure.")
        exit(1)

    index_products_batch(chroma_collection, embedding_model, products)

    try:
        final_count = chroma_collection.count()
        print(f"--- Indexing Process Finished ---")
        print(f"Chroma collection '{COLLECTION_NAME}' now contains {final_count} items.")
    except Exception as e:
         print(f"Could not get final count from Chroma collection: {e}")