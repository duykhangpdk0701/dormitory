require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

const connect = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@dormitory.qilczzp.mongodb.net/Dormitory?retryWrites=true&w=majority`
        );
        console.log('Connect DB successfully!!!');
    } catch (error) {
        console.log('Connect DB fail !!!' + error.message);
    }
};
module.exports = { connect }