require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 7000;
const hbs = require("hbs");
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
const register = require("./models/userRegistrations");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("../src/db/conn");

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(express.static(template_path));
app.set("view engine", "hbs");
app.use(express.static(static_path))
app.set("views", template_path);
hbs.registerPartials(partials_path);


app.get("/", (req, res) => {
    res.render("index");
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/registration", (req, res) => {
    res.render("registration")
})

app.post("/registration", async (req, res) => {
    try {
        const registers = new register({
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        // generate token on middleware
        const token = await registers.createAuthToken();
        const users = await registers.save();
        
        res.status(201).render("index");
    } catch (error) {
        res.status(400).send(error);
    }
})

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userEmail = await register.findOne({ email: email });
        const isMatch = bcrypt.compare(password,userEmail.password);
        // create Token when login
        const token = await userEmail.createAuthToken();
        // console.log(token);
        if (isMatch) {
            res.status(201).render("index");
        }
        else {
            res.send("invalid data")
        }
    } catch (error) {
        res.status(400).send("invalid data");
    }
})


// const createToken = async() => {
//     const token = await jwt.sign({_id: "60ef139f99227317fc582188"},"sssdsdvsdvdskvmsdkvmsdvmsdvmsdlvmsdlvmdlvmdsvldsvmlemlsdm");
//     const verifyUser = await jwt.verify(token, "sssdsdvsdvdskvmsdkvmsdvmsdvmsdlvmsdlvmdlvmdsvldsvmlemlsdm");
// }
// createToken();

app.listen(port,(err) =>{
    console.log(`server is running at ${port}`);
    console.log(err)
})