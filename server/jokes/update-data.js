const { updateJokeById } = require('../db/db');
const {anekdoty_parser_main} = require("../anekdoty_parser/main");

async function updateJoke (req, res) {
    console.log("[" +  new Date().toLocaleString() + `] Client: requested /api/jokes/updateJoke, new text: ${req.body.newText}`);
    updateJokeById(req.body.id, req.body.newText);
    res.sendStatus(200)
}

async function updatebd  (req, res) {
    console.log("[" +  new Date().toLocaleString() + `] Client: requested /api/jokes/updatebd`);
    const tmp = await anekdoty_parser_main();
    res.sendStatus(200)
}

module.exports = { updateJoke, updatebd };