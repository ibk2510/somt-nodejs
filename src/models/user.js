const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 20,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    max: 20,
  },
  email :{
      type : String,
      required : true ,
      trim : true ,
      unique : true,
  },
  hashPassword :{
      type: String,
      required : true,
    
  },
  username : {
    type : String,
    unique : true,
    required : true
  },
  role : {
      type : String ,
      enum : ['user' , 'farmer' , 'admin'],
      default : 'user'
  },
  contactNumber : {
      type : String, 

  },

},
{
    timestamps : true
});


userSchema.virtual('password').set(function(password){
    this.hashPassword = bcrypt.hashSync(password , 10);
});

userSchema.methods = {
    authenticate : function(password){
        return bcrypt.compareSync(password , this.hashPassword);
    }
}


module.exports = mongoose.model("User" , userSchema);
