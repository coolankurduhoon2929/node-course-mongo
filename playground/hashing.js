const {SHA256}=require('crypto-js');
const jwt=require('jsonwebtoken');

const bcrypt=require('bcryptjs');

 var password="123abc!";
// bcrypt.genSalt(10,(err,salt)=>{
//   bcrypt.hash(password,salt,(err,hash)=>{
//     console.log(hash);
//   });
// });

var hashedPassword='$2a$10$uhY3viXONU41eSqPnbgtJuPc.6rGRMls0Zug0rgnS/nQgi6j0hy12';
bcrypt.compare(password,hashedPassword,(err,res)=>{
  console.log(res);
});

// var data={
//   id:10
// }

// var token=jwt.sign(data,'papa is always papa');
// console.log(token);
//
// var decoded=jwt.verify(token,'papa is always papa');
// console.log(decoded);

// var message='I am user number 3';
// var hash=SHA256(message).toString();
//
// console.log(hash);
//
// var data={
//   id:4
// };
//
// var token={
//   data:data,
//   hash:SHA256(JSON.stringify(data)+'papa is always papa').toString()
// }
//
// token.data.id=5;
// token.hash=SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash=SHA256(JSON.stringify(token.data)+'papa is always papa').toString();
//
// if(resultHash===token.hash){
//   console.log('Data was not changed');
// }
// else{
//   console.log('Data changed');
// }

//We will be using jwt library instead for crypto-js b/c it is much simpler
