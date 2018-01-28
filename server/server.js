var express=require('express');
var bodyParser=require('body-parser');
const {ObjectID}=require('mongodb');
var {mongoose}=require('./db/mongoose');
var {Todo}=require('./models/todos');
var {user}=require('./models/user');
const _=require('lodash');

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

app.delete('/todos/:id',(req,res)=>{
  var id=req.params.id;
  console.log(id);
  if(!ObjectID.isValid(id)){
    return res.status(404).send('Id not valid');
  }
  Todo.findByIdAndRemove(id).then((doc)=>{
    if(!doc){
      return res.status(404).send('ID does not exist');
    }
    res.send(doc);
  }).catch((err)=>{
    res.send(400).send('some error');
  });
});

//to update resource...
app.patch('/todos/:id',(req,res)=>{
  var id=req.params.id;
  var body=_.pick(req.body,['text','completed']);
  if(!ObjectID.isValid(id)){
    return res.status(404).send('Id not valid');
  }

  if(_.isBoolean(body.completed) && body.completed){
      body.completedAt=new Date().getTime();
  }
  else{
    body.completed=false;
    body.completedAt=null;
  }
  Todo.findByIdAndUpdate(id,{$set:body},{new:true }).then((doc)=>{
    if(!doc){
      return res.status(404).send('Does not exist');
    }
    res.send({todo:doc});
  }).catch((e)=>{
    res.status(400).send('Some error');
  });

});


//POST /users
app.post('/users',(req,res)=>{
  var data=_.pick(req.body,['email','password']);
  var user1=new user(data);
  user1.save().then((docs)=>{
    return user1.generateAuthToken();
    // res.send(docs);
  }).then((token)=>{
    res.header('x-auth',token).send(user1);
  }).catch((err)=>{
    res.status(400).send(err);
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
