var express = require('express');
var router = require('express').Router();

router.get('/home',(req,res)=>{
    res.send('hello tushar');
})