package handlers

import (
	"api-gateway/internal/grpc"
	"api-gateway/internal/minio"
	pb "api-gateway/proto"
	"context"
	"encoding/json"
	"net/http"
	"time"
)

type DataHandler struct {
	grpcClient  *grpc.Client
	minioClient *minio.Client
}

type DataPayload struct {
	User    UserPayload    `json:"user"`
	Product ProductPayload `json:"product"`
}

type UserPayload struct {
	Dorm       string `json:"dorm"`
	RoomNumber string `json:"room_number"`
	Name       string `json:"name"`
	Surname    string `json:"surname"`
	Phone      string `json:"phone"`
	Instagram  string `json:"instagram"`
	Facebook   string `json:"facebook"`
}

type ProductPayload struct {
	Name        string  `json:"name"`
	Photo       string  `json:"photo"`
	Currency    string  `json:"currency"`
	Price       float64 `json:"price"`
	Category    string  `json:"category"`
	Description string  `json:"description"`
	ActionType  string  `json:"action_type"`
}

func NewDataHandler(grpcClient *grpc.Client, minioClient *minio.Client) *DataHandler {
	return &DataHandler{grpcClient: grpcClient, minioClient: minioClient}
}

func (h *DataHandler) UploadData(w http.ResponseWriter, r *http.Request) {
	var payload DataPayload

	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	req := &pb.FullPayload{
		User: &pb.User{
			Dorm:       payload.User.Dorm,
			RoomNumber: payload.User.RoomNumber,
			Name:       payload.User.Name,
			Surname:    payload.User.Surname,
			Phone:      payload.User.Phone,
			Instagram:  payload.User.Instagram,
			Facebook:   payload.User.Facebook,
		},
		Product: &pb.Product{
			Name:        payload.Product.Name,
			Photo:       payload.Product.Photo,
			Currency:    payload.Product.Currency,
			Price:       payload.Product.Price,
			Category:    payload.Product.Category,
			Description: payload.Product.Description,
			ActionType:  payload.Product.ActionType,
		},
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	resp, err := h.grpcClient.DataService.SaveFullPayload(ctx, req)
	if err != nil {
		http.Error(w, "gRPC error: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"status":  resp.Status,
		"message": resp.Message,
	})
}
