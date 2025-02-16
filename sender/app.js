const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();

const API_URL = process.env.API_URL || "http://api:5100";

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const html = `
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Forum - Sender</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gradient-to-r from-blue-50 to-indigo-50 h-screen flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-3xl font-bold mb-6 text-center">Post a Message</h1>
        <form action="/send" method="post" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Pseudonym</label>
            <input type="text" name="pseudonym" placeholder="Your pseudonym" class="mt-1 p-2 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Message</label>
            <textarea name="content" rows="4" placeholder="Your message" class="mt-1 p-2 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
          </div>
          <div>
            <button type="submit" class="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">Send</button>
          </div>
        </form>
      </div>
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
