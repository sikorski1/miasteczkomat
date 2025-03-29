package config

type Config struct {
	GRPCPort            string
	HTTPPort            string
	DataServiceAddress  string
	QueryServiceAddress string
}

func Load() *Config {
	return &Config{
		GRPCPort:            "50051",
		HTTPPort:            "8080",
		DataServiceAddress:  "dbserv:50051",
		QueryServiceAddress: "wyszukiwacz:50050",
	}
}
