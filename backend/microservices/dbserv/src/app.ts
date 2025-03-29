import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { products } from './database/schema';
import { db } from './database/db';
import { DataServiceName,  DataClientImpl, SaveResponse, User, Product, FullPayload } from './proto/data';
import { BinaryWriter, BinaryReader } from '@bufbuild/protobuf/wire';

const packageDefinition = protoLoader.loadSync('./proto/data.proto', {});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const lol = protoDescriptor.data

const saveProduct = async (call: grpc.ServerUnaryCall<any, SaveResponse>, callback: grpc.sendUnaryData<SaveResponse>) => {
    const { name, photo, currency, price, category, description, action_type, person_id } = call.request;

    try {
        await db.insert(products).values({
            name: name,
            photoUrl: photo,
            currency: currency,
            price: price,
            description: description,
            category: category,
            actionType: action_type,
            person_id: person_id
        }).execute();

        callback(null, { 
            status: 'success', 
            message: 'Product saved successfully!' 
        });
    } catch (err: any) {
        console.log(err);
        callback(new Error('error'), {
            status: 'error',
            message: 'Failed to save product: ' + err.message
        });
    }
};

const server = new grpc.Server();

server.addService(lol.Data.service, {
//   SaveUser: saveUser,
  SaveProduct: saveProduct,
//   SaveFullPayload: saveFullPayload,
});

const port = '50051';
server.bindAsync(`localhost:${port}`, grpc.ServerCredentials.createInsecure(), (error, port) => {
  if (error) {
    console.error('Error starting server:', error);
    return;
  }
  console.log(`Server running at http://localhost:${port}`);
  server.start();
});
  