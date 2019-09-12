const express = require("express")
const router = express.Router()

const User = require("./../model/user")
const Admin = require("./../model/admin")

const CheckAuth = require("./../middleware/check-auth")

router.route('/isUser/:token')
    .get(CheckAuth, (req, res) => {

        let result = { isUser: false, isAdmin: false }

        if (req.isUser == 1) {
            if (req.user.status != 0) {
                return res.status(403).json()
            } else {
                result.user = req.user
                result.isUser = true
            }
        } else if (req.isUser == 2) {
            result.isAdmin = true
        }

        res.status(201).json({ result })
    });

router.route("/test")
    .get((request, response) => {

        response.status(200).json({ name: "Sdk" })

    })

router.route("/register")
    .post((request, response) => {
        let newUser = new User({
            name: request.body.name,
            login: request.body.login,
            password: request.body.password,
            devices: request.body.devices,
            company: request.body.company,
            description: request.body.description
        })
        newUser.password = User.hashOfPassword(newUser.password);

        newUser.save().then(result => {
            response.status(200).json(result)
        }).catch(e => {
            console.log(e);
            response.status(400).json({ e })
        })


    });


router.route("/login")
    .post(async(request, response) => {
        let thisUser = {
            login: request.body.login,
            password: request.body.password
        }
        let users = await User.find();

        let obj = User.verifyUser(users, thisUser)

        if (obj.isUser) {

            if (obj.user.status == 0) {
                let token = User.generateAuthToken(thisUser)
                response.status(200).json({ token: token })
            } else {
                response.status(403).json()
            }
        } else {
            let admins = await Admin.find();

            let obj2 = User.verifyUser(admins, thisUser)

            if (obj2.isUser) {
                let token = User.generateAuthToken(thisUser)
                response.status(200).json({ token: token })
            } else {
                response.status(405).json()
            }
        }
        // newUser.save().then(result => {
        //     response.status(200).json(result)
        // }).catch(e => {
        //     console.log(e);
        //     response.status(400).json({ e })
        // })


    });

module.exports = router