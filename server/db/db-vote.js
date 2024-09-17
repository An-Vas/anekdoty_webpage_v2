const MongoClient = require("mongodb").MongoClient;


const url = "mongodb://127.0.0.1:27017/";
const mongoClient = new MongoClient(url);


async function addUserJokeVote(username, jokeId, type) {
    var rank = 0;
    try {
        await mongoClient.connect();
        const db = mongoClient.db("jokessdb");
        const userJokeCollection = await db.collection("userjokes");
        const jokesCollection = await db.collection("jokes");

        //check if this user has already voted for this joke
        const userJokeRecord = await userJokeCollection.findOne({jokeId: jokeId, username: username});
        const joke =  await jokesCollection.findOne({id: jokeId});
        rank = joke.rank;

        if (userJokeRecord) {

            //Check if the vote is the same
            if (userJokeRecord.type == type) {

                //Nothing happens
            } else {

                //Update user-joke db and the rank
                await userJokeCollection.updateOne({username: username, jokeId: jokeId}, {$set: {type: type}});
                if (type == "Up") {
                    await jokesCollection.updateOne({id: jokeId}, {$inc: {rank: 2}});
                    rank += 2;
                } else {
                    await jokesCollection.updateOne({id: jokeId}, {$inc: {rank: -2}});
                    rank -= 2;
                }
            }
        } else {

            //Creating new record and updating jokerank
            await userJokeCollection.insertOne({username, jokeId, type});
            if (type == "Up") {
                await jokesCollection.updateOne({id: jokeId}, {$inc: {rank: 1}});
                rank++;
            } else {
                await jokesCollection.updateOne({id: jokeId}, {$inc: {rank: -1}});
                rank--;
            }
        }


    } catch (err) {
        console.log(err);

    } finally {
        await mongoClient.close();
        console.log("[" + new Date().toLocaleString() + `] Db: vote of ${username} for ${jokeId} successfully saved to ${type}`);
        return rank;
    }
}


async function addIpJokeVote(ip, jokeId, type) {
    var rank = 0;
    try {
        await mongoClient.connect();
        const db = mongoClient.db("jokessdb");
        const ipJokeCollection = await db.collection("ipjokes");
        const jokesCollection = await db.collection("jokes");


        //check if this user has already voted for this joke
        const ipJokeRecord = await ipJokeCollection.findOne({jokeId: jokeId, ip: ip});
        const joke =  await jokesCollection.findOne({id: jokeId});
        rank = joke.rank;
        if (ipJokeRecord) {

            //Check if the vote is the same
            if (ipJokeRecord.type == type) {

                //Nothing happens
            } else {

                //Update user-joke db and the rank
                await ipJokeCollection.updateOne({ip: ip, jokeId: jokeId}, {$set: {type: type}});
                if (type == "Up") {
                    await jokesCollection.updateOne({id: jokeId}, {$inc: {rank: 2}});
                    rank += 2;
                } else {
                    await jokesCollection.updateOne({id: jokeId}, {$inc: {rank: -2}});
                    rank -= 2;
                }
            }
        } else {

            //Creating new record and updating jokerank
            await ipJokeCollection.insertOne({ip, jokeId, type});
            if (type == "Up") {
                await jokesCollection.updateOne({id: jokeId}, {$inc: {rank: 1}});
                rank++;
            } else {
                await jokesCollection.updateOne({id: jokeId}, {$inc: {rank: -1}});
                rank--;
            }
        }


    } catch (err) {
        console.log(err);

    } finally {
        await mongoClient.close();
        console.log("[" + new Date().toLocaleString() + `] Db: vote of ${ip} for ${jokeId} successfully saved to ${type}`);
        return rank;
    }
}

module.exports = {addUserJokeVote, addIpJokeVote};