const express = require("express");
const app = express();
app.use(express.json());

app.use(function debug(_req, _res, next) {
    console.log('request received');
    next();
})

const superHeroes = [
    {
        name: "Iron Man",
        power: ["money"],
        color: "red",
        isAlive: true,
        age: 46,
        image: "https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart"
    },
    {
        name: "Thor",
        power: ["electricity", "worthy"],
        color: "blue",
        isAlive: true,
        age: 300,
        image: "https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg"
    },
    {
        name: "Daredevil",
        power: ["blind"],
        color: "red",
        isAlive: false,
        age: 30,
        image: "https://aws.vdkimg.com/film/2/5/1/1/251170_backdrop_scale_1280xauto.jpg"
    }
]



app.get("/heroes", (_req, res) => {
    res.json(superHeroes);
});

app.get("/heroes/:name", (req, res) => {
    const superHero = superHeroes.find((hero) => {
        return hero.name === req.params.name;
    });
    res.json(superHero);
});

app.get("/heroes/:name/powers", (req, res) => {
    const superHero = superHeroes.find((hero) => {
        return hero.name === req.params.name;
    });
    res.json(superHero.power)
});

function transformName(req, res, next) {
    req.body.name = req.body.name.toLowerCase();
    next();
}

app.post("/heroes", transformName, (req, res) => {
    const superHero = superHeroes.map((heros) => {
        return heros.name.toLowerCase();
    });


    if (superHero.indexOf(req.body.name) > -1) {
        res.send("ce héro éxiste déjà, rentrez en un autre :D ")
    } else {
        superHeroes.push({
            name: req.body.name,
            power: req.body.power,
            color: req.body.color,
            isAlive: req.body.isAlive,
            age: req.body.age,
            image: req.body.image
        });
        console.log(superHero.indexOf(req.body.name));
        res.send('ok, héro ajouté !:)');

    }

})
//copy and paste this in postman

// {
//     "name": "Spiderman",
//     "power": ["ultraInstinct", "cobweb", "ramp on the wall"],
//     "color": "red & blue",
//     "isAlive": true,
//     "age": 23,
//     "image": "https://upload.wikimedia.org/wikipedia/commons/9/90/Spiderman.JPG"
// }


app.listen(8000, () => {
    console.log("Listening on port 8000");

});

