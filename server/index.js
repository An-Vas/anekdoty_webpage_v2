const PORT = process.env.PORT || 3001;

const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const connectDB = require("./db/db-users");

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

app.listen(PORT)
console.log("[" + new Date().toLocaleString() + `] Server: started on the port ` + PORT);
