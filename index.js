const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// Serve HTML file at root endpoint
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// SSE endpoint for streaming messages
app.get("/stream", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    send(res);
});

let i = 0;
function send(res) {
    res.write(`data: Hello from backend ----- [${i++}]\n\n`);
    setTimeout(() => send(res), 1000); // Send message every second
}

app.listen(8080, () => {
    console.log("Listening on port 8080");
});
