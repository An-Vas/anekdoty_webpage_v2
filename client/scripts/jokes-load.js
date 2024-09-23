const GetJokesFromDb = async (category, username) => {
    
    var jokes = [];
    console.log("cat " + category);


    const response = await fetch('/api/jokes/loadjokes/' + category, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            mode: 'no-cors',
        },
        body: JSON.stringify({
            username: username,

        }),

    });

    console.log(jokes)
    jokes = await response.json({});
    return jokes;

}

export default GetJokesFromDb;