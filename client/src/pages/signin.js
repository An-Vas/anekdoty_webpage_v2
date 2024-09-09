import React from "react";
import SendUser from "../scripts/signin";


const SignIn = () => {

    var username = "";
    var password = "";

    const onUsernameChanged = event => {
        username = event.target.value;
    }

    const onPasswordChanged = event => {
        password = event.target.value;
    }

    const onButtonPressed = event => {
        event.preventDefault();
        SendUser(username, password);
    }

    return (

        <form>
            <label htmlFor="usernameInput"> Введите username:</label>
            <input type="text" id="usernameInput" required onChange={onUsernameChanged}/>
            <br/>
            <label htmlFor="passwordInput">Введите пароль:</label>
            <input type="password" id="passwordInput" required onChange={onPasswordChanged}/>
            <br/>
            <button type="submit" id="signupButton" onClick={onButtonPressed}>Войти</button>
        </form>

    );
};

export default SignIn;