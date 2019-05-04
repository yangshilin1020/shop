const express = require ('express')
const router =  express.Router();
const path = require ('path')
const db = require ('../db.js')
const moment = require ('moment')

router.get('/admin/center/profile',(req,res)=>{
    
    res.render(path.join(rootParh,'view','admin/center/profile.html'),req.session.userInfo);
})

module.exports = router