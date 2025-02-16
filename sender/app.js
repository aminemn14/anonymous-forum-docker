const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();

const API_URL = process.env.API_URL || "http://api:5000";

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const html = `
    <!doctype html>
    <html>
    <head><title>Forum - Sender</title></head>
    <body>
      <h1>Post a Message</h1>
      <form action="/send" method="post">
        <label>Pseudonym: <input type="text" name="pseudonym"></label><br>
        <label>Message: <textarea name="content"></textarea></label><br>
        <button type="submit">Send</button>
      </form>
    </body>
    </html>
  `;
  res.send(html);
});

app.post("/send", async (req, res) => {
  const { pseudonym, content } = req.body;
  if (!pseudonym || !content) {
    return res.status(400).send("Missing pseudonym or content");
  }
  try {
    const response = await axios.post(`${API_URL}/messages`, {
      pseudonym,
      content,
    });
    if (response.status === 201) {
      return res.redirect("/");
    } else {
      return res.status(400).send("Failed to post message");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error posting message");
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Sender service running on port ${port}`);
});
