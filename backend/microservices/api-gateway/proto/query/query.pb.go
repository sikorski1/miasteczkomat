// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.36.5
// 	protoc        v5.29.3
// source: query/query.proto

package query

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
	unsafe "unsafe"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type RequestQuery struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	Query         string                 `protobuf:"bytes,1,opt,name=query,proto3" json:"query,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *RequestQuery) Reset() {
	*x = RequestQuery{}
	mi := &file_query_query_proto_msgTypes[0]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *RequestQuery) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RequestQuery) ProtoMessage() {}

func (x *RequestQuery) ProtoReflect() protoreflect.Message {
	mi := &file_query_query_proto_msgTypes[0]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RequestQuery.ProtoReflect.Descriptor instead.
func (*RequestQuery) Descriptor() ([]byte, []int) {
	return file_query_query_proto_rawDescGZIP(), []int{0}
}

func (x *RequestQuery) GetQuery() string {
	if x != nil {
		return x.Query
	}
	return ""
}

type User struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	Dorm          string                 `protobuf:"bytes,1,opt,name=dorm,proto3" json:"dorm,omitempty"`
	RoomNumber    int32                  `protobuf:"varint,2,opt,name=room_number,json=roomNumber,proto3" json:"room_number,omitempty"`
	Name          string                 `protobuf:"bytes,3,opt,name=name,proto3" json:"name,omitempty"`
	Surname       string                 `protobuf:"bytes,4,opt,name=surname,proto3" json:"surname,omitempty"`
	Phone         string                 `protobuf:"bytes,5,opt,name=phone,proto3" json:"phone,omitempty"`
	Instagram     string                 `protobuf:"bytes,6,opt,name=instagram,proto3" json:"instagram,omitempty"`
	Facebook      string                 `protobuf:"bytes,7,opt,name=facebook,proto3" json:"facebook,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *User) Reset() {
	*x = User{}
	mi := &file_query_query_proto_msgTypes[1]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *User) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*User) ProtoMessage() {}

func (x *User) ProtoReflect() protoreflect.Message {
	mi := &file_query_query_proto_msgTypes[1]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use User.ProtoReflect.Descriptor instead.
func (*User) Descriptor() ([]byte, []int) {
	return file_query_query_proto_rawDescGZIP(), []int{1}
}

func (x *User) GetDorm() string {
	if x != nil {
		return x.Dorm
	}
	return ""
}

func (x *User) GetRoomNumber() int32 {
	if x != nil {
		return x.RoomNumber
	}
	return 0
}

func (x *User) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *User) GetSurname() string {
	if x != nil {
		return x.Surname
	}
	return ""
}

func (x *User) GetPhone() string {
	if x != nil {
		return x.Phone
	}
	return ""
}

func (x *User) GetInstagram() string {
	if x != nil {
		return x.Instagram
	}
	return ""
}

func (x *User) GetFacebook() string {
	if x != nil {
		return x.Facebook
	}
	return ""
}

type Product struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	Name          string                 `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
	Photo         string                 `protobuf:"bytes,2,opt,name=photo,proto3" json:"photo,omitempty"`
	Currency      string                 `protobuf:"bytes,3,opt,name=currency,proto3" json:"currency,omitempty"`
	Price         float64                `protobuf:"fixed64,4,opt,name=price,proto3" json:"price,omitempty"`
	Category      string                 `protobuf:"bytes,5,opt,name=category,proto3" json:"category,omitempty"`
	Description   string                 `protobuf:"bytes,6,opt,name=description,proto3" json:"description,omitempty"`
	ActionType    string                 `protobuf:"bytes,7,opt,name=action_type,json=actionType,proto3" json:"action_type,omitempty"`
	PersonId      string                 `protobuf:"bytes,8,opt,name=person_id,json=personId,proto3" json:"person_id,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *Product) Reset() {
	*x = Product{}
	mi := &file_query_query_proto_msgTypes[2]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *Product) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Product) ProtoMessage() {}

func (x *Product) ProtoReflect() protoreflect.Message {
	mi := &file_query_query_proto_msgTypes[2]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Product.ProtoReflect.Descriptor instead.
func (*Product) Descriptor() ([]byte, []int) {
	return file_query_query_proto_rawDescGZIP(), []int{2}
}

func (x *Product) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *Product) GetPhoto() string {
	if x != nil {
		return x.Photo
	}
	return ""
}

