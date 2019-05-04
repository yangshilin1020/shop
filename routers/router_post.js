const express = require ('express')
const router =  express.Router();
const path = require ('path')
const db = require ('../db.js')
const moment = require ('moment')

router.get('/admin/post/addpost',(req,res)=>{
    res.render(path.join(rootParh,'view','admin/post/addpost.html'))
})
router.get('/admin/post/posts',(req,res)=>{
    res.render(path.join(rootParh,'view','admin/post/posts.html'))
})  

module.exports = router