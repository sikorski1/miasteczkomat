import { eq } from "drizzle-orm";
import { db } from "../../database/db";
import * as grpc from '@grpc/grpc-js';
import { products } from "../../database/schema";
import * as protoLoader from '@grpc/proto-loader';
import { DataServiceName,  DataClientImpl, SaveResponse, User, Product, FullPayload } from '../../proto/data';


export class ProductService {
    async saveProduct (call: grpc.ServerUnaryCall<any, SaveResponse>, callback: grpc.sendUnaryData<SaveResponse>) {
        const { name, photo, currency, price, category, description, action_type, person_id, created_at } = call.request;
        try {
            await db.insert(products).values({
                name: name,
                photoUrl: photo,
                currency: currency,
                price: price,
                description: description,
                category: category,
                actionType: action_type,
                person_id: person_id,
                created_at: created_at
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


    // async getProduct()

}