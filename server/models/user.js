const mongoose=require('mongoose');
const validator=require('validator');


//new mongoose model
var user=mongoose.model('user',{
  email:{
    type:String,
    trim:true,
    minlength:1,
    required:true,
    unique:true,
    validate:{
      validator:(value)=>{
        return validator.isEmail(value);
      },
      message:`{VALUE} is not valid e-mail`
    }
  },
  password:{
    type:String,
    required:true,
    minlength:6
  },
  tokens:[{
    access:{
      type:String,
      required:true
    },
    token:{
      type:String,
      required:true
    }
  }]
});

module.exports={
  user:user
}
