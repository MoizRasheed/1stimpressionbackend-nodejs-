const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.PROD_MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true
        })
        console.log("DB connected.")
    }
    catch (e) {
        mongoose.connection.on("error", (err) => {
            console.log(`DB not Connected ${err.message}`)
        })
    }
}

mongoose.set('debug', true);
module.exports = connectDB;