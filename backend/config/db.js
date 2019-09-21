const mongoose = require("mongoose")
    // 4FUg0jGrosxkbwLu
mongoose.connect('mongodb+srv://mrsdk:4FUg0jGrosxkbwLu@cluster0-6im4q.mongodb.net/unistar?retryWrites=true&w=majority').then((res) => {
        console.log("Db connected !!!")
    })
    // mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, { useNewUrlParser: true }).then((res) => {})
    .catch(e => {
        console.log("Error to Connect");

    })

mongoose.Promise = global.Promise

module.exports = mongoose