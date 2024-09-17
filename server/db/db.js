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
        const db = await mongoClient.db("jokessdb");
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

async function getJokesByCategory(linkpart, username = null, ip = null) {
    let resJokes = [];
    try {
        console.log("[" + new Date().toLocaleString() + `] Db: connecting to db`);
        await mongoClient.connect();
        const db = await mongoClient.db("jokessdb");
        var pipeline = [];

        if (username){
            pipeline = getPipelineForGetJokesByUser(username, linkpart);
        } else if (ip){
            pipeline = getPipelineForGetJokesByIp(ip, linkpart);
        } else {
            throw new Error('Username AND ip is unknown, please try again');
        }


        const jokes = await db.collection("jokes").aggregate(pipeline).toArray();

        resJokes = jokes.map(item => ({
            text: item.text,
            id: item.id,
            category: item.category,
            rank: item.rank,
            vote: (item.scores) ? item.scores.type : []
        }));



    } catch (err) {
        console.log(err);

    } finally {
        await mongoClient.close();
        console.log("[" + new Date().toLocaleString() + `] Db: ${resJokes.length} jokes get for ` + linkpart);
        return resJokes;
    }

}

function getPipelineForGetJokesByUser(username, linkpart) {
    return (
        [
            {
                $lookup: {
                    from: 'userjokes',
                    localField: 'id',
                    foreignField: 'jokeId',
                    as: 'scores'
                }
            },
            {
                $unwind: {
                    path: '$scores',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $match: {
                    $and: [
                        {
                            $or: [
                                {'scores.username': username},
                                {'scores': null},
                            ]
                        },
                        {categoryLink: {$regex: linkpart}},
                    ],
                }
            },

        ]
    )
}


function getPipelineForGetJokesByIp(ip, linkpart) {
    return (
        [
            {
                $lookup: {
                    from: 'ipjokes',
                    localField: 'id',
                    foreignField: 'jokeId',
                    as: 'scores'
                }
            },
            {
                $unwind: {
                    path: '$scores',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $match: {
                    $and: [
                        {
                            $or: [
                                {'scores.ip': ip},
                                {'scores': null},
                            ]
                        },
                        {categoryLink: {$regex: linkpart}},
                    ],
                }
            },

        ]
    )
}


async function updateJokeById(id, newText) {

    try {
        console.log("[" + new Date().toLocaleString() + `] Db: connecting to db`);
        await mongoClient.connect();
        const db = await mongoClient.db("jokessdb");
        await db.collection("jokes").updateOne({id: id}, {$set: {text: newText}});
    } catch (err) {
        console.log(err);

    } finally {
        await mongoClient.close();
        console.log("[" + new Date().toLocaleString() + `] Db: joke id=${id} updated `);

    }

}


module.exports = {getCategories, getJokesByCategory, updateJokeById};