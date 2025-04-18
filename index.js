// websocketServer.js
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();
connectDB();

// MongoDB model
const Lecture = require("./models/Lecture"); // your mongoose model

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const userBuffer = new Map();

wss.on("connection", (ws, req) => {
  console.log("New client connected");
  let userId = null;

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);

      if (data.type === "init") {
        // Initial message with user token & meta info
        try{
          userId = data.userId;
          userBuffer.set(userId,{
            content:"[]",
            meta: data.meta || {}
          });
          console.log("User ID set: and data is ", userId, data.meta);
        }catch(err){
          console.error("Error parsing user ID:", err.message);
        }

      } else if (data.type === "content" && userId) {
        // Add content block
        const current = userBuffer.get(userId);

        try {
          const existingArray = JSON.parse(current.content || '[]');
          const newArray = JSON.parse(data.content);
          const combinedArray = [...existingArray, ...newArray];

          current.content = JSON.stringify(combinedArray);
          console.log("Content updated for user:", userId, current.content);

          wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                type: "content",
                content: data.content
              }));
            }
          });
          console.log("Content sent to other clients:", data.content);
        } catch (err) {
          console.error('Failed to parse content:', err);
        }
      }
    } catch (err) {
      console.error("Message error:", err.message);
    }
  });

  ws.on("close", async () => {
    if (userId && userBuffer.has(userId)) {
      const { content, meta } = userBuffer.get(userId);
      let delta;
      try {
        delta = JSON.parse(content); // Parse the Delta string
      } catch (err) {
        throw new Error("Invalid Delta format: " + err.message);
      }

      if(!Array.isArray(delta) || delta.length === 0){ 
        throw new Error("Delta is not an array");
      }

      const last = delta[delta.length - 1];

      if (typeof last.insert === "string" && !last.insert.endsWith('\n')) {
        last.insert += '\n'; // Add newline to last insert
      } else if (typeof last.insert !== "string") {
        // Add a new insert block with newline if last insert is not string
        delta.push({ insert: '\n' });
      }
      try {
        const lecture = new Lecture({
          _id: new mongoose.Types.ObjectId(),
          title: meta.title,
          description: meta.description,
          content: JSON.stringify(delta),
          isPublicTo: meta.isPublicTo,
          userId: userId,
        });
        await lecture.save();
        console.log("Lecture saved successfully.");
      } catch (err) {
        console.error("Error saving lecture:", err.message);
      }
      userBuffer.delete(userId);
    }
  });
});


server.listen(8080, () => {
  console.log("WebSocket server running on port 8080");
});
