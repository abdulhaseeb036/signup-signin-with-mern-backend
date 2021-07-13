
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/form", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log("Connection with database successfully done");
}).catch((err) => {
    console.log(err);
})


