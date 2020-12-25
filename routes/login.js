'use strict'
const express = require('express');
const router = require('express').Router();
// var router = express.Router();


router.get( "/", (req,res) => {
   
        res.render("../views/home.ejs", {
        msg:"",
        title: "signup"
    } );
    // res.send("hello");
} );


//exports
module.exports = router;