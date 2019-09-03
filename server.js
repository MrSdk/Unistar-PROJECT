const http = require("http")
const port = process.env.PORT || 8080
const app = require("./backend/app")
const server = http.createServer(app)
const Admin = require("./backend/model/admin")
const User = require("./backend/model/user")

server.listen(port, async() => {
    let admin = (await Admin.find())
    if (admin.length == 0) {
        console.log("Admin added !");

        let newAdmin = new Admin({
            login: "admin",
            password: User.hashOfPassword("admin")
        })
        await newAdmin.save()
    }

    console.log(`Server running on port ${port}`);
})