const express = require ('express')
const router =  express.Router();
const path = require ('path')
const db = require ('../db.js')



router.get('/index',(req,res) =>{
    res.render(path.join(rootParh,'./view/index.html'))
})

router.get('/list',(req,res) =>{
    res.render(path.join(rootParh,'./view/list.html'))
})
router.get('/detail',(req,res) =>{
    res.render(path.join(rootParh,'./view/detail.html'))
})
module.exports = router
