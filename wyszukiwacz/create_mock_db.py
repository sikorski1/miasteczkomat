import psycopg2
import csv
import random

# --- Database Configuration ---
DB_NAME = "postgres"
DB_USER = "admin"
DB_PASSWORD = 12345
DB_HOST = "localhost"
DB_PORT = "5432"
# --------------------------

# --- Table Schema ---
TABLE_NAME = "products"
CREATE_TABLE_SQL = f"""
CREATE TABLE IF NOT EXISTS {TABLE_NAME} (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    photo_url TEXT,
    price DECIMAL(10, 2),
    currency VARCHAR(20),
    description TEXT,
    category VARCHAR(100),
    person_id INTEGER NOT NULL,
    action_type VARCHAR(50)
);
"""
# ------------------

def insert_products_from_csv(csv_file_path):
    """Reads data from a CSV file and inserts it into the database."""
    conn = None
    cursor = None
    inserted_count = 0

    try:
        conn = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT
        )
        cursor = conn.cursor()
        print("Successfully connected to the database.")

        # Ensure the table exists
        cursor.execute(CREATE_TABLE_SQL)
        conn.commit()
        print(f"Ensured table '{TABLE_NAME}' exists.")

        # Prepare the insert query
        insert_query = f"""
        INSERT INTO {TABLE_NAME} (name, photo_url, price, currency, description, category, person_id, action_type)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        ON CONFLICT DO NOTHING;
        """

        # Read the CSV file and insert data
        with open(csv_file_path, mode='r', encoding='utf-8') as csv_file:
            csv_reader = csv.DictReader(csv_file)
            print(f"Attempting to insert data from '{csv_file_path}'...")
            for row in csv_reader:
                try:
                    cursor.execute(insert_query, (
                        row['name'],
                        row['photo_url'],
                        float(row['price']),
                        row['currency'],
                        row['description'],
                        row['category'].upper(),
                        random.randint(50, 80),
                        row['action_type']
                    ))
                    inserted_count += cursor.rowcount
                except psycopg2.DataError as data_err:
                    print(f"\n--- Data Error Inserting Row ---")
                    print(f"Error: {data_err}")
                    print(f"Row: {row}")
                    print("--------------------------------\n")
                    conn.rollback()
                except Exception as insert_err:
                    print(f"\nError inserting row: {insert_err}")
                    conn.rollback()

        conn.commit()
        print(f"Successfully inserted {inserted_count} rows.")

    except psycopg2.DatabaseError as e:
        print(f"Database error: {e}")
        if conn:
            conn.rollback()
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        if cursor:
            cursor.close()
            print("Cursor closed.")
        if conn:
            conn.close()
            print("Database connection closed.")


# --- Main Execution ---
if __name__ == "__main__":
    csv_file_path = "./mock_products.csv"
    insert_products_from_csv(csv_file_path)