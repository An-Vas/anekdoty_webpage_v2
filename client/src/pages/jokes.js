import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import GetJokesFromDb from "../scripts/jokes-load"
import EditJoke from "../scripts/jokes-edit"
import { IsUser, IsAdmin } from "../scripts/check-auth";

import Edit from './parts/edit';
import Joke from './parts/joke';
import AdminJoke from './parts/admin-joke';

import "../css/jokes-style.css"


const Jokes = () => {

    const [jokes, setJokes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(true);
    const [isUser, setIsUser] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const location = useLocation();

    const handleEdit = (index) => {
        setEditingIndex(index);
        setIsModalOpen(true);
    };

    const handleSave = (id, newText) => {
        const newStrings = [...jokes];
        newStrings[editingIndex].text = newText;
        EditJoke(id, newText);
        setJokes(newStrings);
        setIsModalOpen(false);
    };


    useEffect(() => {

        IsUser().then((isUser) => {
            setIsUser(isUser);
        });

        IsAdmin().then((isAdmin) => {
            setIsAdmin(isAdmin);
        });

        if (location) {

            const urlParts = location.pathname.split('/');
            const pathName = urlParts[urlParts.length - 1];

            GetJokesFromDb(pathName).then((data) => {
                setJokes(data);
                setIsLoading(false);
                if (data.length >= 1) {
                    setIsEmpty(false);
                }

            });

        }

    }, [location])




    return (
        <div>
            <a href="/home">К списку категорий</a>

            {isUser ? (
                <div>
                    {isLoading ? (
                        <p>Загрузка...</p>
                    ) : (

                        <div>

                            { isEmpty ? (
                                <p>На сервере пока нет анекдотов из этой категории!</p>
                            ) : (
                                <div></div>
                            )}

                            {

                                jokes.map((str, index) => (

                                    <div>
                                        {isAdmin ? (

                                            <div>

                                                {isModalOpen && index == editingIndex ? (
                                                    <div>
                                                        <Edit
                                                            id={jokes[editingIndex].id}
                                                            text={jokes[editingIndex].text}
                                                            onSave={handleSave}
                                                            onClose={() => setIsModalOpen(false)}
                                                        />
                                                    </div>
                                                ) : (
                                                    <AdminJoke
                                                        text={str.text}
                                                        id={str.id}
                                                        index={index}
                                                        onClick={handleEdit}
                                                    />
                                                )}

                                            </div>

                                        ) : (
                                            <div>
                                                <Joke
                                                    text={str.text}
                                                    id={str.id}
                                                />
                                            </div>

                                        )}

                                    </div>
                                ))
                            }
                        </div>
                    )}
                </div>
            ) : (
                <div>Пожалуйста, авторизуйтесь на сайте для просмотра анекдотов</div>
            )


            }

        </div>
    );
};

export default Jokes;