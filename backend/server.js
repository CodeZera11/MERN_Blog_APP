const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

const app = express();
const secret = 'thisisasecretkey';

// mongoose.connect('CodeZera3:S6X3hgqzYVHZEvov@mern-blog-app.pomlktq.mongodb.net/')
// mongoose.connect('mongodb+srv://CodeZera3:S6X3hgqzYVHZEvov@mern-blog-app.pomlktq.mongodb.net/')
mongoose.connect('mongodb://localhost:27017/MERN_Blog')

app.use(cors({credentials:true, origin: 'http://localhost:3000'}))
app.use(express.json());
app.use(cookieParser());

const salt = bcrypt.genSaltSync(10);

app.post('/register', async (req,res)=>{
    const {username, password} = req.body;
    var hashedPassword = bcrypt.hashSync(password, salt);
    try {
        const userDoc = await User.create({username, password: hashedPassword});
        res.json(userDoc);
    } catch (error) {
        console.log("5")
        res.status(400).json({message: "please use a unique username"})
    }
});

app.post('/login', async (req,res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});

    if(!user){
        res.status(400).json({message: "User does not exists"})
    }

    if(user){
        const passOk = bcrypt.compareSync(password, user.password);
        // res.json(passOk);
        if(passOk){
            jwt.sign({username,id: user._id}, secret, {}, (err,token)=>{
                if(err) throw err;
                console.log("Login successful")
                res.cookie('token', token).json({
                    id: user.id,
                    username: user.username
                });
            })
        }else{
            res.status(400).json('wrong credentials');
        }
    }
});

app.get('/profile',(req,res) => {

    const {token} = req.cookies;

    jwt.verify(token, secret, {}, (err,info)=>{
        if(err) throw err;
        res.json(info);
    })

    res.json(req.cookies)
});

app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
});

app.listen(4000);

// S6X3hgqzYVHZEvov

// mongodb+srv://CodeZera3:S6X3hgqzYVHZEvov@mern-blog-app.pomlktq.mongodb.net/