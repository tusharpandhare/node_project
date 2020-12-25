'use strict'
const express = require('express');
const router = require('express').Router();
// const mongo = require('mongodb').MongoClient();
// const verifylogin = require('../models/login');
const bodyparser = require('body-parser');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
var config = require("../config/database");
// const multer = require('multer');
const checkauth = require('../api/middleware/auth');

   
var localStorage;
let refuser;
let task;
let getalltask;
let token;
let result;
let alltaskget;
// mongoose.connect( config.database,{ useNewUrlParser: true } ); 
// var db = mongoose.connection;
// db.on( 'error', console.error.bind(console, 'connection error') );
// db.once( 'open', () => {
//     console.log( 'connected to mongodb' );
// } );
// var router = express.Router();
router.use(bodyparser.urlencoded({extended:false}))
router.use(bodyparser.json())
router.use(express.json());
var getschema =new mongoose.Schema({
    name:String,
    category:String,
    priority:String,
    startdate:Date,
    enddate:Date,
    isPublished: Boolean
  })
var schema = mongoose.Schema;
   const logschema = new schema({
       name:String,
       email:String,
       username:String,
       password:String
   })
   const log = mongoose.model("users", logschema);
router.post('/checklogin',(req,res)=>{
    console.log("now entered in check login");
    var bodystr = JSON.stringify(req.body);
    var body = JSON.parse(bodystr);
// console.log(req.userData);
async function checklogin(){

    
   result=await log.find()
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
    getalltask =new mongoose.model(result[0].username ,getschema);
     alltaskget = getalltask.find({});
      token=jwt.sign({
          username:result[0].username,
          password:result[0].password
      },
      'secret',
      {
          expiresIn:'1h'
      }
      );
    //   console.log(token);
      
       

      function alltask(){

        console.log('getting all task');
        try {
            alltaskget.exec(function(err,data){
                if(err) throw err;
                console.log("getting all task",data);
                res.render('../views/todo',{
                    token:token,
                    active:"ok",
                    active1:"",
                    active2:"",
                    name:result[0].name,
                    records:data
                })

            })
            // mongoose.connection.close();
           
        } catch (error) {
            console.log(error);
            
        }
          
            // console.log(task);
      }
      alltask();
    //   if (typeof localStorage === "undefined" || localStorage === null) {
    //     const LocalStorage = require('node-localstorage').LocalStorage;
    //     const localStorage = new LocalStorage('./scratch');
    //   }
       
    // if (typeof localStorage === "undefined" || localStorage === null) {
    //     var LocalStorage = require('node-localstorage').LocalStorage;
    //     localStorage = new LocalStorage('./scratch');
    //   }
       
    //   localStorage.setItem('mytoken', token);
    
    //   res.send('login successful');
    //   console.log(token);
    //   console.log(result);
    //   console.log(localStorage.getItem('mytoken'));
    // var tokenObj = {"token": token};
    // res.status(200).send(tokenObj);
    
    // console.log("Token: ", token);
    refuser=result[0].username;
     
  }
 if(result.length>1){
    res.render('../views/home',{
        type:'danger',
        msg:"hi",
        intro:"please create new account!",
        info:"sorry there is some server issue"


    })
  }
}
checklogin();
})

router.post('/addtask',(req,res)=>{
    console.log(req.body);
    console.log(refuser);
    const insertschema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        category:{
            type:String,
            required: true,
            enum:['Personal','Public']

        },
        priority:{
            type:String,
            required:true,
            enum:['High','low','Medium']
        },
        startdate: { type: Date, 
        required: true
        },
        enddate:{
            type:Date,
            required:true
        },
        iscompleted: Boolean
    });
    
    // Create a model from the Schema (Course is a model (Class))
    // const Newtask = new mongoose.model(refuser, insertschema);
  
    // Function to create a course
     function inserttask() {
        
    
        var newtask = new getalltask({
            name:req.body.name,
            category:req.body.category,
            priority:req.body.priority,
            startdate:req.body.startdate,
            enddate:req.body.enddate,
            isPublished: false
        });
    
        newtask.save(function(err,res1){
            if(err) throw err;
            alltaskget.exec(function(err,data){
                if(err) throw err;
                console.log(data);
                res.render('../views/todo',{
                    token:token,
                    active:"ok",
                    active1:"",
                    active2:"",
                    name:result[0].name,
                    records:data
                })
    
            })
        });
       
    }
    
    // Create a course document
    inserttask();
})

