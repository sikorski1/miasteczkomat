package grpc

import (
	pbData "api-gateway/proto/data"
	pbQuery "api-gateway/proto/query"
	"time"

	"google.golang.org/grpc"
)

type Client struct {
	conn         *grpc.ClientConn
	DataService  pbData.DataClient
	QueryService pbQuery.QueryClient
}

func NewClient(addr string) (*Client, error) {
	conn, err := ConnectGRPC(addr)
	if err != nil {
		return nil, err
	}

	return &Client{
		conn:         conn,
		DataService:  pbData.NewDataClient(conn),
		QueryService: pbQuery.NewQueryClient(conn),
	}, nil
}

func (c *Client) Close() error {
	return c.conn.Close()
}

func ConnectGRPC(address string) (*grpc.ClientConn, error) {
	var conn *grpc.ClientConn
	var err error
	for i := 0; i < 5; i++ { // Retry 5 times
		conn, err = grpc.Dial(address, grpc.WithInsecure())
		if err == nil {
			return conn, nil
		}
		time.Sleep(2 * time.Second) // Wait before retrying
	}
	return nil, err
}
