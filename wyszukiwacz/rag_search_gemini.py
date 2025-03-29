import psycopg2
import chromadb
from sentence_transformers import SentenceTransformer
import google.generativeai as genai
# import uuid # No longer strictly needed if using integer IDs
from decimal import Decimal
import os
from dotenv import load_dotenv
import textwrap
import subprocess
# import json # Uncomment if parsing JSON output

# --- Configuration ---
load_dotenv()

# PostgreSQL Connection Details
DB_NAME = "postgres"
DB_USER = "admin"
DB_PASSWORD = 12345
DB_HOST = "postgres-db"
DB_PORT = "5432"
TABLE_NAME = "products"

# Vector DB Configuration
CHROMA_PATH = "./product_chroma_db"
COLLECTION_NAME = "product_embeddings"

# Embedding Model Configuration
EMBEDDING_MODEL_NAME='paraphrase-multilingual-mpnet-base-v2'

# LLM Configuration
LLM_PROVIDER = "google"
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
GEMINI_MODEL_NAME = "gemini-1.5-flash"

# Search Configuration
TOP_K_RESULTS = 20

# API Key Check
if LLM_PROVIDER == "google" and not GOOGLE_API_KEY:
    raise ValueError("Google API key not found. Set GOOGLE_API_KEY in .env file.")

# --- Helper Functions ---

def connect_db():
    """Establishes connection to the PostgreSQL database."""
    try:
        conn = psycopg2.connect(
            dbname=DB_NAME, user=DB_USER, password=DB_PASSWORD, host=DB_HOST, port=DB_PORT
        )
        return conn
    except psycopg2.DatabaseError as e:
        print(f"PostgreSQL connection error: {e}")
        return None

def fetch_products_by_ids(conn, ids):
    """Fetches specific products by their integer IDs."""
    if not ids or not conn: return []
    products = []
    try:
        with conn.cursor() as cursor:
            try:
                int_ids = [int(id_val) for id_val in ids]
                placeholders = ', '.join(['%s'] * len(int_ids))
            except ValueError:
                print(f"Error: Retrieved IDs from Chroma are not valid integers: {ids}")
                return []

            query = f"""
                SELECT id, name, photourl, price, currency, description, category, person_id, actiontype
                FROM {TABLE_NAME} WHERE id IN ({placeholders});
            """
            cursor.execute(query, tuple(int_ids))
            colnames = [desc[0].lower() for desc in cursor.description]
            results = cursor.fetchall()
            if results:
                fetched_map = {row[colnames.index('id')]: dict(zip(colnames, row)) for row in results}
                products = [fetched_map.get(id_val) for id_val in int_ids if fetched_map.get(id_val)]
    except psycopg2.Error as e: print(f"Error fetching products by IDs from PostgreSQL: {e}")
    except IndexError: print(f"Error: Could not find 'id' column in results. Columns found: {colnames}")
    return products

def get_embedding_model():
    """Loads the Sentence Transformer model."""
    print(f"Loading embedding model: {EMBEDDING_MODEL_NAME}...")
    try:
        model = SentenceTransformer(EMBEDDING_MODEL_NAME)
        print("Embedding model loaded.")
        return model
    except Exception as e: print(f"Error loading embedding model: {e}"); return None


