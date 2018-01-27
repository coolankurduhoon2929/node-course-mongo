const {ObjectID}=require('mongodb');
const {mongoose}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todos');
const {user}=require('./../server/models/user');
// var id='5a6c8a870b8dae37dbadc013';
// //find all todos...
// Todo.find({
//   _id:id
// }).then((todos)=>{
//   console.log('Todos',todos);
// });
//
// //returns first match...
// Todo.findOne({
//   _id:id
// }).then((todo)=>{
//   console.log('Todo',todo);
// });

// if(!ObjectID.isValid('helo')){
//   console.log('ID not valid');
// }

//directly find by id...
// Todo.findById('helo').then((todo)=>{
//   //if id not found then null is returned in sucess call//that is this one ...first function of next
//   if(!todo){
//     return console.log('ID not found');
//   }
//   console.log('Todo',todo);
// }).catch((e)=>{
//   console.log(e);
// });


var id='5a69defwfebcb3036131285799059';
if(!ObjectID.isValid(id)){
  console.log('Invalid ID');
}
else{
  user.findById(id).then((user)=>{
    if(!user){
      return console.log('ID not found');
    }
    console.log(user);
  });
}
