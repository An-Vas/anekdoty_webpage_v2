const MongoClient = require("mongodb").MongoClient;
const url = require('url');


const mongourl = "mongodb://127.0.0.1:27017/";
const mongoClient = new MongoClient(mongourl);


let jokesCount = 0;

async function getCategories() {
    categories = []
    uniqueCategories = []
    try {
        console.log("[" + new Date().toLocaleString() + `] Db: connecting to db`);
        await mongoClient.connect();
        const db = mongoClient.db("jokessdb");
        const c = await db.collection("jokes").find().toArray();

        jokesCount = c.length;

        c.forEach((item) => {
            const parsedUrl = new url.URL(item.categoryLink);
            const lastPart = parsedUrl.pathname.split('/')[1];
            categories.push({category: item.category, linkpart: lastPart});
        })

        uniqueCategories = categories.filter((obj, index, arr) => {
            return arr.findIndex(o => o.category === obj.category && o.linkpart === obj.linkpart) === index;
        });


    } catch (err) {
        console.log(err);

    } finally {
        await mongoClient.close();
        console.log("[" + new Date().toLocaleString() + `] Db: ${uniqueCategories.length} unique categories get, ${jokesCount} jokes total`);
        return uniqueCategories;
    }

}

async function getJokesByCategory(linkpart) {
    let resJokes = [];
    try {
        console.log("[" + new Date().toLocaleString() + `] Db: connecting to db`);
        await mongoClient.connect();
        const db = mongoClient.db("jokessdb");

        const jokes = await db.collection("jokes").find({categoryLink: {$regex: linkpart} }).toArray();
        resJokes = jokes.map(item => ({text: item.text, id: item.id}));

    } catch (err) {
        console.log(err);

    } finally {
        await mongoClient.close();
        console.log("[" + new Date().toLocaleString() + "] Db: ${resJokes.length} jokes get for " + linkpart);
        return resJokes;
    }

}

async function updateJokeById(id, newText) {

    try {
        console.log("[" + new Date().toLocaleString() + `] Db: connecting to db`);
        await mongoClient.connect();
        const db = mongoClient.db("jokessdb");
        await db.collection("jokes").updateOne({id: id}, {$set: {text: newText}});
    } catch (err) {
        console.log(err);

    } finally {
        await mongoClient.close();
        console.log("[" + new Date().toLocaleString() + `] Db: joke id=${id} updated `);

    }

}


module.exports = {getCategories, getJokesByCategory, updateJokeById };