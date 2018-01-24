// const MongoClient=require('mongodb').MongoClient;
const {MongoClient,ObjectID}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to mongodb server');

  //findOneAndUpdate
  // db.collection('Todos').findOneAndUpdate({
  //   _id:new ObjectID("5a68cb828500a3c98c428643")
  // },{
  //   $set:{
  //     completed:true
  //   }
  // },{
  //   returnOrigional:false
  // }).then((res)=>{
  //   console.log(res);
  // });

  db.collection('Users').findOneAndUpdate({
    _id:new ObjectID("5a688d7bf79fd2153d115f90")
  },{
    $set:{
      name:"Munna"
    },
    $inc:{
      age:1
    }
  },{
    returnOrigional:false
  }).then((res)=>{
    console.log(res);
  });


  //db.close();
});
