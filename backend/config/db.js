const mongoose = require("mongoose")
    // C4iTnlr2NYJQ94ei 
mongoose.connect(`mongodb+srv://saydakram:C4iTnlr2NYJQ94ei@cluster0-nxhyj.mongodb.net/test?retryWrites=true&w=majority`).then((res) => {
    console.log("Db connected !!!");

    // mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, { useNewUrlParser: true }).then((res) => {
}).catch(e => {
    console.log("Error to Connect");

})

mongoose.Promise = global.Promise

module.exports = mongoose