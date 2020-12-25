var express = require('express');
var router = require('express').Router();

router.get('/logout',(req,res)=>{
   try {
    //    localStorage.removeItem('token');
       res.render('../views/home',{
           msg:"hi",
           type:'success',
           intro:"logout successfully",
           info:"thank you!"
       })
   } catch (error) {
       console.log(error);
       
   }
})
module.exports = router;