// delete task
router.get('/delete/:id',(req,res)=>{
var id = req.params.id;

console.log("id is ",id);

console.log("_____________________");


var del = getalltask.deleteOne({_id:id});
console.log(del);
try {
    del.exec(function(err,data){
        if(err) throw err;
        console.log(data);
        var  newdata = getalltask.find();
        newdata.exec(function(err,remaindata){
    
            // console.log("~~~~~~~~~~~ remain data",remaindata);
            res.render('../views/todo',{
                token:token,
                active:"ok",
                active1:"",
                    active2:"",
                name:result[0].name,
                records:remaindata
            })
         
    })
    })
  
} catch (error) {
    console.log(error);
    
}

});

// edit task
router.get('/edit/:id',(req,res)=>{
    var id = req.params.id;
    
    // console.log("id is ",id);
    // res.send('editing');
    // console.log("_____________________");
    
    
    var edit = getalltask.findById(id);
    edit.exec(function(err,data){
     if(err) throw err;
     res.render('../views/edit',{
         records:data
     });
    })
    
    });

    // update task
    router.post("/updatetask",(req,res)=>{
        console.log(req.body);
       var update = getalltask.findByIdAndUpdate(req.body.id,{
        name:req.body.name,
        category:req.body.category,
        priority:req.body.priority,
        startdate:req.body.startdate,
        enddate:req.body.enddate,
        isPublished: false
       })
       update.exec(function(err, data){
           if(err) throw err;
           console.log("updated success");
           var  newdata = getalltask.find();
           newdata.exec(function(err,remaindata){
       
               // console.log("~~~~~~~~~~~ remain data",remaindata);
               res.status(200).render('../views/todo',{
                   token:token,
                   active:"ok",
                   active1:"",
                    active2:"",
                   name:result[0].name,
                   records:remaindata
               })
            })
       })
    })

    // complete task
    router.get('/complete/:id',(req,res)=>{
        let course;
        console.log(req.params.id);
        function updateCourse() {
            // Approch 1: Query first
            // find the document - findById()
             course = getalltask.findByIdAndUpdate(req.params.id,
                {
                    $set: {

                        isPublished: true
                    }
                }, {new: true});
                course.exec(function(err,data){
                    if(err) throw err;
                    console.log(data);
                })
                
            
                // save the document - save()
                // const result = course.save();
                // console.log(course);
                var  newdata = getalltask.find();
                newdata.exec(function(err,remaindata){
            
                    // console.log("~~~~~~~~~~~ remain data",remaindata);
                    res.status(200).render('../views/todo',{
                        active:"ok",
                        active1:"",
                    active2:"",
                        token:token,
                        name:result[0].name,
                        records:remaindata
                    })
                 })
            }
        
           
        
        
        // Update a course document
        updateCourse();

    })

    // displaying complete task
    router.get('/getcomplete',(req,res)=>{
        var  newdata = getalltask.find({isPublished:true});
                newdata.exec(function(err,remaindata){
            
                    // console.log("~~~~~~~~~~~ remain data",remaindata);
                    res.status(200).render('../views/todo',{
                        active:"",
                        active1:"ok",
                    active2:"",
                        token:token,
                        name:result[0].name,
                        records:remaindata
                    })
                 })
    })

    //displaying incomplete task
    router.get('/getincomplete',(req,res)=>{
        var  newdata = getalltask.find({isPublished:false});
                newdata.exec(function(err,remaindata){
            
                    // console.log("~~~~~~~~~~~ remain data",remaindata);
                    res.status(200).render('../views/todo',{
                        active:"",
                        active1:"",
                    active2:"ok",
                        token:token,
                        name:result[0].name,
                        records:remaindata
                    })
                 })
    })

    // displaying all task
    router.get('/getall',(req,res)=>{
        var  newdata = getalltask.find();
                newdata.exec(function(err,remaindata){
            
                    // console.log("~~~~~~~~~~~ remain data",remaindata);
                    res.status(200).render('../views/todo',{
                        active:"ok",
                        active1:"",
                    active2:"",
                        token:token,
                        name:result[0].name,
                        records:remaindata
                    })
                 })
    })
module.exports=router;