const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName : {
    type : String,
    required: true,
    minLength: 4,
    maxLength: 50,
  },
  lastName : {
    type : String,
    required: true,
  },
  emailId : {
    type : String,
    required: true,
    lowercase : true,
    trim : true,
    unique : true
  },
  password: {
    type : String,
    required: true,
  },
  gender : {
    type : String,
    lowercase : true,
    validate(value) {
      if(!['male','female','others'].includes(value)) {
        throw new Error('Gender not valid')
      }
    }
  },
  age : {
    type : Number,
    min : 18,
    max : 65
  },
  about : {
    type : String,
    default : 'This is a default user.'
  },
  photoUrl : {
    type : String,
    default : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStxJY-xf_tITnktU_jDrSwDCT20l87tt4Ol6J-1BY-2Q&s=10'
  }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;
