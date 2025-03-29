package grpc

import (
	pbData "api-gateway/proto/data"
	pbQuery "api-gateway/proto/query"
	"google.golang.org/grpc"
)

type Client struct {
	conn         *grpc.ClientConn
	DataService  pbData.DataClient
	QueryService pbQuery.QueryClient
}

func NewClient(addr string) (*Client, error) {
	conn, err := grpc.Dial(addr, grpc.WithInsecure())
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
