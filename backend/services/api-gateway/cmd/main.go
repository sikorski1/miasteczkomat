package main

import (
	"api-gateway/internal/config"
	"api-gateway/internal/grpc"
	"api-gateway/internal/handlers"
	"api-gateway/internal/minio"
	"github.com/go-chi/chi/v5"
	"log"
	"net/http"
)

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {

	cfg := config.Load()

	grpcClient, err := grpc.NewClient(cfg.DataServiceAddress)
	if err != nil {
		log.Fatalf("failed to initialize gRPC client: %v", err)
	}
	defer grpcClient.Close()

	minioClient := minio.NewMinioClient()
	minioClient.EnsureBucketExists("images")

	dataHandler := handlers.NewDataHandler(grpcClient, minioClient)

	r := chi.NewRouter()
	r.Use(corsMiddleware)

	r.Post("/data", dataHandler.UploadData)

	log.Printf("API Gateway started on port %s", cfg.HTTPPort)
	if err = http.ListenAndServe(":"+cfg.HTTPPort, r); err != nil {
		log.Fatal(err)
	}

}