def get_chroma_collection():
    """Initializes ChromaDB client and gets the collection."""
    print(f"Initializing ChromaDB client (persistent path: {CHROMA_PATH})...")
    try:
        client = chromadb.PersistentClient(path=CHROMA_PATH)
        print(f"Getting Chroma collection: {COLLECTION_NAME}...")
        collection = client.get_collection(name=COLLECTION_NAME)
        print(f"Using Chroma collection: {collection.name} (Count: {collection.count()})")
        
        # Check if the collection is empty
        if collection.count() == 0:
            print("\nWARNING: ChromaDB collection is empty! Running 'index_products.py' to populate it...\n")
            # Run index_products.py as a subprocess
            result = subprocess.run(
                ["python", "index_products.py"],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            if result.returncode != 0:
                print(f"Error running 'index_products.py': {result.stderr}")
                return None
            print(result.stdout)
            # Reinitialize the collection after indexing
            collection = client.get_collection(name=COLLECTION_NAME)
            print(f"Chroma collection reloaded: {collection.name} (Count: {collection.count()})")
        
        return collection
    except Exception as e:
        print(f"Error connecting to or getting ChromaDB collection: {e}")
        return None
    
def search_vector_db(collection, model, query, k):
    """Embeds the query and searches ChromaDB."""
    if not collection or not model: print("Error: Chroma collection or embedding model not available."); return []
    print(f"Embedding query: '{query}'")
    try:
        query_embedding = model.encode([query])[0]
        print(f"Searching Chroma for top {k} results...")
        results = collection.query(query_embeddings=[query_embedding.tolist()], n_results=k)
        retrieved_ids = results['ids'][0] if results and results['ids'] else []
        print(f"Chroma search found IDs: {retrieved_ids}")
        return retrieved_ids
    except Exception as e: print(f"Error during ChromaDB search: {e}"); return []

# --- UPDATED: Format products using original DB column names as labels ---
def format_products_for_llm(products):
    """Formats product details into a string for the LLM prompt using original column names."""
    if not products:
        return "No matching products found in the database to show the LLM."

    formatted_string = "Here are the products found that might match the query:\n\n"
    for i, prod in enumerate(products):
        if not prod: continue
        # Use original column names as labels
        formatted_string += f"--- Product {i+1} ---\n"
        formatted_string += f"id: {prod.get('id')}\n"
        formatted_string += f"name: {prod.get('name', 'N/A')}\n"
        formatted_string += f"category: {prod.get('category', 'N/A')}\n"
        formatted_string += f"price: {prod.get('price', 'N/A')}\n"
        formatted_string += f"currency: {prod.get('currency', '')}\n"
        formatted_string += f"person_id: {prod.get('person_id', 'N/A')}\n"
        formatted_string += f"actiontype: {prod.get('actiontype', 'N/A')}\n"
        formatted_string += f"photourl: {prod.get('photourl', '')}\n"
        # Shorten description
        desc_short = textwrap.shorten(prod.get('description', 'No description'), width=250, placeholder="...")
        formatted_string += f"description: {desc_short}\n"
        # Optional: add photoUrl, person_id, actionType if relevant context
        # formatted_string += f"photoUrl: {prod.get('photourl', '')}\n"
        # formatted_string += f"actionType: {prod.get('actiontype', '')}\n"
        formatted_string += "\n"
    return formatted_string.strip()

# --- UPDATED: Generate LLM response, asking for JSON with original keys ---
def generate_llm_response(query, retrieved_products_details):
    """Builds the prompt and calls the Google Gemini LLM, requesting JSON with original keys."""
    if LLM_PROVIDER == "google":
        try:
            genai.configure(api_key=GOOGLE_API_KEY)
            generation_config = genai.GenerationConfig(temperature=0.3)
            safety_settings = [
                {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            ]
            model = genai.GenerativeModel(
                model_name=GEMINI_MODEL_NAME,
                generation_config=generation_config,
                safety_settings=safety_settings
                )

            context = format_products_for_llm(retrieved_products_details)
            # Updated prompt asking for JSON with specific original keys
            prompt = f"""You are a helpful shopping assistant. Answer the user's query based **only** on the product information provided below in the CONTEXT section. Do not invent products or information. If none of the products provided are a good match, return an empty list or an appropriate message in JSON. Be concise and helpful. Return **only** the data matching the user query in JSON format. The JSON structure should be a list of objects, where each object represents a matching product and includes the keys: "id", "name","photourl", "actiontype", "category", "price", "currency", "description", "person_id".

User Query: "{query}"

CONTEXT:
{context}

Assistant Response (JSON):""" # Hint remains

            print("\n--- Sending Prompt to Gemini LLM ---")
            response = model.generate_content(prompt)

            if response.parts:
                 raw_answer = response.text.strip()
                 if raw_answer.startswith("```json"): raw_answer = raw_answer[7:]
                 if raw_answer.endswith("```"): raw_answer = raw_answer[:-3]
                 answer = raw_answer.strip()
            elif response.prompt_feedback.block_reason:
                 answer = '{{"error": "Response blocked", "reason": "{}"}}'.format(response.prompt_feedback.block_reason)
                 print(f"Prompt Feedback: {response.prompt_feedback}")
            else:
                 answer = '{{"error": "Model did not generate a response."}}'
                 print(f"Gemini response structure: {response}")

            return answer

        except Exception as e:
            print(f"Error calling Google Gemini API: {e}")
            return '{{"error": "An error occurred while generating the response from Gemini."}}'
    else:
        return '{{"error": "LLM provider is not set to \'google\'."}}'

# --- Main Execution ---
if __name__ == "__main__":
    print("--- Starting RAG Product Search (using Gemini) ---")
    print("Loading models and connecting to vector database...")

    embedding_model = get_embedding_model()
    chroma_collection = get_chroma_collection()

    if not embedding_model or not chroma_collection:
         print("Failed to load embedding model or connect to ChromaDB. Exiting.")
         exit(1)

    db_conn = connect_db()
    if not db_conn: print("Warning: Failed to connect to PostgreSQL. Cannot show full product details.")

    print("\n--- Start searching products (type 'exit' to quit) ---")
    while True:
        user_query = input("Your query: ")
        if user_query.lower() == 'exit': break
        if not user_query: continue

        retrieved_ids = search_vector_db(chroma_collection, embedding_model, user_query, TOP_K_RESULTS)
        if not retrieved_ids: print("No matching products found in the vector database."); continue

        retrieved_full_products = []
        if db_conn:
            print(f"Fetching full details for IDs: {retrieved_ids} from PostgreSQL...")
            retrieved_full_products = fetch_products_by_ids(db_conn, retrieved_ids)
        else: print("Skipping PostgreSQL retrieval - no DB connection.")

        print("Generating LLM response...")
        llm_answer = generate_llm_response(user_query, retrieved_full_products)

        print("\n======== Assistant Response (Gemini - JSON) ========")
        print(llm_answer)
        print("=====================================================")

        # --- UPDATED: Display context details using original DB column names ---
        if retrieved_full_products:
            print("\n--- Products used as context for LLM ---")
            for i, prod in enumerate(retrieved_full_products):
                 if not prod: continue
                 # Use original column names as labels
                 print(f"{i+1}. id: {prod.get('id')}")
                 print(f"   name: {prod.get('name')}")
                 print(f"   category: {prod.get('category')}")
                 print(f"   price: {prod.get('price')}")
                 print(f"   currency: {prod.get('currency')}")
                 print(f"   photourl: {prod.get('photourl')}") # Use lowercase key
                 # print(f"   description: {prod.get('description')}") # Optional: print full description
                 print(f"   actionType: {prod.get('actiontype')}") # Optional
                 print(f"   person_id: {prod.get('person_id')}")
                 print("-" * 10)
        elif retrieved_ids:
             print("\n--- IDs found in vector DB (details not fetched from PGSQL) ---")
             for prod_id in retrieved_ids: print(f"- {prod_id}")
        print("----------------------------------------\n")

    print("Closing database connection...")
    if db_conn: db_conn.close(); print("PostgreSQL connection closed.")
    print("Finished.")