const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


const userDataSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// Generate Auth token in middleware
userDataSchema.methods.createAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.SECRET_TOKEN_KEY);
        this.tokens = this.tokens.concat({token});
        await this.save();
        // console.log(token);
        return token;
    } catch (error) {
        res.send(error);
        // console.log(error);
    }
}

// Password hashing ion middleware
userDataSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bycrypt.hash(this.password, 10);
    }
    next();
})

const Register = new mongoose.model("Register", userDataSchema);

module.exports = Register;