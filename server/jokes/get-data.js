const {getJokesByCategory, getCategories} = require("../db/db");


async function loadjokes (req, res) {

    console.log("[" +  new Date().toLocaleString() + `] Client: requested /api/jokes/loadjokes/:category for ` + req.params['category']  );
    const ip = req.socket.remoteAddress;
    const jokes = await getJokesByCategory(req.params['category'], username = req.body.username, ip );
    res.json(jokes);
}


async function loadcategories (req, res) {
    console.log("[" +  new Date().toLocaleString() + `] Client: requested /api/jokes/loadcategories`);
    const categories = await getCategories();
    res.json(categories);
}

module.exports = { loadjokes, loadcategories };