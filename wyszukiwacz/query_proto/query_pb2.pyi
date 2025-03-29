from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class RequestQuery(_message.Message):
    __slots__ = ("query",)
    QUERY_FIELD_NUMBER: _ClassVar[int]
    query: str
    def __init__(self, query: _Optional[str] = ...) -> None: ...

class User(_message.Message):
    __slots__ = ("dorm", "room_number", "name", "surname", "phone", "instagram", "facebook")
    DORM_FIELD_NUMBER: _ClassVar[int]
    ROOM_NUMBER_FIELD_NUMBER: _ClassVar[int]
    NAME_FIELD_NUMBER: _ClassVar[int]
    SURNAME_FIELD_NUMBER: _ClassVar[int]
    PHONE_FIELD_NUMBER: _ClassVar[int]
    INSTAGRAM_FIELD_NUMBER: _ClassVar[int]
    FACEBOOK_FIELD_NUMBER: _ClassVar[int]
    dorm: str
    room_number: str
    name: str
    surname: str
    phone: str
    instagram: str
    facebook: str
    def __init__(self, dorm: _Optional[str] = ..., room_number: _Optional[str] = ..., name: _Optional[str] = ..., surname: _Optional[str] = ..., phone: _Optional[str] = ..., instagram: _Optional[str] = ..., facebook: _Optional[str] = ...) -> None: ...

class Product(_message.Message):
    __slots__ = ("name", "photo", "currency", "price", "category", "description", "action_type", "person_id")
    NAME_FIELD_NUMBER: _ClassVar[int]
    PHOTO_FIELD_NUMBER: _ClassVar[int]
    CURRENCY_FIELD_NUMBER: _ClassVar[int]
    PRICE_FIELD_NUMBER: _ClassVar[int]
    CATEGORY_FIELD_NUMBER: _ClassVar[int]
    DESCRIPTION_FIELD_NUMBER: _ClassVar[int]
    ACTION_TYPE_FIELD_NUMBER: _ClassVar[int]
    PERSON_ID_FIELD_NUMBER: _ClassVar[int]
    name: str
    photo: str
    currency: str
    price: float
    category: str
    description: str
    action_type: str
    person_id: str
    def __init__(self, name: _Optional[str] = ..., photo: _Optional[str] = ..., currency: _Optional[str] = ..., price: _Optional[float] = ..., category: _Optional[str] = ..., description: _Optional[str] = ..., action_type: _Optional[str] = ..., person_id: _Optional[str] = ...) -> None: ...

class FullPayload(_message.Message):
    __slots__ = ("user", "product")
    USER_FIELD_NUMBER: _ClassVar[int]
    PRODUCT_FIELD_NUMBER: _ClassVar[int]
    user: User
    product: Product
    def __init__(self, user: _Optional[_Union[User, _Mapping]] = ..., product: _Optional[_Union[Product, _Mapping]] = ...) -> None: ...

class FullPayloadList(_message.Message):
    __slots__ = ("payloads",)
    PAYLOADS_FIELD_NUMBER: _ClassVar[int]
    payloads: _containers.RepeatedCompositeFieldContainer[FullPayload]
    def __init__(self, payloads: _Optional[_Iterable[_Union[FullPayload, _Mapping]]] = ...) -> None: ...
