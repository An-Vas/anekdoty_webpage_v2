const Mongoose = require("mongoose")

const UserJokeSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    jokeId: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        default: "Up",
        required: true,
    },
})


const UserJoke = Mongoose.model("userjoke", UserJokeSchema)
module.exports = UserJoke