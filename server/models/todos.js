var mongoose=require('mongoose');


//save new something
var Todo=mongoose.model('Todo',{
  text:{
    type:String,
    required:true,      //mongoose validator
    minlength:1,       //mongoose validator
    trim:true              //trim leading and trailing spaces
  },
  completed:{
    type:Boolean,
    default:false     //mongoose validator
  },
  completedAt:{
    type:Number,
    default:null     //mongoose validator
  }
});

module.exports={
  Todo:Todo
}
