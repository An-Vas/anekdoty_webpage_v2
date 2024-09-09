const SendUser = async (username, password) => {
    try {
        if (username !== null && password !== null ) {
            fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    mode: 'no-cors',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            })
                .then((res) => {
                    if (res.status == 401){
                        alert("Пользователя с таким username не существует")
                    } else if (res.status == 400){
                        alert("Пароль указан неправильно")
                    }
            
                    return res;
                })
                .then((resp) => resp.json())
                .then(function(response) {
                    if (response.redirect_path) {
                        window.location.assign(response.redirect_path)
                    }
                });
        }
        
    } catch (error) {
        console.error('Ошибка при регистрации:', error);
    }
};



export default SendUser;