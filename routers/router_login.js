const express = require('express')
const router = express.Router();
const path = require('path')
const db = require('../db.js')




router.get('/admin/login', (req, res) => {
    res.render(path.join(rootParh, './view/admin/login.html'))
})
router.get('/admin/index', (req, res) => {
    res.render(path.join(rootParh, './view/admin/index.html'))
})
router.post('/admin/checkLogin', (req, res) => {
    const email = req.body.email;
    const passwd = req.body.passwd;
    const sql = 'select * from ali_admin where admin_tel=? and admin_pwd=?';
    db.query(sql, [email, passwd], (err, result) => {
        if (err || result.length != 1) {
            return res.send({ code: 201, message: '失败' });
        }
        req.session.isLogin = true;
        req.session.userInfo = result[0];
        res.send({ code: 200, message: '成功' })
    })
})
router.post('/admin/logout',(req,res)=>{
    req.session.destroy(function(err) {
        if(err) {
            return res.send({code:201,message : '失败'})
        }
        res.send({code:200,message : '成功'})
    })
})





module.exports = router