import json

from pyzbar.pyzbar import decode
from django.test import TestCase


class YourTestClass(TestCase):


    def test_valid_url(self):
        payload = {"url": "https://google.com"}
        response = self.client.post('/qr-code-generate', json.dumps(payload), content_type='application/json')
        self.assertEqual(response.status_code, 200)


    def test_invalid_url(self):
        payload = {"url": "google.com"}
        response = self.client.post('/qr-code-generate', payload)
        self.assertEqual(response.status_code, 400)