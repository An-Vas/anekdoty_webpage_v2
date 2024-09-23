const SendUser = async (username, password, admin) => {
    try {
        var redirect = true;

        if (username !== null && password !== null) {
            fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    mode: 'no-cors',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    admin: admin,
                }),
            })
                .then((res) => {
            
                    if (res.status == 409){
                        alert("Username уже занят, попробуйте другой");
                        redirect = false;
                    }
                    if (res.status == 411){
                        alert("Пароль должен быть >= 4 символа");
                        redirect = false;
                    }
                    return res;
                })
                .then((resp) => resp.json())
                .then(function (response) {
                    if (response.redirect_path && redirect) {
                        window.location.assign(response.redirect_path)
                    }
                });
        }

    } catch (error) {
        console.error('Ошибка при регистрации:', error);
    }
};



export default SendUser;