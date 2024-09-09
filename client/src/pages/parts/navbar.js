import React, { useState, useEffect } from "react";
import { IsUser } from "../../scripts/check-auth";

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {

        IsUser().then((isUser) => {
            setIsAuthenticated(isUser);
        });

    },)

    return (
        <header>
            <div id="header-content">
                <h1>Анекдоты localhost :)</h1>

                {isAuthenticated ? (
                    <div>
                        <a href="/signout" className="auth-button">Выйти</a>
                    </div>

                ) : (
                    <div>

                        <a href="/signin" className="auth-button">Войти</a>
                        <a href="/signup" className="auth-button">Зарегистрироваться</a>

                    </div>
                )}

            </div>
        </header>
    );
};

export default Navbar;