let User = require("./../model/user")
let Admin = require("./../model/admin")

module.exports = async function(req, res, next) {
    let token = req.params.token;

    let thisUser = User.getThroughtToken(token)

    if (thisUser) {
        console.log(thisUser);

        let users = await User.find();
        let obj = User.verifyUser(users, thisUser)

        if (obj.isUser) {
            req.isUser = 1;
            req.user = obj.user;
            next()
        } else {
            let admins = await Admin.find();
            let obj2 = User.verifyUser(admins, thisUser)
            if (obj2.isUser) {
                req.isUser = 2;
                next()
            } else {
                res.status(404).json()
            }
        }

    } else {
        res.status(404).json()
    }
}