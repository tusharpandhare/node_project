'use strict'
const express = require('express');
const router = require('express').Router();
// const verifylogin = require('../models/login');
const bodyparser = require('body-parser');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// const multer = require('multer');
const checkauth = require('../api/middleware/auth');

// var router = express.Router();
router.use(bodyparser.urlencoded({extended:false}))
router.use(bodyparser.json())
router.use(express.json());
// var logindetails={};
// var schema = mongoose.Schema;
//    const logschema = new schema({
//        name:String,
//        email:String,
//        username:String,
//        password:String
//    })
//    const log = mongoose.model("users", logschema);
router.get( "/gotodo",checkauth, (req,res) => {
    res.render('../views/todo.ejs');
// res.send('hello '+body.username);
// console.log(body);
// logindetails.username=body.username;
// logindetails.password=body.password;
console.log(req.userData);
async function getAllCourses(){

    
   const result=await log.find()
   .and([
       {username:body.username},
       {password:body.password}
   ])
  if(result.length==0){
      res.render('../views/home',{
          type:'danger',
          msg:"hi",
          intro:"User not Found!",
          info:"enter correct login information or create new account if not have an account"


      })
  }
  if(result.length==1){
      var token=jwt.sign({
          username:result[0].username,
          password:result[0].password
      },
      'secret',
      {
          expiresIn:'1h'
      }
      );
      if (typeof localStorage === "undefined" || localStorage === null) {
        const LocalStorage = require('node-localstorage').LocalStorage;
        const localStorage = new LocalStorage('./scratch');
      }
       
      localStorage.setItem('mytoken', token);
    
      res.send({
          name:result[0].name,
          email:result[0].email,
          username:result[0].username,
          password:result[0].password,
        token:token,
      
      })
      console.log(token);
      res.cookie('token',token);
     
  }
 if(result.length>1){
    res.render('../views/home',{
        type:'danger',
        msg:"hi",
        intro:"please create new account!",
        info:"sorry there is some server issue"


    })
  }
    // await verifylogin.find({$and:[{username:body.username},{password:body.password}]}toArray function(err, result){
    //     if(err){
    //         res.redirect("/",{
    //             msg:"hi",
    //             type:'danger',
    //             intro:"Username Or Password invallid",
    //             info:'make sure you enterd password is correct or create new account'
    //         })
    //     }
    //     else{
            
    //     }
    // })
// const result= await verifylogin.find()
//     .and([
//             {username: body.username}, //Criteria 1 or
//             {password: body.password} // Criteria 2
//         ]);
//       console.log(result);
//       console.log(result[0].name);
    //   var name= r.map(function(el){
    //       return el.name;
    //   })
    //   console.log(name);
    
    //     var gets= result[0];
    //     // var x=JSON.parse(gets)
    // console.log(gets.email);
    // // if(result){
    //     res.send("result found");

    // }
    // else{
    //     res.send("result not found");
    }


// getAllCourses();
    //     res.render("../views/todo.ejs", {
            
    //     title: "registration",
    //     name:""
    // } );
    // res.send("hello");
} );


//exports
module.exports = router;
// module.exports = logindetails;