var jwt = require('jsonwebtoken');
const express = require('express');
const router = require('express').Router();
// const verifylogin = require('../models/login');
const bodyparser = require('body-parser');
var localStorage;

router.use(bodyparser.urlencoded({extended:false}))
router.use(bodyparser.json())

module.exports=(req,res,next)=>{
   try {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
      }
      var mytoken=localStorage.getItem('mytoken')
    // var token=req.body.token.split(" ")[1];
    var decode = jwt.verify(mytoken, 'secret');
    req.userData= decode;
    console.log("auth :",token);
    next();
   } catch (error) {
       res.status(401).json({
           error:"invallid token"
       });
   }
}