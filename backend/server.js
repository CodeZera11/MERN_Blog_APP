const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const multer  = require('multer')
const uploadMiddleware = multer({ dest: 'uploads/'})
const fs = require('fs');
const path = require('path')

const app = express();
const secret = 'thisisasecretkey';

mongoose.connect('mongodb://localhost:27017/MERN_Blog')

app.use(cors({credentials:true, origin: 'http://localhost:3000'}))
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'))

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
                    id: user._id,
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

app.post('/createpost', uploadMiddleware.single('file'), async (req,res) => {

    const {path, originalname} = req.file;

    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const {token} = req.cookies;

    jwt.verify(token, secret, {}, async (err,info)=>{
        if(err) throw err;
        const {title, summary, content} = req.body;
        const PostDoc = await Post.create({
            title, 
            summary, 
            content, 
            cover: newPath, 
            author: info.id
        })
        res.json(PostDoc);
    })

});

app.put('/post/', uploadMiddleware.single('file'), async(req,res) => {

    let newPath = null

    if(req.file){
        const {path, originalname} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    const {token} = req.cookies;

    jwt.verify(token, secret, {}, async (err,info)=>{
        if(err) throw err;

        const {id, title, summary, content} = req.body;
        let postDoc = await Post.findById(id);
        const isAuthor = (JSON.stringify(postDoc.author) === JSON.stringify(info.id))
        
        if(!isAuthor){
            return res.status(400).json('Invalid Author');
        }

        await postDoc.updateOne({
            title,
            summary,
            content,
            cover: newPath ? newPath: postDoc.cover, 
        })

        res.json(postDoc);
    
    });

});

app.get('/post', async (req,res) => {
    const response = await Post.find()
    .populate('author', ['username'])
    .sort({createdAt: -1})
    .limit(20)
    res.json(response);
});

app.get('/post/:id', async (req,res) => {
    const id = req.params.id;

    const postDoc = await Post.findById(id).populate('author', ['username']);

    res.json(postDoc);
});

app.listen(4000);

// S6X3hgqzYVHZEvov

// mongodb+srv://CodeZera3:S6X3hgqzYVHZEvov@mern-blog-app.pomlktq.mongodb.net/