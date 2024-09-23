import React, { useState, useEffect } from "react";
import UpdateBd from "../scripts/db-update";
import GetCategoriesFromDb from "../scripts/categories-load"

const Home = () => {

    const [strings, setStrings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        GetCategoriesFromDb()
            .then(data => {
                setIsLoading(false);
                setStrings(data);
            })

    }, []);


    const onButtonPressed = event => {
        event.preventDefault();
        UpdateBd();
    }

    return (
        <div>

            <div id="categories">
                <div className="categories_list" id="categories_list">

                    {isLoading ? (
                        <p>Загрузка...</p>
                    ) : (
                        <ul>
                            {
                                strings.map((str, index) => (
                                    <li key={index}>
                                        <a href={"/" + str.linkpart}>{str.category}
                                        </a>
                                    </li>
                                ))
                            }

                        </ul>
                    )}

                </div>
            </div>
            <br />
            <p>Обновить базу анекдотов на сервере? Будут загружены все анекдоты с сайта https://anekdoty.ru. Это
                может занять некоторое время. </p>
            <button id="get-jokes-button" onClick={onButtonPressed}>Загрузить</button>

        </div>
    );
};

export default Home;