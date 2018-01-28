var {user}=require('./../models/user.js')


//custom middleware
var authenticate=(req,res,next)=>{
  var token=req.header('x-auth');
  user.findByToken(token).then((user)=>{
    if(!user){
      // res.staus(401).send();
      return Promise.reject();
      //this sends to catch block
    }
    req.user=user;
    req.token=token;
    next();
  }).catch((e)=>{
    //not writing next here b/c we will not proceed if this occurs
    res.status(401).send();
  });
};

module.exports={
  authenticate
};
