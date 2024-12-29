import express from "express";
import {WebSocketServer} from "ws";
import http from "http";
import "dotenv/config";

const app = express();
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocketServer({server});

wss.on("connection", async (ws) => {
  ws.on("message", async (message) => {
    const {file} = JSON.parse(message);
    console.log(typeof file);
    const response = await fetch(process.env.PROCESS_URL, {
      method: "POST",
      body: JSON.stringify({fileName: file}),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    let data = null;
    let errorCode = 4;
    switch (response.statusCode) {
      case 0:
        // no error
        errorCode = 0;
        data = response.data;
        break;
      case 1:
        // No text is in the image
        errorCode = 1;
        break;
      case 2:
        // Internal error
        errorCode = 2;
        break;
      case 3:
        // File Not found
        errorCode = 3;
        break;
      default:
        // Status Unknown
        errorCode = 4;
        break;
    }
    ws.close(1000, JSON.stringify({errorCode: errorCode, data: data}));
  });
});

server.listen(8080, () => {
  console.log("Listening on port 8080");
});
