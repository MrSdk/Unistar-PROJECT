const mongoose = require("mongoose")
    // 4FUg0jGrosxkbwLu
    // mongoose.connect('mongodb+srv://mrsdk:4FUg0jGrosxkbwLu@cluster0-6im4q.mongodb.net/test2?retryWrites=true&w=majority', { useNewUrlParser: true }).then((res) => {
mongoose.connect(`mongodb+srv://farhod:7Q8SfcHx.F2J.HG@cluster0-uf7cc.mongodb.net/teest?retryWrites=true`).then((res) => {
        // mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, { useNewUrlParser: true }).then((res) => {
        console.log("Db connected !!!")
    })
    .catch(e => {
        console.log("Error to Connect");

    })

mongoose.Promise = global.Promise

module.exports = mongoose