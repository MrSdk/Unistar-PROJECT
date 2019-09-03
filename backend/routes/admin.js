const express = require("express")
const router = express.Router()

const Admin = require("../model/admin")
let User = require("./../model/user")
let CheckAuth = require("./../middleware/check-auth")

router.route('/view/:token')
    .get(CheckAuth, (req, res) => {

        if (req.isUser == 2) {
            Admin.findOne().then((result) => {
                result.password = (User.getThroughtToken(result.password)).password
                res.status(200).json(result)
            })
        } else {
            res.status(403).json()
        }
    });

router.route('/update/:token')
    .patch(CheckAuth, (req, res) => {
        if (req.isUser == 2) {
            Admin.findOne().then((result) => {
                req.body.password = User.hashOfPassword(req.body.password)
                Admin.findByIdAndUpdate(result._id, { $set: req.body }, { new: true }).then(() => {
                    res.status(200).json(result)
                }, () => {
                    res.status(400).json(result)
                })
            })
        } else {
            res.status(403).json()
        }
    });

module.exports = router