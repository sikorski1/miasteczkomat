// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.7.0
//   protoc               v5.29.3
// source: src/proto/data.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

export const protobufPackage = "data";

export interface User {
  dorm: string;
  roomNumber: number;
  userName: string;
  surname: string;
  phone: string;
  instagram: string;
  facebook: string;
}

export interface Product {
  name: string;
  photo: string;
  currency: string;
  price: number;
  category: string;
  description: string;
  actionType: string;
  personId: number;
}

export interface GetProduct {
  name: string;
  photo: string;
  currency: string;
  price: number;
  category: string;
  description: string;
  actionType: string;
  personId: number;
  createdAt: string;
}

export interface FullPayload {
  user: User | undefined;
  product: Product | undefined;
}

export interface GetFullPayload {
  user: User | undefined;
  product: GetProduct | undefined;
}

export interface SaveResponse {
  status: string;
  message: string;
}

export interface FullPayloadList {
  payloads: GetFullPayload[];
}

export interface Empty {
}

function createBaseUser(): User {
  return { dorm: "", roomNumber: 0, userName: "", surname: "", phone: "", instagram: "", facebook: "" };
}

export const User: MessageFns<User> = {
  encode(message: User, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.dorm !== "") {
      writer.uint32(10).string(message.dorm);
    }
    if (message.roomNumber !== 0) {
      writer.uint32(16).int32(message.roomNumber);
    }
    if (message.userName !== "") {
      writer.uint32(26).string(message.userName);
    }
    if (message.surname !== "") {
      writer.uint32(34).string(message.surname);
    }
    if (message.phone !== "") {
      writer.uint32(42).string(message.phone);
    }
    if (message.instagram !== "") {
      writer.uint32(50).string(message.instagram);
    }
    if (message.facebook !== "") {
      writer.uint32(58).string(message.facebook);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): User {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.dorm = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }

          message.roomNumber = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.userName = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.surname = reader.string();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }

          message.phone = reader.string();
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }

          message.instagram = reader.string();
          continue;
        }
        case 7: {
          if (tag !== 58) {
            break;
          }

          message.facebook = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): User {
    return {
      dorm: isSet(object.dorm) ? globalThis.String(object.dorm) : "",
      roomNumber: isSet(object.roomNumber) ? globalThis.Number(object.roomNumber) : 0,
      userName: isSet(object.userName) ? globalThis.String(object.userName) : "",
      surname: isSet(object.surname) ? globalThis.String(object.surname) : "",
      phone: isSet(object.phone) ? globalThis.String(object.phone) : "",
      instagram: isSet(object.instagram) ? globalThis.String(object.instagram) : "",
      facebook: isSet(object.facebook) ? globalThis.String(object.facebook) : "",
    };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    if (message.dorm !== "") {
      obj.dorm = message.dorm;
    }
    if (message.roomNumber !== 0) {
      obj.roomNumber = Math.round(message.roomNumber);
    }
    if (message.userName !== "") {
      obj.userName = message.userName;
    }
    if (message.surname !== "") {
      obj.surname = message.surname;
    }
    if (message.phone !== "") {
      obj.phone = message.phone;
    }
    if (message.instagram !== "") {
      obj.instagram = message.instagram;
    }
    if (message.facebook !== "") {
      obj.facebook = message.facebook;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<User>, I>>(base?: I): User {
    return User.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<User>, I>>(object: I): User {
    const message = createBaseUser();
    message.dorm = object.dorm ?? "";
    message.roomNumber = object.roomNumber ?? 0;
    message.userName = object.userName ?? "";
    message.surname = object.surname ?? "";
    message.phone = object.phone ?? "";
    message.instagram = object.instagram ?? "";
    message.facebook = object.facebook ?? "";
    return message;
  },
};

function createBaseProduct(): Product {
  return { name: "", photo: "", currency: "", price: 0, category: "", description: "", actionType: "", personId: 0 };
}

export const Product: MessageFns<Product> = {
  encode(message: Product, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.photo !== "") {
      writer.uint32(18).string(message.photo);
    }
    if (message.currency !== "") {
      writer.uint32(26).string(message.currency);
    }
    if (message.price !== 0) {
      writer.uint32(33).double(message.price);
    }
    if (message.category !== "") {
      writer.uint32(42).string(message.category);
    }
    if (message.description !== "") {
      writer.uint32(50).string(message.description);
    }
    if (message.actionType !== "") {
      writer.uint32(58).string(message.actionType);
    }
    if (message.personId !== 0) {
      writer.uint32(64).int32(message.personId);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Product {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProduct();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.photo = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.currency = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 33) {
            break;
          }

          message.price = reader.double();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }

          message.category = reader.string();
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }

          message.description = reader.string();
          continue;
        }
        case 7: {
          if (tag !== 58) {
            break;
          }

          message.actionType = reader.string();
          continue;
        }
        case 8: {
          if (tag !== 64) {
            break;
          }

          message.personId = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Product {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      photo: isSet(object.photo) ? globalThis.String(object.photo) : "",
      currency: isSet(object.currency) ? globalThis.String(object.currency) : "",
      price: isSet(object.price) ? globalThis.Number(object.price) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      actionType: isSet(object.actionType) ? globalThis.String(object.actionType) : "",
      personId: isSet(object.personId) ? globalThis.Number(object.personId) : 0,
    };
  },

  toJSON(message: Product): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.photo !== "") {
      obj.photo = message.photo;
    }
    if (message.currency !== "") {
      obj.currency = message.currency;
    }
    if (message.price !== 0) {
      obj.price = message.price;
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.actionType !== "") {
      obj.actionType = message.actionType;
    }
    if (message.personId !== 0) {
      obj.personId = Math.round(message.personId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Product>, I>>(base?: I): Product {
    return Product.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Product>, I>>(object: I): Product {
    const message = createBaseProduct();
    message.name = object.name ?? "";
    message.photo = object.photo ?? "";
    message.currency = object.currency ?? "";
    message.price = object.price ?? 0;
    message.category = object.category ?? "";
    message.description = object.description ?? "";
    message.actionType = object.actionType ?? "";
    message.personId = object.personId ?? 0;
    return message;
  },
};

function createBaseGetProduct(): GetProduct {
  return {
    name: "",
    photo: "",
    currency: "",
    price: 0,
    category: "",
    description: "",
    actionType: "",
    personId: 0,
    createdAt: "",
  };
}

export const GetProduct: MessageFns<GetProduct> = {
  encode(message: GetProduct, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.photo !== "") {
      writer.uint32(18).string(message.photo);
    }
    if (message.currency !== "") {
      writer.uint32(26).string(message.currency);
    }
    if (message.price !== 0) {
      writer.uint32(33).double(message.price);
    }
    if (message.category !== "") {
      writer.uint32(42).string(message.category);
    }
    if (message.description !== "") {
      writer.uint32(50).string(message.description);
    }
    if (message.actionType !== "") {
      writer.uint32(58).string(message.actionType);
    }
    if (message.personId !== 0) {
      writer.uint32(64).int32(message.personId);
    }
    if (message.createdAt !== "") {
      writer.uint32(74).string(message.createdAt);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): GetProduct {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetProduct();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.photo = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.currency = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 33) {
            break;
          }

          message.price = reader.double();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }

          message.category = reader.string();
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }

          message.description = reader.string();
          continue;
        }
        case 7: {
          if (tag !== 58) {
            break;
          }

          message.actionType = reader.string();
          continue;
        }
        case 8: {
          if (tag !== 64) {
            break;
          }

          message.personId = reader.int32();
          continue;
        }
        case 9: {
          if (tag !== 74) {
            break;
          }

          message.createdAt = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetProduct {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      photo: isSet(object.photo) ? globalThis.String(object.photo) : "",
      currency: isSet(object.currency) ? globalThis.String(object.currency) : "",
      price: isSet(object.price) ? globalThis.Number(object.price) : 0,
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      actionType: isSet(object.actionType) ? globalThis.String(object.actionType) : "",
      personId: isSet(object.personId) ? globalThis.Number(object.personId) : 0,
      createdAt: isSet(object.createdAt) ? globalThis.String(object.createdAt) : "",
    };
  },

  toJSON(message: GetProduct): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.photo !== "") {
      obj.photo = message.photo;
    }
    if (message.currency !== "") {
      obj.currency = message.currency;
    }
    if (message.price !== 0) {
      obj.price = message.price;
    }
    if (message.category !== "") {
      obj.category = message.category;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.actionType !== "") {
      obj.actionType = message.actionType;
    }
    if (message.personId !== 0) {
      obj.personId = Math.round(message.personId);
    }
    if (message.createdAt !== "") {
      obj.createdAt = message.createdAt;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetProduct>, I>>(base?: I): GetProduct {
    return GetProduct.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetProduct>, I>>(object: I): GetProduct {
    const message = createBaseGetProduct();
    message.name = object.name ?? "";
    message.photo = object.photo ?? "";
    message.currency = object.currency ?? "";
    message.price = object.price ?? 0;
    message.category = object.category ?? "";
    message.description = object.description ?? "";
    message.actionType = object.actionType ?? "";
    message.personId = object.personId ?? 0;
    message.createdAt = object.createdAt ?? "";
    return message;
  },
};

function createBaseFullPayload(): FullPayload {
  return { user: undefined, product: undefined };
}

export const FullPayload: MessageFns<FullPayload> = {
  encode(message: FullPayload, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).join();
    }
    if (message.product !== undefined) {
      Product.encode(message.product, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): FullPayload {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFullPayload();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.user = User.decode(reader, reader.uint32());
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.product = Product.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FullPayload {
    return {
      user: isSet(object.user) ? User.fromJSON(object.user) : undefined,
      product: isSet(object.product) ? Product.fromJSON(object.product) : undefined,
    };
  },

  toJSON(message: FullPayload): unknown {
    const obj: any = {};
    if (message.user !== undefined) {
      obj.user = User.toJSON(message.user);
    }
    if (message.product !== undefined) {
      obj.product = Product.toJSON(message.product);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FullPayload>, I>>(base?: I): FullPayload {
    return FullPayload.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FullPayload>, I>>(object: I): FullPayload {
    const message = createBaseFullPayload();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    message.product = (object.product !== undefined && object.product !== null)
      ? Product.fromPartial(object.product)
      : undefined;
    return message;
  },
};

function createBaseGetFullPayload(): GetFullPayload {
  return { user: undefined, product: undefined };
}

export const GetFullPayload: MessageFns<GetFullPayload> = {
  encode(message: GetFullPayload, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).join();
    }
    if (message.product !== undefined) {
      GetProduct.encode(message.product, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): GetFullPayload {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetFullPayload();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.user = User.decode(reader, reader.uint32());
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.product = GetProduct.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetFullPayload {
    return {
      user: isSet(object.user) ? User.fromJSON(object.user) : undefined,
      product: isSet(object.product) ? GetProduct.fromJSON(object.product) : undefined,
    };
  },

  toJSON(message: GetFullPayload): unknown {
    const obj: any = {};
    if (message.user !== undefined) {
      obj.user = User.toJSON(message.user);
    }
    if (message.product !== undefined) {
      obj.product = GetProduct.toJSON(message.product);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetFullPayload>, I>>(base?: I): GetFullPayload {
    return GetFullPayload.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetFullPayload>, I>>(object: I): GetFullPayload {
    const message = createBaseGetFullPayload();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    message.product = (object.product !== undefined && object.product !== null)
      ? GetProduct.fromPartial(object.product)
      : undefined;
    return message;
  },
};

function createBaseSaveResponse(): SaveResponse {
  return { status: "", message: "" };
}

export const SaveResponse: MessageFns<SaveResponse> = {
  encode(message: SaveResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.status !== "") {
      writer.uint32(10).string(message.status);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): SaveResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSaveResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.status = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SaveResponse {
    return {
      status: isSet(object.status) ? globalThis.String(object.status) : "",
      message: isSet(object.message) ? globalThis.String(object.message) : "",
    };
  },

  toJSON(message: SaveResponse): unknown {
    const obj: any = {};
    if (message.status !== "") {
      obj.status = message.status;
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SaveResponse>, I>>(base?: I): SaveResponse {
    return SaveResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SaveResponse>, I>>(object: I): SaveResponse {
    const message = createBaseSaveResponse();
    message.status = object.status ?? "";
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseFullPayloadList(): FullPayloadList {
  return { payloads: [] };
}

export const FullPayloadList: MessageFns<FullPayloadList> = {
  encode(message: FullPayloadList, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    for (const v of message.payloads) {
      GetFullPayload.encode(v!, writer.uint32(10).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): FullPayloadList {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFullPayloadList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.payloads.push(GetFullPayload.decode(reader, reader.uint32()));
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FullPayloadList {
    return {
      payloads: globalThis.Array.isArray(object?.payloads)
        ? object.payloads.map((e: any) => GetFullPayload.fromJSON(e))
        : [],
    };
  },

  toJSON(message: FullPayloadList): unknown {
    const obj: any = {};
    if (message.payloads?.length) {
      obj.payloads = message.payloads.map((e) => GetFullPayload.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FullPayloadList>, I>>(base?: I): FullPayloadList {
    return FullPayloadList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FullPayloadList>, I>>(object: I): FullPayloadList {
    const message = createBaseFullPayloadList();
    message.payloads = object.payloads?.map((e) => GetFullPayload.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEmpty(): Empty {
  return {};
}

export const Empty: MessageFns<Empty> = {
  encode(_: Empty, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Empty {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmpty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): Empty {
    return {};
  },

  toJSON(_: Empty): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<Empty>, I>>(base?: I): Empty {
    return Empty.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Empty>, I>>(_: I): Empty {
    const message = createBaseEmpty();
    return message;
  },
};

export interface Data {
  SaveUser(request: User): Promise<SaveResponse>;
  SaveProduct(request: Product): Promise<SaveResponse>;
  SaveFullPayload(request: FullPayload): Promise<SaveResponse>;
  GetAllData(request: Empty): Promise<FullPayloadList>;
}

export const DataServiceName = "data.Data";
export class DataClientImpl implements Data {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || DataServiceName;
    this.rpc = rpc;
    this.SaveUser = this.SaveUser.bind(this);
    this.SaveProduct = this.SaveProduct.bind(this);
    this.SaveFullPayload = this.SaveFullPayload.bind(this);
    this.GetAllData = this.GetAllData.bind(this);
  }
  SaveUser(request: User): Promise<SaveResponse> {
    const data = User.encode(request).finish();
    const promise = this.rpc.request(this.service, "SaveUser", data);
    return promise.then((data) => SaveResponse.decode(new BinaryReader(data)));
  }

  SaveProduct(request: Product): Promise<SaveResponse> {
    const data = Product.encode(request).finish();
    const promise = this.rpc.request(this.service, "SaveProduct", data);
    return promise.then((data) => SaveResponse.decode(new BinaryReader(data)));
  }

  SaveFullPayload(request: FullPayload): Promise<SaveResponse> {
    const data = FullPayload.encode(request).finish();
    const promise = this.rpc.request(this.service, "SaveFullPayload", data);
    return promise.then((data) => SaveResponse.decode(new BinaryReader(data)));
  }

  GetAllData(request: Empty): Promise<FullPayloadList> {
    const data = Empty.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetAllData", data);
    return promise.then((data) => FullPayloadList.decode(new BinaryReader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
