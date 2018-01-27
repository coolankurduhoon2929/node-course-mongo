var express=require('express');
var bodyParser=require('body-parser');
const {ObjectID}=require('mongodb');
var {mongoose}=require('./db/mongoose');
var {Todo}=require('./models/todos');
var {user}=require('./models/user');

var app=express();
const port=process.env.PORT || 3000;
//middleware
app.use(bodyParser.json());


app.post('/todos',(req,res)=>{
  var todo=new Todo({
    text:req.body.text
  });
  todo.save().then((doc)=>{
    res.send(doc);
  },(err)=>{
    res.status(400).send(err);
  });
});

app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  },(e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos/:id',(req,res)=>{
  //res.send(req.params);
  var id=req.params.id;
  //Validate id
  if(!ObjectID.isValid(id)){
    return res.status(404).send('Invalid id');
  }
  Todo.findById(id).then((todo)=>{
    if(!todo){
      return res.send('ID not found');
    }
    res.send(todo);
  }).catch((e)=>{
    res.status(400).send('Some error');
  });
});





app.listen(port,()=>{
  console.log(`server up on ${port}`);
});

module.exports={app};

// //creating new todo
// var newTodo=new Todo({
//   text:'  edit this video '
// });
//
// //saving to mongo database
// newTodo.save().then((doc)=>{
//   console.log('Saved todo',doc);
// },(err)=>{
//   console.log('Unable to save todo');
// });
//
//
//
// var newuser=new user({email:"coolkaal2929@gmail.com"});
// newuser.save().then((doc)=>{
//   console.log(doc);
// },(err)=>{
//   console.log(err);
// });
