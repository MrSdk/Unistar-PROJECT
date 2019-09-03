const mongoose = require("./../config/db")

let AdminSchema = mongoose.Schema({
    login: { type: String },
    password: { type: String }
})

module.exports = mongoose.model('admin', AdminSchema)