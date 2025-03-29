generate_proto:
	protoc \
	    --proto_path=proto \
	    --go_out=paths=source_relative:./proto \
	    --go-grpc_out=paths=source_relative:./proto \
	    proto/data/data.proto \
	    proto/query/query.proto