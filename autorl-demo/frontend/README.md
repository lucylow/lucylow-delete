Autorl demo frontend

This is a minimal React frontend for the autorl demo. It embeds mock mobile pages served by the demo mock server and can connect to a backend websocket if available.

Default local setup uses the mock server at http://localhost:4000. The iframe source will point to `http://localhost:4000/mock/mobile` and the Dashboard Toggle button will flip between the two mock UI variants.

Run mock server:

1. cd autorl-demo\mock-server
2. npm install
3. npm start

Run frontend:

1. cd autorl-demo\frontend
2. npm install
3. npm start

If your backend runs on a different host/port, set REACT_APP_WS_URL and REACT_APP_API_URL environment variables.