func (x *Product) GetCurrency() string {
	if x != nil {
		return x.Currency
	}
	return ""
}

func (x *Product) GetPrice() float64 {
	if x != nil {
		return x.Price
	}
	return 0
}

func (x *Product) GetCategory() string {
	if x != nil {
		return x.Category
	}
	return ""
}

func (x *Product) GetDescription() string {
	if x != nil {
		return x.Description
	}
	return ""
}

func (x *Product) GetActionType() string {
	if x != nil {
		return x.ActionType
	}
	return ""
}

func (x *Product) GetPersonId() string {
	if x != nil {
		return x.PersonId
	}
	return ""
}

type FullPayload struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	User          *User                  `protobuf:"bytes,1,opt,name=user,proto3" json:"user,omitempty"`
	Product       *Product               `protobuf:"bytes,2,opt,name=product,proto3" json:"product,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *FullPayload) Reset() {
	*x = FullPayload{}
	mi := &file_query_query_proto_msgTypes[3]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *FullPayload) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*FullPayload) ProtoMessage() {}

func (x *FullPayload) ProtoReflect() protoreflect.Message {
	mi := &file_query_query_proto_msgTypes[3]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use FullPayload.ProtoReflect.Descriptor instead.
func (*FullPayload) Descriptor() ([]byte, []int) {
	return file_query_query_proto_rawDescGZIP(), []int{3}
}

func (x *FullPayload) GetUser() *User {
	if x != nil {
		return x.User
	}
	return nil
}

func (x *FullPayload) GetProduct() *Product {
	if x != nil {
		return x.Product
	}
	return nil
}

type FullPayloadList struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	Payloads      []*FullPayload         `protobuf:"bytes,1,rep,name=payloads,proto3" json:"payloads,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *FullPayloadList) Reset() {
	*x = FullPayloadList{}
	mi := &file_query_query_proto_msgTypes[4]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *FullPayloadList) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*FullPayloadList) ProtoMessage() {}

