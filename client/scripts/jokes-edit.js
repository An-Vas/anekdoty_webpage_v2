const EditJoke = (id, newText) => {
    if (newText !== null) {
    
        fetch('/api/jokes/updateJoke', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                mode: 'no-cors',
            },
            body: JSON.stringify({
                newText: newText,
                id: id,
            }),
        });
    }
}



export default EditJoke;