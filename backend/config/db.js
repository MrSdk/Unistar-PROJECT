const mongoose = require("mongoose")

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, { useNewUrlParser: true })

mongoose.Promise = global.Promise

module.exports = mongoose