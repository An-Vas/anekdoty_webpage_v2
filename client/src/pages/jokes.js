import React, {useState, useEffect} from "react";
import {useLocation} from 'react-router-dom';

import GetJokesFromDb from "../scripts/jokes-load"
import EditJoke from "../scripts/jokes-edit"
import VoteJoke from "../scripts/vote"
import {IsUser, IsAdmin, GetUserName} from "../scripts/check-auth";

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
    const [username, setUsername] = useState("");
    const [category, setCategory] = useState("Загрузка");

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

    const voteUp = async (jokeId, index) => {
        var newRank = await VoteJoke(jokeId, "Up", username);

        const tmpJokes = [...jokes];
        tmpJokes[index].rank = newRank;
        tmpJokes[index].vote = "Up";
        setJokes(tmpJokes)

    };
    const voteDown = async(jokeId, index) => {
        var newRank =await VoteJoke(jokeId, "Down", username);

        const tmpJokes = [...jokes];
        tmpJokes[index].rank = newRank;
        tmpJokes[index].vote = "Down";
        setJokes(tmpJokes)
    };

    const jokesSet = async (data) => {await setJokes(data); return jokes;}


    useEffect(() => {

        IsUser().then((isUser) => {
            setIsUser(isUser);
        });

        IsAdmin().then((isAdmin) => {
            setIsAdmin(isAdmin);
        });



        if (location) {

            GetUserName().then((user) => {
                setUsername(user);
                return user;
            }).then((user)=>{

                const urlParts = location.pathname.split('/');
                const pathName = urlParts[urlParts.length - 1];

                GetJokesFromDb(pathName, user)

                    .then(async (data) => {

                        await jokesSet(data).then(
                            (jokes)=>{
                                setIsLoading(false);
                                if (jokes.length >= 1) {
                                    setIsEmpty(false);
                                    setCategory(jokes[0].category)
                                }
                            }
                        )
                    });
            })




        }

    }, [location])


    React.useEffect(() => {

        setIsLoading(false);
        if (jokes.length >= 1) {
            setIsEmpty(false);
            setCategory(jokes[0].category)
        }


    }, [jokes]);




    return (
        <div>
            <h4>
                Выбрана категория:
                {isLoading || isEmpty ? (" Загрузка...") : (" " + category)}
            </h4>

            <a href="/home">К списку категорий</a>


                <div>
                    {isLoading ? (
                        <p>Загрузка...</p>
                    ) : (

                        <div>

                            {isEmpty ? (
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
                                                        rank={str.rank}
                                                        onClickEdit={handleEdit}
                                                        onClickVoteUp={voteUp}
                                                        onClickVoteDown={voteDown}
                                                        isUp={(str.vote == "Up")}
                                                        isDown={(str.vote == "Down")}
                                                    />
                                                )}

                                            </div>

                                        ) : (
                                            <div>
                                                <Joke
                                                    text={str.text}
                                                    id={str.id}
                                                    index={index}
                                                    rank={str.rank}
                                                    onClickVoteUp={voteUp}
                                                    onClickVoteDown={voteDown}
                                                    isUp={(str.vote == "Up")}
                                                    isDown={(str.vote == "Down")}
                                                />
                                            </div>

                                        )

                                        }

                                    </div>
                                ))
                            }
                        </div>
                    )}
                </div>





        </div>
    );
};

export default Jokes;