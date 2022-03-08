const express = require("express");
const app = express();
const fs = require("fs");

app.get("/", (_req, res) => {
    res.send("Students");
});

app.listen(8000, () => {
    console.log("Listening on port 8000");
});
