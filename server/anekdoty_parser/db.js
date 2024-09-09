const MongoClient = require("mongodb").MongoClient;


const url = "mongodb://127.0.0.1:27017/";
const mongoClient = new MongoClient(url);

async function updateDb(jokes) {
    if (jokes.length !== 0){
        try {
            console.log("[" +  new Date().toLocaleString() + `] Db: connecting to db`);
            await mongoClient.connect();
            const db = mongoClient.db("jokessdb");
            const collection = db.collection("jokes");
            const dropResult = await collection.drop();
            const insertManyResult = await db.collection('jokes').insertMany(jokes)

        } catch(err) {
            console.log(err);

        } finally {
            await mongoClient.close();
            console.log("[" +  new Date().toLocaleString() + `] Db: ${jokes.length} jokes totally saved`);

        }
    }
}

module.exports = { updateDb };