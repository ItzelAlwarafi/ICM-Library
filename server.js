const express = require('express');
const db = require('./db');

// require() imports and middleware here ^ ///////

const PORT = process.env.PORT || 3001;

const app = express();

// app.use() middleware here ^ ///////////////////

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

app.get("/", (req, res) => res.send("This is our landing page!"));