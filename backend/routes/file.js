const express = require("express")
const router = express.Router()
var fs = require("fs")

const Device = require("./../model/device")

router.route('/:device_secret/:date1/:date2')
    .get(async(req, res) => {

        let secret = req.params.device_secret;
        let date1 = new Date(parseInt(req.params.date1));
        let date2 = new Date(parseInt(req.params.date2));
        date2.setHours("23")
        date2.setMinutes("59")


        let data = ""
        let thisDate = new Date()
        let originalfileName = `./backend/public/${secret}1.csv`;
        let fileName = `${secret} ${date1.getMonth() + 1}:${date1.getDate()}:${date1.getFullYear()}-${date2.getMonth() + 1}:${date2.getDate()}:${date2.getFullYear()}.csv`;

        let devices = await Device.find()
        let sortedDevices = [];

        devices.forEach((element) => {
            if (secret == element.device_secret && ((new Date(element.date)).getTime() >= (new Date(date1)).getTime()) && ((new Date(element.date)).getTime() <= (new Date(date2)).getTime())) {
                sortedDevices.push(element)
            }
        })

        data += "time,in,out,penalty,date\n"

        sortedDevices.forEach(item => {
            data += `${item.time},${item.in},${item.out},${item.penalty},${item.date}\n`
        })

        fs.appendFile(originalfileName, data, {}, () => {
            // console.log(data);

            res.download(originalfileName, fileName)

            setTimeout(() => {
                console.log("DELETED !");
                fs.unlink(originalfileName, () => {})
            }, 1000)

        })

    })
router.route('/admin/:device_secret/:date1/:date2')
    .get(async(req, res) => {

        let secret = req.params.device_secret;
        let date1 = new Date(parseInt(req.params.date1));
        let date2 = new Date(parseInt(req.params.date2));
        date2.setHours("23")
        date2.setMinutes("59")


        let data = ""
        let thisDate = new Date()
        let originalfileName = `./backend/public/${secret}1.csv`;
        let fileName = `${secret} ${date1.getMonth() + 1}:${date1.getDate()}:${date1.getFullYear()}-${date2.getMonth() + 1}:${date2.getDate()}:${date2.getFullYear()}.csv`;

        let devices = await Device.find()
        let sortedDevices = [];

        devices.forEach((element) => {
            if (secret == element.device_secret && ((new Date(element.date)).getTime() >= (new Date(date1)).getTime()) && ((new Date(element.date)).getTime() <= (new Date(date2)).getTime())) {
                sortedDevices.push(element)
            }
        })

        data += "time,in,out,penalty,visitor,inroom,real_distance_1,real_distance_2,start_distance_1,start_distance_2,date\n"

        sortedDevices.forEach(item => {
            data += `${item.time},${item.in},${item.out},${item.penalty},${item.visitor},${item.inroom},${item.real_distance_1 ? item.real_distance_1 : '' },${item.real_distance_2 ? item.real_distance_2 : '' },${item.start_distance_1 ? item.start_distance_1 : '' },${item.start_distance_2 ? item.start_distance_2 : '' },${item.date}\n`
        })

        fs.appendFile(originalfileName, data, {}, () => {
            // console.log(data);

            res.download(originalfileName, fileName)

            setTimeout(() => {
                console.log("DELETED !");
                fs.unlink(originalfileName, () => {})
            }, 1000)

        })

    })

router.route('/daily/:device_secret')
    .get(async(req, res) => {

        let secret = req.params.device_secret;
        let data = ""
        let thisDate = new Date()
        let originalfileName = `./backend/public/${secret}1.csv`;
        let fileName = `${secret} ${thisDate.getFullYear()}-${thisDate.getMonth() + 1}-${thisDate.getDate()}.csv`;

        let devices = await Device.find()

        let sortedDevices = devices.filter(element => ((element.device_secret == secret) && ((new Date()).getFullYear() == (new Date(element.date)).getFullYear()) && ((new Date()).getMonth() == (new Date(element.date)).getMonth()) && ((new Date()).getDate() == (new Date(element.date)).getDate())))
        data += "time,in,out,penalty,date\n"

        sortedDevices.forEach(item => {
            data += `${item.time},${item.in},${item.out},${item.penalty},${item.date}\n`
        })

        fs.appendFile(originalfileName, data, {}, () => {
            // console.log(data);

            res.download(originalfileName, fileName)

            setTimeout(() => {
                console.log("DELETED !");
                fs.unlink(originalfileName, () => {})
            }, 1000)

        })

    })

router.route('/weekly/:device_secret')
    .get(async(req, res) => {

        let secret = req.params.device_secret;
        let data = ""
        let thisDate = new Date()
        let originalfileName = `./backend/public/${secret}2.csv`;
        let fileName = `${secret} ${thisDate.getFullYear()}-${getWeekNumber(new Date())}-week.csv`;

        let devices = await Device.find()

        let sortedDevices = devices.filter(element => ((element.device_secret == secret) && ((new Date()).getFullYear() == (new Date(element.date)).getFullYear()) && ((new Date()).getMonth() == (new Date(element.date)).getMonth()) && (getWeekNumber(new Date()) == getWeekNumber(new Date(element.date)))))
        data += "time,in,out,penalty,date\n"

        sortedDevices.forEach(item => {
            data += `${item.time},${item.in},${item.out},${item.penalty},${item.date}\n`
        })

        fs.appendFile(originalfileName, data, {}, () => {
            // console.log(data);

            res.download(originalfileName, fileName)

            setTimeout(() => {
                console.log("DELETED !");
                fs.unlink(originalfileName, () => {})
            }, 1000)

        })

    })

router.route('/monthly/:device_secret')
    .get(async(req, res) => {

        let secret = req.params.device_secret;
        let data = ""
        let thisDate = new Date()
        let originalfileName = `./backend/public/${secret}3.csv`;
        let fileName = `${secret} ${thisDate.getFullYear()}-${thisDate.getMonth()}.csv`;

        let devices = await Device.find()

        let sortedDevices = devices.filter(element => ((element.device_secret == secret) && ((new Date()).getFullYear() == (new Date(element.date)).getFullYear()) && ((new Date()).getMonth() == (new Date(element.date)).getMonth())))
        data += "time,in,out,penalty,date\n"

        sortedDevices.forEach(item => {
            data += `${item.time},${item.in},${item.out},${item.penalty},${item.date}\n`
        })

        fs.appendFile(originalfileName, data, {}, () => {
            // console.log(data);

            res.download(originalfileName, fileName)

            setTimeout(() => {
                console.log("DELETED !");
                fs.unlink(originalfileName, () => {})
            }, 1000)

        })

    });


function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(+d);
    d.setHours(0, 0, 0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    // Get first day of year
    var yearStart = new Date(d.getFullYear(), 0, 1);
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil((((d.valueOf() - yearStart.valueOf()) / 86400000) + 1) / 7);
    // Return array of year and week number
    return weekNo;
}

module.exports = router