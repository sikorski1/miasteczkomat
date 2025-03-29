package handlers

import (
	"api-gateway/internal/grpc"
	"api-gateway/internal/minio"
	pbData "api-gateway/proto/data"
	pbQuery "api-gateway/proto/query"
	"context"
	"encoding/json"
	"net/http"
	"time"
)

type DataHandler struct {
	grpcDataClient  *grpc.Client
	grpcQueryClient *grpc.Client
	minioClient     *minio.Client
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

func NewDataHandler(grpcDataClient *grpc.Client, grpcQueryClient *grpc.Client, minioClient *minio.Client) *DataHandler {
	return &DataHandler{grpcDataClient: grpcDataClient, grpcQueryClient: grpcQueryClient, minioClient: minioClient}
}

type QueryPayload struct {
	Query string `json:"query"`
}

func (h *DataHandler) UploadData(w http.ResponseWriter, r *http.Request) {
	var payload DataPayload

	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	req := &pbData.FullPayload{
		User: &pbData.User{
			Dorm:       payload.User.Dorm,
			RoomNumber: payload.User.RoomNumber,
			Name:       payload.User.Name,
			Surname:    payload.User.Surname,
			Phone:      payload.User.Phone,
			Instagram:  payload.User.Instagram,
			Facebook:   payload.User.Facebook,
		},
		Product: &pbData.Product{
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

	resp, err := h.grpcDataClient.DataService.SaveFullPayload(ctx, req)
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

func (h *DataHandler) GetProductsByQuery(w http.ResponseWriter, r *http.Request) {
	var payload QueryPayload

	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	req := &pbQuery.RequestQuery{
		Query: payload.Query,
	}

	resp, err := h.grpcQueryClient.QueryService.GetProductsByQuery(ctx, req)
	if err != nil {
		http.Error(w, "gRPC error: "+err.Error(), http.StatusInternalServerError)
		return
	}

	var results []DataPayload

	for _, item := range resp.Payloads {
		results = append(results, DataPayload{
			User: UserPayload{
				Dorm:       item.User.Dorm,
				RoomNumber: item.User.RoomNumber,
				Name:       item.User.Name,
				Surname:    item.User.Surname,
				Phone:      item.User.Phone,
				Instagram:  item.User.Instagram,
				Facebook:   item.User.Facebook,
			},
			Product: ProductPayload{
				Name:        item.Product.Name,
				Photo:       item.Product.Photo,
				Currency:    item.Product.Currency,
				Price:       item.Product.Price,
				Category:    item.Product.Category,
				Description: item.Product.Description,
				ActionType:  item.Product.ActionType,
			},
		})
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(results)
}
