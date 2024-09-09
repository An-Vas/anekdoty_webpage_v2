const Mongoose = require("mongoose")
const mongourl = `mongodb://localhost:27017/jokessdb`

const connectDB = async () => {
    await Mongoose.connect(mongourl, {})
}
module.exports = connectDB