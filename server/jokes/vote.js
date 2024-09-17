const {addUserJokeVote, addIpJokeVote} = require("../db/db-vote");

async function handleVote(req, res) {
    var newRank = 0;

    if (req.body.username) {
        console.log("[" + new Date().toLocaleString() + "] Client: requested /api/jokes/vote/newVote by ${req.body.username}");
        newRank = await addUserJokeVote(req.body.username, req.body.jokeId, req.body.voteType);
    } else {
        console.log("[" + new Date().toLocaleString() + "] Client: requested /api/jokes/vote/newVote by unknown user");
        newRank = await addIpJokeVote(req.socket.remoteAddress, req.body.jokeId, req.body.voteType);
    }

    res.json(newRank)
}

module.exports = {handleVote};