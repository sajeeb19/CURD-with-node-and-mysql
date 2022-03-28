const express = require('express');
const ejs = require('ejs');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended :false
}))
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'curd'
  });

  connection.connect((error)=>{
      if(!error){
        console.log("connection successful");
      }else{
        console.log("connection fail");
      }
  });

app.set('views', './views') 
app.set('view engine','ejs');
  

app.get('/',(req,res)=>{
    let sql = 'SELECT  * FROM user';
    let  query = connection.query(sql,(err,rows)=>{
        if(err){
            throw err;
        }else{
            
            res.render('index',{
                taitle:"This is  curd operation",
                user:rows
            });
        }
    });
  
});

app.get('/add',(req,res)=>{
    res.render('add_user',{
        taitle:"This is  curd operation",
    
    });
});

app.post('/save',(req,res)=>{
    const data = {
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone
    };
    let sql = 'INSERT INTO user SET ?';
    let query = connection.query(sql,data,(err,rows)=>{
        if(err){
            throw err;
        }else{
            
            res.redirect('/');
        }
    });
});
app.get('/edit/:id',(req,res)=>{
    const id =  req.params.id;
    let sql = `SELECT  * FROM user WHERE id = ${id}`;
    let  query = connection.query(sql,(err,results)=>{
        if(err){
            throw err;
        }else{
            res.render('edit_user',{
                taitle:"This is  curd operation",
                user:results[0]
            });
        } 
    });
});
app.post('/update',(req,res)=>{
    const id =  req.body.id;
    const name1 = req.body.name;
    const email1 = req.body.email;
    const phone1 = req.body.phone;
    

    let sql = 'UPDATE user SET name = ?, email = ?, phone = ? WHERE id = ?';
    let query = connection.query(sql,[name1 ,email1 ,phone1, id],(err,rows)=>{
        if(err){
            throw err;
        }else{            
            res.redirect('/');
        }
    });
});
app.get('/delete/:id',(req,res)=>{
    let sql = `DELETE FROM user WHERE id = ${req.params.id}`;
    let query = connection.query(sql,(err,rows)=>{
        if(err){
            throw err;
        }else{            
            res.redirect('/');
        }
    });
});

app.listen(3000,()=>{
    console.log(`Port: 3000 listen`);
});