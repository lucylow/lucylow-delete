Autorl demo frontend

This is a minimal React frontend for the autorl demo. It connects to a backend websocket at ws://localhost:5000/ws and embeds two mock mobile pages served by the backend.

Run:

1. npm install
2. npm start

If your backend runs on a different host/port, set REACT_APP_WS_URL and REACT_APP_API_URL environment variables.
