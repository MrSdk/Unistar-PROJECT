const mongoose = require("./../config/db")

let DeviceSchema = mongoose.Schema({
    time: { type: String },
    device_secret: { type: String },
    in: { type: Number },
    out: { type: Number },
    penalty: { type: Number },
    status: { type: Number },
    date: { type: Date },
    isBus: { type: Boolean, default: false },
    latitude: { type: String },
    longitude: { type: String },
    altitude: { type: String }
})

module.exports = mongoose.model('device', DeviceSchema)