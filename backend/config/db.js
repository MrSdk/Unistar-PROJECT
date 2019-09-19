const mongoose = require("mongoose")
    // C4iTnlr2NYJQ94ei 
mongoose.connect(`mongodb+srv://farhod:7Q8SfcHx.F2J.HG@cluster0-uf7cc.mongodb.net/teest?retryWrites=true`).then((res) => {
        console.log("Db connected !!!")
    })
    // mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, { useNewUrlParser: true }).then((res) => {})
    .catch(e => {
        console.log("Error to Connect");

    })

mongoose.Promise = global.Promise

module.exports = mongoose