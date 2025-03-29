import { eq } from "drizzle-orm";
import { db } from "../../database/db";
import * as grpc from '@grpc/grpc-js';
import { persons } from "../../database/schema";
import * as protoLoader from '@grpc/proto-loader';
import { DataServiceName,  DataClientImpl, SaveResponse, User, Product, FullPayload } from '../../proto/data';


export class UserService {
    async createUser(call: grpc.ServerUnaryCall<any, SaveResponse>, callback: grpc.sendUnaryData<SaveResponse>) {
                
        const {dorm,
             room_number, 
             user_name,
             surname, 
             phone,
             instagram,
             facebook } = call.request;
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

            callback(null, { 
                status: 'success', 
                message: 'User created successfully!' 
            });

        } catch (err: any) {
            console.log(err);
            callback(new Error('error'), {
                status: 'error',
                message: 'Failed to save product: ' + err.message
            });
        }
    }
    // async getProduct()

}