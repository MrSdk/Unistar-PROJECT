const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")

const User = require("../model/user")

router.get('/', (req, res) => {
    User.find().then(result => {

        res.status(200).json({ clients: result })
    }).catch(e => {
        console.log(e);
        res.status(400).json({ message: err })
    })
})

router.get('/view/:id', (req, res) => {
    User.findOne({ _id: req.params.id }).then(result => {
        if (!result) {
            return res.status(404).json()
        }
        try {

            result.password = (jwt.verify(result.password, process.env.JWT_KEY)).password

        } catch (error) {
            return res.status(405).json()
        }

        res.status(200).json({ client: result })
    }).catch(e => {
        res.status(404).json()
    })
})

router.patch('/edit/:id', (req, res) => {
    let user = req.body;
    user.password = User.hashOfPassword(user.password)

    User.findOneAndUpdate({ _id: req.params.id }, { $set: user }, { new: true }).then(result => {
        if (!result) {
            return res.status(404).json()
        }

        res.status(200).json({ client: result })
    }).catch(e => {
        console.log(e);
        res.status(400).json({ message: err })
    })
});

router.patch('/userStatus/:userId', (req, res) => {
    let userId = req.params.userId;

    User.findByIdAndUpdate(userId, { $set: { status: req.body.status } }, { new: true }).then((result) => {

        res.status(200).json()
    }).catch(e => {
        console.log(e);
        console.log("-------------------");
        res.status(400).json()
    })
})

router.patch('/deviceStatus/:userId', (req, res) => {
    let userId = req.params.userId;

    User.findById(userId).then((result) => {
        let updated = result.devices.filter(device => {
            if (device._id == req.body.deviceId) {
                device.status = req.body.status;
                return device
            } else {
                return device
            }
        })

        User.findOneAndUpdate({ _id: userId }, { $set: { devices: updated } }, { new: true }).then((result) => {
            // console.log(result);
            res.status(200).json()
        }).catch(e => {
            console.log(e);
            console.log("-------------------");
            res.status(400).json()
        })
    })

})


module.exports = router