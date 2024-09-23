import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import connectDB from "./db/db-users";
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from "react-router-dom/server";

import { Router } from "../client/components/router";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.use("/signout", (req, res) => {
    console.log("[" + new Date().toLocaleString() + `] Client: requested /signout`);
    res.cookie("jwt", "", { maxAge: "1" })
    res.redirect("/home")
})


app.use("/api/auth", require("./auth/scripts/route"))
app.use("/api/jokes", require("./jokes/route"))

connectDB();

app.get('*', async(req, res) => {

    const url = req.originalUrl;
    const app = ReactDOMServer.renderToString(
        <StaticRouter location={url}>
            <Router />
        </StaticRouter>
    );
    const indexFile = path.resolve('./server/html/index.html');
    try {
        const data = await fs.readFile(indexFile, 'utf8');
        res.send(
            data.replace("<div id='root'></div>", `<div id="root">${app}</div>`)
        );
    }catch(err) {
        res.status(500).send(err);
    }
});

app.listen(PORT, () => {
    console.log("[" + new Date().toLocaleString() + `] Server: started on the port ` + PORT);
});
