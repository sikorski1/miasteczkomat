from concurrent import futures
import grpc
from query_proto import query_pb2, query_pb2_grpc
from rag_search_gemini import get_embedding_model, get_chroma_collection, search_vector_db, connect_db, fetch_products_by_ids

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
            return query_pb2.ProductsResponse(products=[])

        # Step 2: Fetch full product details from PostgreSQL
        retrieved_full_products = fetch_products_by_ids(db_conn, retrieved_ids)
        if not retrieved_full_products:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details("No product details found in the database.")
            return query_pb2.ProductsResponse(products=[])

        # Step 3: Map the retrieved products to the gRPC response format
        products = []
        for prod in retrieved_full_products:
            if not prod:
                continue
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
            products.append(product)

        return query_pb2.ProductsResponse(products=products)

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    query_pb2_grpc.add_QueryServicer_to_server(QueryService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("Server started on port 50051")
    server.wait_for_termination()

if __name__ == '__main__':
    if not embedding_model or not chroma_collection or not db_conn:
        print("Failed to initialize required components. Exiting.")
        exit(1)
    serve()