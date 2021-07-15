
const mongoose = require("mongoose");

mongoose.connect(process.env.SECRET_DB_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log("Connection with database successfully done");
}).catch((err) => {
    console.log(err);
})


