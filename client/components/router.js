import React from "react";
import {Routes, Route} from "react-router-dom";

import Home from "../pages/home.js";
import Jokes from "../pages/jokes.js";
import SignIn from "../pages/signin.js";
import SignUp from "../pages/signup.js";
import SignOut from "../pages/signout.js";

import "../css/style.css";

export const Router = () => {
    return (
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/signout" element={<SignOut/>}/>
                <Route path="/:category" element={<Jokes/>}/>
            </Routes>
    );
};