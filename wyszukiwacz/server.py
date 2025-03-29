from concurrent import futures
import grpc
from query_proto import query_pb2, query_pb2_grpc
from rag_search_gemini import get_embedding_model, get_chroma_collection, search_vector_db, connect_db, fetch_products_by_ids, generate_llm_response
import json  # Add this import for parsing JSON strings

# --- Configuration ---
TOP_K_RESULTS = 20

# Load models and databases
embedding_model = get_embedding_model()
chroma_collection = get_chroma_collection()
db_conn = connect_db()

class QueryService(query_pb2_grpc.QueryServicer):
   def GetProductsByQuery(self, request, context):
        # Step 1: Embed the query and search the vector database
        retrieved_ids = search_vector_db(chroma_collection, embedding_model, request.query, TOP_K_RESULTS)
        if not retrieved_ids:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details("No matching products found.")
            return query_pb2.FullPayloadList(payloads=[])

        # Step 2: Fetch full product details from PostgreSQL
        retrieved_full_products = fetch_products_by_ids(db_conn, retrieved_ids)
        if not retrieved_full_products:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details("No product details found in the database.")
            return query_pb2.FullPayloadList(payloads=[])

        # Step 3: Generate LLM response and parse it
        try:
            llm_response_string = generate_llm_response(request.query, retrieved_full_products)
            llm_response = json.loads(llm_response_string)  # Parse the JSON string into a list of dictionaries
            if not isinstance(llm_response, list):
                raise ValueError("Parsed LLM response is not a list.")
        except json.JSONDecodeError as e:
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(f"Error parsing LLM response: {e}")
            return query_pb2.FullPayloadList(payloads=[])
        except Exception as e:
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(f"Error generating LLM response: {e}")
            return query_pb2.FullPayloadList(payloads=[])

        # Step 4: Map the parsed response to the gRPC response format
        payloads = []
        for prod in llm_response:
            if not prod:
                continue

            # Create a Product object
            product = query_pb2.Product(
                name=prod.get('name', ''),
                photo=prod.get('photourl', ''),
                currency=prod.get('currency', ''),
                price=float(prod.get('price', 0.0)),
                category=prod.get('category', ''),
                description=prod.get('description', ''),
                action_type=prod.get('actiontype', ''),
                person_id=str(prod.get('person_id', ''))
            )

            user = query_pb2.User(
                dorm=prod.get('dorm', 'Mock Dorm'),
                room_number=prod.get('room_number', 101),
                name=prod.get('name', 'John'),
                surname=prod.get('surname', 'Doe'),
                phone=prod.get('phone', '123456789'),
                instagram=prod.get('instagram', 'john_doe'),
                facebook=prod.get('facebook', 'john.doe')
            )

            # Create a FullPayload object
            full_payload = query_pb2.FullPayload(user=user, product=product)
            payloads.append(full_payload)

        # Return the FullPayloadList
        return query_pb2.FullPayloadList(payloads=payloads)

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    query_pb2_grpc.add_QueryServicer_to_server(QueryService(), server)
    server.add_insecure_port('[::]:50050')
    server.start()
    print("Server started on port 50050", flush=True)
    server.wait_for_termination()

if __name__ == '__main__':
    if not embedding_model or not chroma_collection or not db_conn:
        print("Failed to initialize required components. Exiting.")
        exit(1)
    serve()