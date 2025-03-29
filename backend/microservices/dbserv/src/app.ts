import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { products } from './database/schema';
import { db } from './database/db';
import { ProductService } from './api/services/productService';
import { UserService } from './api/services/userService'
import { DataServiceName,  DataClientImpl, SaveResponse, User, Product, FullPayload } from './proto/data';
import { BinaryWriter, BinaryReader } from '@bufbuild/protobuf/wire';
import { FullService } from './api/services/fullService';

const packageDefinition = protoLoader.loadSync('src/proto/data.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as grpc.GrpcObject;
const dataPackage = protoDescriptor.data as any;

const server = new grpc.Server();

const productService = new ProductService()
const userService = new UserService()
const fullService = new FullService


server.addService(dataPackage.Data.service, {
    SaveUser: userService.createUser,
    SaveProduct: productService.saveProduct,
    SaveFullPayload: fullService.saveFullPayload,
    GetAllData: fullService.getFull
});

const port = '50051';
server.bindAsync(`dbserv:${port}`, grpc.ServerCredentials.createInsecure(), (error, port) => {
  if (error) {
    console.error('Error starting server:', error);
    return;
  }
  console.log(`Server running at http://localhost:${port}`);
  server.start();
});
  