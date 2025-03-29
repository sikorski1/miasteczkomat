package config

type Config struct {
	GRPCPort           string
	HTTPPort           string
	DataServiceAddress string
}

func Load() *Config {
	return &Config{
		GRPCPort:           "50051",
		HTTPPort:           "8080",
		DataServiceAddress: "localhost:50051",
	}
}
