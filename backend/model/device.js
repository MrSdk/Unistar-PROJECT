const mongoose = require("./../config/db")

let DeviceSchema = mongoose.Schema({
    time: { type: String },
    device_secret: { type: String },
    in: { type: Number },
    out: { type: Number },
    penalty: { type: Number },
    visitor: { type: Number },
    inroom: { type: Number },
    status: { type: Number },
    date: { type: Date },
    isBus: { type: Boolean, default: false },
    latitude: { type: String },
    longitude: { type: String },
    altitude: { type: String },
    real_distance_1: { type: Number },
    real_distance_2: { type: Number },
    start_distance_1: { type: Number },
    start_distance_2: { type: Number }
})

module.exports = mongoose.model('device', DeviceSchema)