# GMeeting Backend

Backend project setup for GMeeting using Node.js, Express, and TypeScript.

## Scripts

- `npm run dev` starts the development server with `ts-node-dev`.
- `npm run build` compiles TypeScript into `dist`.
- `npm start` runs the compiled server.

## Environment

Create a `.env` file from `.env.example`:

```bash
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

## Test Route

`GET /`

```json
{
  "success": true,
  "message": "GMeeting Backend Running"
}
```
