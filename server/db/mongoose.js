var mongoose=require('mongoose');

//to use promise with moongoose
mongoose.Promise=global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports={
  mongoose:mongoose
}
