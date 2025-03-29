package grpc

import (
	pb "api-gateway/proto"
	"google.golang.org/grpc"
)

type Client struct {
	conn        *grpc.ClientConn
	DataService pb.DataClient
}

func NewClient(addr string) (*Client, error) {
	conn, err := grpc.Dial(addr, grpc.WithInsecure())
	if err != nil {
		return nil, err
	}

	return &Client{
		conn:        conn,
		DataService: pb.NewDataClient(conn),
	}, nil
}

func (c *Client) Close() error {
	return c.conn.Close()
}
