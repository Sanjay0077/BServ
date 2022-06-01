const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require("express-handlebars"); //template engine
const bodyparser = require("body-parser"); //handle json format
const routes = require('./routes');
const nodemailer = require('nodemailer');
const app = express();


app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//Template engine
const handlebars = exphbs.create({ extname: ".ejs" });
app.engine('ejs', handlebars.engine);
app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(session({
    name: 'session',
    secret: 'my_secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600 * 1000, // 1hr
    }
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

// app.use((err, req, res, next) => {
//     // console.log(err);
//     return res.send('Internal Server Error');
// });
//Admin Mail
let transporter = nodemailer.createTransport({
    host: 'smtp.googlemail.com',
    port: 465,
    auth: {
    user: 'BServpremium@gmail.com',
    pass: 'BServ@123'
    },
    tls: {
        rejectUnauthorized:false
    }
});

    
// adminmail route
app.get('/adminmail',(req, res) => {
    res.render('adminmail');
      
    });

    var mysql=require('mysql2');

    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'tws'
    }); 
 //User Mail       
app.post('/sendmail',(req, res) => {
    
    let to_email = req.body.to_email;
    let mail_subject = req.body.mail_subject;
    let message = req.body.message;
 


    let messageOptions = {
        from: 'BServ <BServpremium@gmail.com>',
        to: to_email,
        subject: mail_subject,
        
        html: message
    };
    transporter.sendMail(messageOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
       
          console.log('Message %s sent: %s', info.messageId, info.response); 
        //   res.render('admin',{mailmsg:"Mail sented successfully"});
        res.redirect('admin');
    });
});

//to run port
app.listen(4000, () => console.log('Server is runnging on port 4000'));