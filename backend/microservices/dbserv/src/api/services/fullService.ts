import { eq } from "drizzle-orm";
import { db } from "../../database/db";
import * as grpc from '@grpc/grpc-js';
import { persons } from "../../database/schema";
import { products } from "../../database/schema";
import * as protoLoader from '@grpc/proto-loader';
import { FullPayloadList } from '../../proto/data';

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

        const { name, photo, currency, price, category, description, action_type, person_id } = payload.product;
            await db.insert(products).values({
                name: name,
                photoUrl: photo,
                currency: currency,
                price: price,
                description: description,
                category: category,
                actionType: action_type,
                person_id: person_id,
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

    async getFull(call: grpc.ServerUnaryCall<any, SaveResponse>, callback: grpc.sendUnaryData<SaveResponse>){
        try {
            const productsWithUsers = await db
                .select()
                .from(products)
                .innerJoin(persons, eq(products.person_id, persons.id));
            
                if (!productsWithUsers || productsWithUsers.length === 0) {
                    callback({
                      code: grpc.status.NOT_FOUND,
                      details: 'No products found with associated users',
                    });
                    return;
                  }
              
                  const response: FullPayloadList = {
                    payloads: productsWithUsers.map((productWithUser) => ({
                      product: {
                        name: productWithUser.products.name,
                        photo: productWithUser.products.photoUrl || "",
                        currency: productWithUser.products.currency,
                        price: productWithUser.products.price,
                        category: productWithUser.products.category,
                        description: productWithUser.products.description || "",
                        actionType: productWithUser.products.actionType,
                        personId: productWithUser.products.person_id,
                        createdAt: productWithUser.products.created_at!.toISOString(),
                      },
                      user: {
                        dorm: productWithUser.persons.dormitory,
                        userName: productWithUser.persons.name,
                        roomNumber: productWithUser.persons.number,
                        surname: productWithUser.persons.surname || "", 
                        phone: productWithUser.persons.phoneNumber,
                        instagram: productWithUser.persons.instaUrl || "",
                        facebook: productWithUser.persons.fbUrl || "",
                      },
                    })),
                  };
                  
                const saveResponse: SaveResponse = {
                    status: 'success',
                    message: 'User and Product saved successfully!',
                    ...response
                };

                callback(null, saveResponse);

        } catch (err) {
            console.error('Error fetching products with users:', err as any);
            callback(new Error('error'), {
                status: 'error',
                message: 'Failed to save product: ' + (err as any).message
            });
        }
    }
}