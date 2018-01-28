const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _=require('lodash');

var userSchema=new mongoose.Schema({
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

userSchema.methods.generateAuthToken=function(){
  //the user which called this
  var user=this;
  var access="auth";
  var token=jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
  user.tokens.push({access,token});

  return user.save().then(()=>{
    return token;
  })
};

userSchema.methods.toJSON=function(){
  var user=this;
  var userObject=user.toObject();
  return _.pick(userObject,['_id','email']);
};

userSchema.statics.findByToken=function(token){
  var User=this;
  var decoded;
  try{
    decoded=jwt.verify(token,'abc123');
  }catch(e){
    
    // return new Promise((resolve,reject)=>{
    //   reject();
    // });
    return Promise.reject();
  }
  return User.findOne({
    '_id':decoded._id,
    'tokens.token':token,
    'tokens.access':decoded.access
  });
};

//new mongoose model
var user=mongoose.model('user',userSchema);

module.exports={
  user:user
}
