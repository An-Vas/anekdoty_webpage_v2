
const GetCategoriesFromDb = async () => {
    var categories = [];

    const response = await fetch('/api/jokes/loadcategories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            mode: 'no-cors',
        },
    });

    categories = await response.json({});

    return categories;

}


export default GetCategoriesFromDb;
