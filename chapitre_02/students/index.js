const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());
// const students = require("./data/students.json")

// console.log(students);

const students = [

]

app.get("/", (_req, res) => {
    res.send("Students");
});

app.get("/student", (_req, res) => {
    res.json(students)
})

app.post("/student", (req, res) => {
	students.push({
        id: students.length + 1,
		name: req.body.name
	});

	res.send(students);
});

app.listen(8000, () => {
    console.log("Listening on port 8000");

});