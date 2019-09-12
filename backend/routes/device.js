const express = require("express")
const router = express.Router()

const Device = require("./../model/device")
const User = require("./../model/user")
const CheckAuth = require("./../middleware/check-auth")

router.route('/test')
    .get((request, response) => {

        console.log(request.body);
        response.status(200).json({ message: "Hello" })
    })
    .post((request, response) => {
        console.log("_______________________________________U-R-AAA_____________________________________");

        response.status(200).json(request.body)
    });

router.route('/verify/:secret')
    .get(async(request, response) => {
        let d_secret = request.params.secret;
        let users = await User.find();


        Device.findOne({ device_secret: d_secret }).then((res) => {
            let blocked = false;

            if (!res) {
                return response.status(404).json()
            }
            // verify to block
            users.forEach(user => {

                user.devices.forEach(device => {
                    if (device.device_secret == d_secret && device.status != 0) {
                        blocked = true;
                    }
                })
            });

            if (blocked) {
                response.status(403).json()
            } else {
                response.status(200).json({ device: res })
            }

        }).catch(e => {
            response.status(404).json()
        })
    })

router.route('/')
    .get((request, response) => {
        Device.find().then((result) => {
            let allDevices = [];
            // for Annual
            let dailyDevices = [];

            for (let i = 0; i < result.length; i++) {
                let has = false
                for (let j = i + 1; j < result.length; j++) {
                    if (result[i].device_secret == result[j].device_secret) {
                        has = true;
                    }
                }
                if (!has) {
                    allDevices.push(result[i])
                }
            }
            // for Annual
            for (let i = 0; i < result.length; i++) {
                let has = false
                for (let j = i + 1; j < result.length; j++) {
                    if ((result[i].device_secret == result[j].device_secret) && ((new Date(result[i].date)).getDate() == (new Date(result[j].date)).getDate()) && ((new Date(result[i].date)).getMonth() == (new Date(result[j].date)).getMonth()) && ((new Date(result[i].date)).getFullYear() == (new Date(result[j].date)).getFullYear())) {
                        has = true;
                    }
                }
                if (!has) {
                    dailyDevices.push(result[i])
                }
            }
            // console.log(dailyDevices);

            response.status(200).json({ devices: result, sortedDevices: allDevices, dailyDevices: dailyDevices })
        })
    });

router.route('/create')
    .post((request, response) => {
        let newDevice = new Device({
            time: request.body.time,
            device_secret: request.body.device_secret,
            in: request.body.in,
            out: request.body.out,
            penalty: request.body.penalty,
            status: request.body.status,
            date: new Date()
        })

        newDevice.save().then(result => {
            response.status(200).json(result)

        }).catch(e => {
            console.log(e);
            response.status(400).json({ e })
        })
    });

// for GPS on M_A_P

router.route('/busWithGps/create')
    .post((request, response) => {
        let newDevice = new Device({
            time: request.body.time,
            device_secret: request.body.device_secret,
            in: request.body.in,
            out: request.body.out,
            penalty: request.body.penalty,
            status: request.body.status,
            isBus: request.body.isBus,
            latitude: request.body.latitude,
            longitude: request.body.longitude,
            altitude: request.body.altitude,
            date: new Date()
        })

        newDevice.save().then(result => {
            response.status(200).json(result)

        }).catch(e => {
            console.log(e);
            response.status(400).json({ e })
        })
    });

router.route('/isGps/:id')
    .get(async(request, response) => {
        let user = await User.findById(request.params.id);
        let hasBus = false;
        if (user) {
            Device.find().then((devices) => {
                user.devices.forEach((userDevice) => {
                    devices.forEach((deevice) => {
                        if (deevice.device_secret == userDevice.device_secret) {
                            if (deevice.isBus) {
                                hasBus = true;
                            }
                        }
                    })
                })
                response.status(200).json({ hasBus })
            }).catch(e => {
                response.status(400).json()
            })
        } else {
            response.status(400).json()
        }

    });
// get today's devices
router.route('/gpsOfToday/:id')
    .get(async(request, response) => {
        let user = await User.findById(request.params.id);
        let buses = [];
        let today = new Date()
        if (user) {
            Device.find().then((devices) => {
                user.devices.forEach((userDevice) => {
                    devices.forEach((deevice) => {
                        if (deevice.device_secret == userDevice.device_secret) {

                            if (deevice.isBus && ((new Date(deevice.date)).getFullYear() == today.getFullYear()) && ((new Date(deevice.date)).getMonth() == today.getMonth()) && ((new Date(deevice.date)).getDate() == today.getDate())) {
                                buses.push(deevice)
                            }
                        }
                    })
                })
                response.status(200).json({ buses })
            }).catch(e => {
                response.status(400).json()
            })
        } else {
            response.status(400).json()
        }

    });

module.exports = router