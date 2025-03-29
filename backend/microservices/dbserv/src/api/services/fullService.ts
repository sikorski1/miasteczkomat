import { eq } from "drizzle-orm";
import { db } from "../../database/db";
import * as grpc from '@grpc/grpc-js';
import { persons } from "../../database/schema";
import { products } from "../../database/schema";
import * as protoLoader from '@grpc/proto-loader';
import { DataServiceName,  DataClientImpl, SaveResponse, User, Product, FullPayload } from '../../proto/data';


export class FullService {
    async saveFullPayload(call: grpc.ServerUnaryCall<any, SaveResponse>, callback: grpc.sendUnaryData<SaveResponse>) {
        
        const payload = call.request.toObject()

        const {dorm,
             room_number, 
             user_name,
             surname, 
             phone,
             instagram,
             facebook } = payload.user;
        try  {
            await db.insert(persons).values({
                name: user_name,
                surname: surname,
                phoneNumber: phone,
                instaUrl: instagram,
                fbUrl: facebook,
                number: room_number,
                dormitory: dorm
            }).execute();

        const { name, photo, currency, price, category, description, action_type, person_id, created_at } = payload.product;
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
                message: 'User and Product saved successfully!' 
            });
            
        } catch (err: any) {
            console.log(err);
            callback(new Error('error'), {
                status: 'error',
                message: 'Failed to save product: ' + err.message
            });
        }
    }
}