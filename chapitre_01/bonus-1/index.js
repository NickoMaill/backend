const express = require('express');
const app = express();
const axios = require('axios');
const countries = require('./data/countries.json');

app.get("/", (req, res) => {
    res.send("Welcome to Rest Countries");
});

app.get("/countries/all", (req, res) => {
    res.json(countries);
})

app.listen(8000, () => {
    console.log("Listening on port 8000");
});

