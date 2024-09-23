const VoteJoke = async (jokeId, voteType, username = null) => {


    const response = await fetch('/api/jokes/vote/newVote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            mode: 'no-cors',
        },
        body: JSON.stringify({
            jokeId: jokeId,
            voteType: voteType,
            username: username,
        }),
    });

    var newRank = await response.json({});
    return newRank;

}


export default VoteJoke;