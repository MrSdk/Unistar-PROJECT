let express = require("express")
let cors = require("cors")
let bodyParser = require("body-parser")
let morgan = require("morgan")
const path = require("path")
var mkdirp = require('mkdirp');
mkdirp.sync(__dirname + "/public")

let app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan("dev"))


app.use(express.static(path.join(__dirname, '/dist')));
app.use(express.static(path.join(__dirname + "/public")))

app.use('/api/device', require("./routes/device"))
app.use('/api/auth', require("./routes/auth"))
app.use('/api/users', require("./routes/user"))
app.use('/api/admin', require("./routes/admin"))
app.use('/api/download', require("./routes/file"))

// let counts = [1, 6, 9, 9, 43, 8, 9, 84, 11, 85, 21, 74]

// console.log(counts.forEach(item => item == 9));
Date.prototype.getWeek = function() {
        var target = new Date(this.valueOf());
        var dayNr = (this.getDay() + 6) % 7;
        target.setDate(target.getDate() - dayNr + 3);
        var firstThursday = target.valueOf();
        target.setMonth(0, 1);
        if (target.getDay() != 4) {
            target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
        }
        return 1 + Math.ceil((firstThursday - target) / 604800000);
    }
    // console.log(counts.filter(item => {
    //     if (item == 9) {
    //         return item
    //     }
    // }));



// Filter Massivda qaytaradi har doim topolmasa []
// Find har doim birinchi uchragan ozgaruvchini uzatadi topolmasa undefined
// Map har doim massivda boolean tiplarini qaytaradi yani tekshirish amaliga togrilarini true va qolganlarini false qip qaytaradi


// console.log((new Date("2019-08-25T18:32:52.131Z")).getWeek());
// console.log((new Date()).getDay());
// console.log((new Date("2019-08-24T18:32:52.131Z")).getDay());

// 140
// console.log(Math.floor(40 / 60));
// console.log(140 % 60);   
// let a = new Date()
// a.setFullYear(2020)
// a.setMonth(9)
// a.setDate(5)

// console.log(a);


app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist', 'index.html'))
})
module.exports = app