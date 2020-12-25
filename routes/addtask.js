var express = require('express');
var router = require('express').Router();

router.get('/addtask',(req,res)=>{
   try {
    //    localStorage.removeItem('token');
       res.render('../views/addtask');
    //    res.render('../views/todo');
   } catch (error) {
       console.log(error);
       
   }
})
module.exports = router;