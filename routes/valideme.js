'use strict'
const express = require('express');
const router = require('express').Router();
const bodyparser = require('body-parser');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
var userdb = require('../models/user')
// var router = express.Router();

router.use(bodyparser.urlencoded({extended:false}))
router.use(bodyparser.json())

router.post( "/registerme", (req,res) => {

    var bodystr = JSON.stringify(req.body);
    var body = JSON.parse(bodystr);
   if(!(req.body.password === req.body.cpassword)){
    res.render('../views/register', {
            
        title: "registration",
        name:"tushar",
        type: 'warning',
        intro:'Password not matching,',
        msg:'both password and confirm password need to match'
    } );

   }
      else{
          // validating password using joi
          const { error } = vallidatepassword(body.password);

          if (error) {
              //Bad request
               res.render('../views/register', {
            
                    title: "registration",
                    name:"tushar",
                    type: 'warning',
                    intro:'require Strong password (Password@123)',
                    msg: error
                } );
                console.log(body.password);
                console.log(body.cpassword);
              return;
          }
          else{
              var name = body.name;
              var email = body.email;
              var username = body.username;
              var password = body.password;
            async function createuser() {
                // Instantiate the Course. Here course represents a document object
            userdb.findOne({username:body.username}, (err,user)=>{
                if(err){
                    console.log('getting error');
                }
                if(user){
                    res.render('../views/register',{
                        name:"tushar",
                        type: 'warning',
                        intro:'user already exist',
                        msg: "please try with another username"
                    })
                }
            })
                const user = new userdb({
                   name : name,
                   email: email,
                   username: username,
                   password: password
                });
            
                // Save the document
                try {
                    // Use validate method to validate a document
                    let result = await user.validate();
                    result = await user.save(function(err){
                        if(err){
                            console.log(err);
                        }
                        else{
                            res.render('../views/home',{
                                msg:"Data",
                                type:"success",
                                intro:"data saved successfully!",
                                info:"now you can login using you creditials"
                                
                            });
                        }
                    });
                    // console.log(result);
                    
                }
                catch(err) {
                    console.log("Error: Could not save document", err.message)
                }
            }
            
            // Create a course document
            createuser();


            //  res.render('../views/register', {
            
            //         title: "registration",
            //         name:"tushar",
            //         type: 'success',
            //         intro:'successfully saved!',
            //         msg:'please login to proceed'
            //     } );
          }
 
           
        
      }
    // res.send("hello");
    // console.log(req.body);
 
    console.log(" request body ",body);
console.log(body.username);
} );
// function vallidatepassword(pass) {
//     // Define schema
//     const schema = {
//         password: joi.string().min(8).max(26).upperCase(1).numeric(1).symbol(1).required()
//     };

//     // Validate
//     const result = joi.validate(pass, schema);

//     return result;
// }
   function vallidatepassword(pass){
        const complexityOptions = {
            min: 8,
            max: 26,
            upperCase: 1,
            numeric: 1,
            symbol: 1,
            lowerCase: 1
            
          }
           
          var result = passwordComplexity(complexityOptions).validate(pass);
          console.log(result);
          return result;
          
    }

//exports
module.exports = router;