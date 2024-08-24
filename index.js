const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cookiesparser=require('cookie-parser');

const app=express();

app.use(helmet());
app.use(cookiesparser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,'views'));

const PORT=3000;

app.get('/',(req,res)=>{
    let username = req.cookies.username;
    return res.render("home",{
        username
    });
});

app.get('/login',(req,res)=>{
    let status = req.query.msg?true:false;
    let username = req.cookies.username;
    if (status){
        return res.render("login",{
            error:"invalid details"
        });
    }
    else{

        return res.render("login",{
            username
        });
    }   
});

app.get('/welcome',(req,res)=>{
    let username = req.cookies.username;
    return res.render("welcome",{ username });
});

app.post('/process_login',(req,res)=>{
    let {username,password}=req.body;

    let userdetails={
        username:"john",
        password:"safe2"
    };
    if (username===userdetails['username']&&password===userdetails['password']){
        res.cookie('username',username);
        return res.redirect('/welcome');
    } 
    else{
        return res.redirect('/login?msg=fail');
    }
});

app.listen(PORT,()=>{console.log('server Started!')});

 