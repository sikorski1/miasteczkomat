# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# NO CHECKED-IN PROTOBUF GENCODE
# source: query.proto
# Protobuf Python Version: 5.29.0
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import runtime_version as _runtime_version
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
_runtime_version.ValidateProtobufRuntimeVersion(
    _runtime_version.Domain.PUBLIC,
    5,
    29,
    0,
    '',
    'query.proto'
)
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0bquery.proto\x12\x05query\"\x1d\n\x0cRequestQuery\x12\r\n\x05query\x18\x01 \x01(\t\"|\n\x04User\x12\x0c\n\x04\x64orm\x18\x01 \x01(\t\x12\x13\n\x0broom_number\x18\x02 \x01(\x05\x12\x0c\n\x04name\x18\x03 \x01(\t\x12\x0f\n\x07surname\x18\x04 \x01(\t\x12\r\n\x05phone\x18\x05 \x01(\t\x12\x11\n\tinstagram\x18\x06 \x01(\t\x12\x10\n\x08\x66\x61\x63\x65\x62ook\x18\x07 \x01(\t\"\x96\x01\n\x07Product\x12\x0c\n\x04name\x18\x01 \x01(\t\x12\r\n\x05photo\x18\x02 \x01(\t\x12\x10\n\x08\x63urrency\x18\x03 \x01(\t\x12\r\n\x05price\x18\x04 \x01(\x01\x12\x10\n\x08\x63\x61tegory\x18\x05 \x01(\t\x12\x13\n\x0b\x64\x65scription\x18\x06 \x01(\t\x12\x13\n\x0b\x61\x63tion_type\x18\x07 \x01(\t\x12\x11\n\tperson_id\x18\x08 \x01(\t\"I\n\x0b\x46ullPayload\x12\x19\n\x04user\x18\x01 \x01(\x0b\x32\x0b.query.User\x12\x1f\n\x07product\x18\x02 \x01(\x0b\x32\x0e.query.Product\"7\n\x0f\x46ullPayloadList\x12$\n\x08payloads\x18\x01 \x03(\x0b\x32\x12.query.FullPayload2J\n\x05Query\x12\x41\n\x12GetProductsByQuery\x12\x13.query.RequestQuery\x1a\x16.query.FullPayloadListB\x0fZ\r./proto;queryb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'query_pb2', _globals)
if not _descriptor._USE_C_DESCRIPTORS:
  _globals['DESCRIPTOR']._loaded_options = None
  _globals['DESCRIPTOR']._serialized_options = b'Z\r./proto;query'
  _globals['_REQUESTQUERY']._serialized_start=22
  _globals['_REQUESTQUERY']._serialized_end=51
  _globals['_USER']._serialized_start=53
  _globals['_USER']._serialized_end=177
  _globals['_PRODUCT']._serialized_start=180
  _globals['_PRODUCT']._serialized_end=330
  _globals['_FULLPAYLOAD']._serialized_start=332
  _globals['_FULLPAYLOAD']._serialized_end=405
  _globals['_FULLPAYLOADLIST']._serialized_start=407
  _globals['_FULLPAYLOADLIST']._serialized_end=462
  _globals['_QUERY']._serialized_start=464
  _globals['_QUERY']._serialized_end=538
# @@protoc_insertion_point(module_scope)
