const mongoose = require("./../config/db")
const jwt = require("jsonwebtoken")

let UserSchema = mongoose.Schema({
    name: { type: String },
    login: { type: String },
    password: { type: String },
    devices: [{
        device_secret: { type: String },
        description: { type: String },
        status: { type: Number, default: 0 }
    }],
    company: { type: String },
    description: { type: String },
    status: { type: Number, default: 0 }
})

UserSchema.statics.hashOfPassword = function(pass) {
    let password = { password: pass }

    let hashedPassword = jwt.sign(password, process.env.JWT_KEY)
    console.log("Hi");


    return hashedPassword;
}

UserSchema.statics.verifyUser = function(users, body) {
    let object = { isUser: false }


    users.forEach(user => {

        if (user.login == body.login) {
            if ((jwt.verify(user.password, process.env.JWT_KEY)).password === body.password) {
                object.user = user;
                object.isUser = true;
            }
        }
    })


    return object;
}

UserSchema.statics.getThroughtToken = function(token) {
    try {
        return jwt.verify(token, process.env.JWT_KEY)
    } catch (error) {
        return undefined;
    }
}

UserSchema.statics.generateAuthToken = function(user) {
    return jwt.sign({ login: user.login, password: user.password }, process.env.JWT_KEY)
}

module.exports = mongoose.model('user', UserSchema)