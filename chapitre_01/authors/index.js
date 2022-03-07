const express = require("express");
const app = express();
const authors = require("./data/authors.json")

app.get("/", (req, res) => {
    res.send("Authors API");
});

app.get("/authors/:id", (req, res) => {
    const author = authors[parseInt(req.params.id)]

    if (authors.indexOf(author).toString() === req.params.id) {
        return res.json({ name: author.name, nationality: author.nationality })

    } else {
        return res.send("This author does not exist")
    }

});

app.get("/authors/:id/books/", (req, res) => {
    const author = authors[parseInt(req.params.id)]

    if (authors.indexOf(author).toString() === req.params.id) {
        return res.json(author.books);

    } else {
        return res.send("This author does not exist")
    }
})


app.listen(8000, () => {
    console.log("Listening on port 8000");
});

