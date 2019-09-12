const mongoose = require("mongoose")
    // C4iTnlr2NYJQ94ei 
mongoose.connect(`mongodb://saydakram:C4iTnlr2NYJQ94ei@cluster0-shard-00-00-nxhyj.mongodb.net:27017,cluster0-shard-00-01-nxhyj.mongodb.net:27017,cluster0-shard-00-02-nxhyj.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`, { useNewUrlParser: true }).then((res) => {
    console.log("Db connected !!!");

    // mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, { useNewUrlParser: true }).then((res) => {
}).catch(e => {
    console.log("Error to Connect");

})

mongoose.Promise = global.Promise

module.exports = mongoose