func (x *FullPayloadList) ProtoReflect() protoreflect.Message {
	mi := &file_query_query_proto_msgTypes[4]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use FullPayloadList.ProtoReflect.Descriptor instead.
func (*FullPayloadList) Descriptor() ([]byte, []int) {
	return file_query_query_proto_rawDescGZIP(), []int{4}
}

func (x *FullPayloadList) GetPayloads() []*FullPayload {
	if x != nil {
		return x.Payloads
	}
	return nil
}

var File_query_query_proto protoreflect.FileDescriptor

var file_query_query_proto_rawDesc = string([]byte{
	0x0a, 0x11, 0x71, 0x75, 0x65, 0x72, 0x79, 0x2f, 0x71, 0x75, 0x65, 0x72, 0x79, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x12, 0x05, 0x71, 0x75, 0x65, 0x72, 0x79, 0x22, 0x24, 0x0a, 0x0c, 0x52, 0x65,
	0x71, 0x75, 0x65, 0x73, 0x74, 0x51, 0x75, 0x65, 0x72, 0x79, 0x12, 0x14, 0x0a, 0x05, 0x71, 0x75,
	0x65, 0x72, 0x79, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05, 0x71, 0x75, 0x65, 0x72, 0x79,
	0x22, 0xb9, 0x01, 0x0a, 0x04, 0x55, 0x73, 0x65, 0x72, 0x12, 0x12, 0x0a, 0x04, 0x64, 0x6f, 0x72,
	0x6d, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x64, 0x6f, 0x72, 0x6d, 0x12, 0x1f, 0x0a,
	0x0b, 0x72, 0x6f, 0x6f, 0x6d, 0x5f, 0x6e, 0x75, 0x6d, 0x62, 0x65, 0x72, 0x18, 0x02, 0x20, 0x01,
	0x28, 0x05, 0x52, 0x0a, 0x72, 0x6f, 0x6f, 0x6d, 0x4e, 0x75, 0x6d, 0x62, 0x65, 0x72, 0x12, 0x12,
	0x0a, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61,
	0x6d, 0x65, 0x12, 0x18, 0x0a, 0x07, 0x73, 0x75, 0x72, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x04, 0x20,
	0x01, 0x28, 0x09, 0x52, 0x07, 0x73, 0x75, 0x72, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x14, 0x0a, 0x05,
	0x70, 0x68, 0x6f, 0x6e, 0x65, 0x18, 0x05, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05, 0x70, 0x68, 0x6f,
	0x6e, 0x65, 0x12, 0x1c, 0x0a, 0x09, 0x69, 0x6e, 0x73, 0x74, 0x61, 0x67, 0x72, 0x61, 0x6d, 0x18,
	0x06, 0x20, 0x01, 0x28, 0x09, 0x52, 0x09, 0x69, 0x6e, 0x73, 0x74, 0x61, 0x67, 0x72, 0x61, 0x6d,
	0x12, 0x1a, 0x0a, 0x08, 0x66, 0x61, 0x63, 0x65, 0x62, 0x6f, 0x6f, 0x6b, 0x18, 0x07, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x08, 0x66, 0x61, 0x63, 0x65, 0x62, 0x6f, 0x6f, 0x6b, 0x22, 0xe1, 0x01, 0x0a,
	0x07, 0x50, 0x72, 0x6f, 0x64, 0x75, 0x63, 0x74, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d, 0x65,
	0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x14, 0x0a, 0x05,
	0x70, 0x68, 0x6f, 0x74, 0x6f, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05, 0x70, 0x68, 0x6f,
	0x74, 0x6f, 0x12, 0x1a, 0x0a, 0x08, 0x63, 0x75, 0x72, 0x72, 0x65, 0x6e, 0x63, 0x79, 0x18, 0x03,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x63, 0x75, 0x72, 0x72, 0x65, 0x6e, 0x63, 0x79, 0x12, 0x14,
	0x0a, 0x05, 0x70, 0x72, 0x69, 0x63, 0x65, 0x18, 0x04, 0x20, 0x01, 0x28, 0x01, 0x52, 0x05, 0x70,
	0x72, 0x69, 0x63, 0x65, 0x12, 0x1a, 0x0a, 0x08, 0x63, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79,
	0x18, 0x05, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x63, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79,
	0x12, 0x20, 0x0a, 0x0b, 0x64, 0x65, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74, 0x69, 0x6f, 0x6e, 0x18,
	0x06, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0b, 0x64, 0x65, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74, 0x69,
	0x6f, 0x6e, 0x12, 0x1f, 0x0a, 0x0b, 0x61, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x5f, 0x74, 0x79, 0x70,
	0x65, 0x18, 0x07, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0a, 0x61, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x54,
	0x79, 0x70, 0x65, 0x12, 0x1b, 0x0a, 0x09, 0x70, 0x65, 0x72, 0x73, 0x6f, 0x6e, 0x5f, 0x69, 0x64,
	0x18, 0x08, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x70, 0x65, 0x72, 0x73, 0x6f, 0x6e, 0x49, 0x64,
	0x22, 0x58, 0x0a, 0x0b, 0x46, 0x75, 0x6c, 0x6c, 0x50, 0x61, 0x79, 0x6c, 0x6f, 0x61, 0x64, 0x12,
	0x1f, 0x0a, 0x04, 0x75, 0x73, 0x65, 0x72, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0b, 0x2e,
	0x71, 0x75, 0x65, 0x72, 0x79, 0x2e, 0x55, 0x73, 0x65, 0x72, 0x52, 0x04, 0x75, 0x73, 0x65, 0x72,
	0x12, 0x28, 0x0a, 0x07, 0x70, 0x72, 0x6f, 0x64, 0x75, 0x63, 0x74, 0x18, 0x02, 0x20, 0x01, 0x28,
	0x0b, 0x32, 0x0e, 0x2e, 0x71, 0x75, 0x65, 0x72, 0x79, 0x2e, 0x50, 0x72, 0x6f, 0x64, 0x75, 0x63,
	0x74, 0x52, 0x07, 0x70, 0x72, 0x6f, 0x64, 0x75, 0x63, 0x74, 0x22, 0x41, 0x0a, 0x0f, 0x46, 0x75,
	0x6c, 0x6c, 0x50, 0x61, 0x79, 0x6c, 0x6f, 0x61, 0x64, 0x4c, 0x69, 0x73, 0x74, 0x12, 0x2e, 0x0a,
	0x08, 0x70, 0x61, 0x79, 0x6c, 0x6f, 0x61, 0x64, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32,
	0x12, 0x2e, 0x71, 0x75, 0x65, 0x72, 0x79, 0x2e, 0x46, 0x75, 0x6c, 0x6c, 0x50, 0x61, 0x79, 0x6c,
	0x6f, 0x61, 0x64, 0x52, 0x08, 0x70, 0x61, 0x79, 0x6c, 0x6f, 0x61, 0x64, 0x73, 0x32, 0x4a, 0x0a,
	0x05, 0x51, 0x75, 0x65, 0x72, 0x79, 0x12, 0x41, 0x0a, 0x12, 0x47, 0x65, 0x74, 0x50, 0x72, 0x6f,
	0x64, 0x75, 0x63, 0x74, 0x73, 0x42, 0x79, 0x51, 0x75, 0x65, 0x72, 0x79, 0x12, 0x13, 0x2e, 0x71,
	0x75, 0x65, 0x72, 0x79, 0x2e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x51, 0x75, 0x65, 0x72,
	0x79, 0x1a, 0x16, 0x2e, 0x71, 0x75, 0x65, 0x72, 0x79, 0x2e, 0x46, 0x75, 0x6c, 0x6c, 0x50, 0x61,
	0x79, 0x6c, 0x6f, 0x61, 0x64, 0x4c, 0x69, 0x73, 0x74, 0x42, 0x0f, 0x5a, 0x0d, 0x2e, 0x2f, 0x71,
	0x75, 0x65, 0x72, 0x79, 0x3b, 0x71, 0x75, 0x65, 0x72, 0x79, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x33,
})

var (
	file_query_query_proto_rawDescOnce sync.Once
	file_query_query_proto_rawDescData []byte
)

func file_query_query_proto_rawDescGZIP() []byte {
	file_query_query_proto_rawDescOnce.Do(func() {
		file_query_query_proto_rawDescData = protoimpl.X.CompressGZIP(unsafe.Slice(unsafe.StringData(file_query_query_proto_rawDesc), len(file_query_query_proto_rawDesc)))
	})
	return file_query_query_proto_rawDescData
}

var file_query_query_proto_msgTypes = make([]protoimpl.MessageInfo, 5)
var file_query_query_proto_goTypes = []any{
	(*RequestQuery)(nil),    // 0: query.RequestQuery
	(*User)(nil),            // 1: query.User
	(*Product)(nil),         // 2: query.Product
	(*FullPayload)(nil),     // 3: query.FullPayload
	(*FullPayloadList)(nil), // 4: query.FullPayloadList
}
var file_query_query_proto_depIdxs = []int32{
	1, // 0: query.FullPayload.user:type_name -> query.User
	2, // 1: query.FullPayload.product:type_name -> query.Product
	3, // 2: query.FullPayloadList.payloads:type_name -> query.FullPayload
	0, // 3: query.Query.GetProductsByQuery:input_type -> query.RequestQuery
	4, // 4: query.Query.GetProductsByQuery:output_type -> query.FullPayloadList
	4, // [4:5] is the sub-list for method output_type
	3, // [3:4] is the sub-list for method input_type
	3, // [3:3] is the sub-list for extension type_name
	3, // [3:3] is the sub-list for extension extendee
	0, // [0:3] is the sub-list for field type_name
}

func init() { file_query_query_proto_init() }
func file_query_query_proto_init() {
	if File_query_query_proto != nil {
		return
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: unsafe.Slice(unsafe.StringData(file_query_query_proto_rawDesc), len(file_query_query_proto_rawDesc)),
			NumEnums:      0,
			NumMessages:   5,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_query_query_proto_goTypes,
		DependencyIndexes: file_query_query_proto_depIdxs,
		MessageInfos:      file_query_query_proto_msgTypes,
	}.Build()
	File_query_query_proto = out.File
	file_query_query_proto_goTypes = nil
	file_query_query_proto_depIdxs = nil
}