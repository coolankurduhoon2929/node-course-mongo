var mongoose=require('mongoose');

//new mongoose model
var user=mongoose.model('user',{
  email:{
    type:String,
    trim:true,
    minlength:1,
    required:true
  }
});

module.exports={
  user:user
}
