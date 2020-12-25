var express = require("express");
var path = require("path");
var mongoose = require('mongoose');
var config = require("./config/database");
var bodyparser = require('body-parser');
var route = require('./routes/login')
var cookieparser = require('cookie-parser');
var session = require('express-session');
var config = require('./config/database');


mongoose.connect( config.database,{ useNewUrlParser: true } ); 
var db = mongoose.connection;
db.on( 'error', console.error.bind(console, 'connection error') );
db.once( 'open', () => {
    console.log( 'connected to mongodb' );
} );
// init app
var app = express();

// view  engin setup
app.set( 'views', path.join(__dirname, 'views') );
app.set( 'view engine', 'ejs' );

// flash message middleware

// body parser middleware
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

// set the public folder
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cookieparser('secret'));
// app.use(session({cookie:{maxAge:null}}));

// app.get("/",(req,res) => {
//   res.render("../views/home.ejs",{
//     name: "tushar",
//     title: "ejs engine"
//   })
// })
// app.get("/register", (req,res) => {
//   res.render("../views/register.ejs");
// })
// validating pass
// set routes
app.locals.errors = null;
var login = require('./routes/login');
var register = require('./routes/register'); 
var validate = require('./routes/valideme')
var todo = require('./routes/todo');
var checklogin = require('./routes/checklogin');
var logout = require('./routes/logout');
var addtask = require('./routes/checklogin')

// var home = require('./views/hello.js');

app.use("/", login);
app.use( '/register', register );
app.all('/registerme', validate);
app.all('/gotodo',todo);
app.all('/checklogin', checklogin);
app.all('/logout', logout);
app.all('/addtask',addtask);
app.all('/addnewtask', checklogin);
app.all('/delete/:id', checklogin);
app.all('/edit/:id', checklogin);
app.all('/updatetask',checklogin);
app.all('/complete/:id', checklogin);
app.all('/getcomplete',checklogin);
app.all('/getincomplete',checklogin);
app.all('/getall',checklogin);

// app.all('/home', home);
// app.post('/form-validate', (req,res)=>{
//     res.render("../views/register.ejs",{
//         name:"tusharrr"
//     });
// })
// app.use((req,res,next)=>{
//     res.locals.message = req.session.message
//     delete req.session.messages;
//     next();
//     })
//     app.post('/form-validate', (req,res)=>{
//         if(req.body.name==''||req.body.email||req.body.username||req.body.password||req.body.cpassword==''){
//             req.session.message={
//                 type:"danger",
//                 intro:'empty fields'
//             }
//             res.redirect('/')
//         }
//     } ) 


var port=5000;
app.listen(port, () => {
    console.log( "server running on port ", port );
})