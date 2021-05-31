import segno as segno
from django.http import HttpRequest
from django.shortcuts import render
from django.utils.safestring import mark_safe
from ninja import Router
from asgiref.sync import sync_to_async
from core.schemas import LinkPayload, QRCodePayload

router = Router()

@router.get("/", response={200: dict})
async def index(request: HttpRequest):
    return render(request, 'index.html', {})


@router.post("/qr-code-generate", response={200: QRCodePayload})
async def request_payment(request, payload: LinkPayload):
    """
    Endpoint creates initial record for payment
    And returns or crypto wallet either link for card payment
    Also it creates anonymous_session record which will recognize your operations
    You need to use in all next requests
    """

    qr = segno.make(payload.url)
    return 200, QRCodePayload(qr_code=mark_safe(qr.png_data_uri()))