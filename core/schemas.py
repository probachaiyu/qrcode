from ninja import Schema
from pydantic import AnyHttpUrl


class LinkPayload(Schema):
    url: AnyHttpUrl


class QRCodePayload(Schema):
    qr_code:  str

