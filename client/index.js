import React from 'react';
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';


import { Router } from "./components/router";
import Navbar from "./pages/parts/navbar";

ReactDOM.hydrateRoot(
    document.getElementById("root"),
    <BrowserRouter>
        <Navbar/>
        <Router />
    </BrowserRouter>
);