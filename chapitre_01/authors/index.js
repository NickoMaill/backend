const express = require("express");
const app = express();

const authors = [
    {
        name: "Lawrence Nowell",
        nationality: "UK",
        books: ["Beowulf"]
    },
    {
        name: "William Shakespeare",
        nationality: "UK",
        books: ["Hamlet", "Othello", "Romeo and Juliet", "MacBeth"]
    },
    {
        name: "Charles Dickens",
        nationality: "US",
        books: ["Oliver Twist", "A Christmas Carol"]
    },
    {
        name: "Oscar Wilde",
        nationality: "UK",
        books: ["The Picture of Dorian Gray", "The Importance of Being Earnest"]
    },
]

app.get("/", (req, res) => {
    res.send("Authors API");
});

app.get("/authors/:authorsId", (req, res) => {
    const author = authors[parseInt(req.params.authorsId)]

    if (authors.indexOf(author).toString() === req.params.authorsId) {
        return res.send(author.name + "," + author.nationality);

    } else {
        return res.send("This author does not exist")
    }

});

app.get("/authors/:authorsId/books/", (req, res) => {
    const author = authors[parseInt(req.params.authorsId)]

    if (authors.indexOf(author).toString() === req.params.authorsId) {
        return res.send(author.books.join(", "));

    } else {
        return res.send("This author does not exist")
    }
})


app.listen(8000, () => {
    console.log("Listening on port 8000");
});

