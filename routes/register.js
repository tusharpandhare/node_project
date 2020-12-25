'use strict'
const express = require('express');
const router = require('express').Router();
// var router = express.Router();


router.get( "/", (req,res) => {
   
        res.render("../views/register.ejs", {
            
        title: "registration",
        name:""
    } );
    // res.send("hello");
} );


//exports
module.exports = router;