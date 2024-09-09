const GetJokesFromDb = async (category) => {
    
    var jokes = [];

    const response = await fetch('/api/jokes/loadjokes/' + category, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            mode: 'no-cors',
        },

    });

    jokes = await response.json({});

    return jokes;

}

export default GetJokesFromDb;