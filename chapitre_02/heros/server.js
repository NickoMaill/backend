const express = require("express");
const app = express();
const fs = require("fs");
// const superHeroes = require('./data/herosData.json');

function debug(_req, _res, next) {
    console.log('request receive');
    next();
}

function transformName(req, _res, next) {
    req.body.name = req.body.name.toLowerCase();
    next();
}

function findHero(req, _res, next) {
    const hero = superHeroes.find((hero) => {
        return (hero.name.toLowerCase().replace(" ", "-") === req.params.name.toLowerCase().replace(" ", "-"));
    })
    req.hero = hero;
    next();
}

const superHeroes = [
    {
        name: "Iron Man",
        power: [
            "money"
        ],
        color: "red",
        isAlive: true,
        age: 46,
        image: "https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart"
    },
    {
        name: "Thor",
        power: [
            "electricity",
            "worthy"
        ],
        color: "blue",
        isAlive: true,
        age: 300,
        image: "https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg"
    },
    {
        name: "Daredevil",
        power: [
            "blind"
        ],
        color: "red",
        isAlive: false,
        age: 30,
        image: "https://aws.vdkimg.com/film/2/5/1/1/251170_backdrop_scale_1280xauto.jpg"
    }
]

app.use(express.json(), debug);

app.get("/heroes", (_req, res) => {
    // console.log(superHeroes);
    res.json(superHeroes);
});

app.get("/heroes/:name", findHero, (req, res) => {
    // console.log(req.hero);
    res.json(req.hero)
})

app.get("/heroes/:name/powers", findHero, (req, res) => {
    // console.log(req.hero.power);
    res.json(req.hero.power);
})

app.post("/heroes",transformName, (req, res) => {
    console.log(req.body.name);
    const superHero = superHeroes.map((hero) => {
        return hero.name
    })
    if (superHero.indexOf(req.body.name) > -1) {
        res.status(400).send("Hero already exist");
    }
    superHeroes.push(req.body);
    res.json({
        message: "Héro Ajouté",
        superHeroes
    })
});

app.patch("/heroes/:name/powers", findHero, (req, res) => {
    const hero = req.hero;

    hero.power.push(req.body.power);
    console.log(hero);
    res.json({
        message: "Pouvoir ajouté",
        hero,
    });
});



// Write content in JSON data (herosData.json)

// app.post("/heroes", transformName, (req, res) => {
//     const newHero = {

//         name: req.body.name,
//         power: req.body.power,
//         color: req.body.color,
//         isAlive: req.body.isAlive,
//         age: req.body.age,
//         image: req.body.image

//     }
//     fs.readFile('./data/herosData.json', 'utf-8', (err, jsonString) => {
//         if (err) throw err
//         const data = JSON.parse(jsonString);
//         console.log(req.body.name);
//         console.log(data);

//         if (data.indexOf(req.body.name) > -1) {
//             res.send("ce hero éxiste déjà")
//         } else {
//             data.push(newHero)
//             fs.writeFile('./data/herosData.json', JSON.stringify(data, null, 2), 'utf-8', err => {
//                 if (err) throw err
//                 res.send("hero ajouté")
//                 console.log('Done!');

//             })

//         }

//     })
// })

// Method with an export const (heroesData.js)


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

