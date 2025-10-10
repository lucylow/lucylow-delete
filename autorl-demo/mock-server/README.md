Autorl demo mock server

Run locally:

1. cd mock-server
2. npm install
3. npm start

Endpoints:
- GET /mock/mobile -> serves active mock mobile page (mobile1 or mobile2)
- GET /api/variant -> returns { variant: 'mobile1' }
- POST /api/variant { variant: 'mobile2' } -> switch active variant
- GET /api/products
- GET /api/products/:id
- GET /api/transactions
- POST /api/transactions
- GET /api/bookings
- POST /api/bookings

Use this server to simulate UI updates by switching the variant during your demo.
