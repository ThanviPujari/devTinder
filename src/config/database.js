const mongoose = require('mongoose');
const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://thanvipujari_db_user:MOwfEJYMJqkwQAfP@namastedev.k1lr413.mongodb.net/DevTinder');
}
module.exports = connectDB;
