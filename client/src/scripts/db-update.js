const UpdateBd = () => {
    fetch('/api/jokes/updatebd', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            mode: 'no-cors',
        },
    })
        .then((resp) => resp.json())
        .then(function (response) {
    
            if (response.redirect_path) {
                window.location.assign(response.redirect_path);
            }
        });
    
    
}

export default UpdateBd;