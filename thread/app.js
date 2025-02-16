const express = require("express");
const axios = require("axios");
const app = express();

const API_URL = process.env.API_URL || "http://api:5100";

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/messages`);
    const messages = response.data;
    let html = `
      <!doctype html>
      <html>
      <head><title>Forum - Thread</title></head>
      <body>
        <h1>Forum Messages</h1>
        <ul>
    `;
    messages.forEach((message) => {
      html += `<li><strong>${message.pseudonym}</strong>: ${message.content}</li>`;
    });
    html += `
        </ul>
      </body>
      </html>
    `;
    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving messages");
  }
});

const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`Thread service running on port ${port}`);
});
