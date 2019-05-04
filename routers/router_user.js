const express = require('express')
const router = express.Router();
const path = require('path')
const db = require('../db.js')
const moment = require('moment')




router.get('/admin/user/users', (req, res) => {
    res.render(path.join(rootParh, './view/admin/user/users.html'))
})
router.get('/admin/user/getUsers', (req, res) => {
    const sql = 'select * from ali_admin'
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send({ result })
    })
})
router.get('/admin/user/adduser', (req, res) => {
    res.render(path.join(rootParh, './view/admin/user/adduser.html'))
})
router.post('/admin/user/addUserDeal', (req, res) => {
    const data = {
        admin_email: req.body.email,
        admin_nickname: req.body.nickname,
        admin_pwd: req.body.password,
        admin_state: req.body.state,
        admin_addtime: moment().format('YYYY-MM-DD')
    }
    const sql = 'insert into ali_admin set ?';
    db.query(sql, data, (err, result) => {
        if (err || result.affectedRows != 1) {
            return res.send({ code: 201, message: '失败' });
        }
        res.send({ code: 200, message: '成功' });
    })
})
router.post('/admin/user/delusers', (req, res) => {
    const ids = req.body.ids;
    const sql = `delete from ali_admin where admin_id in (${ids})`;
    db.query(sql, (err, result) => {
        if (err) {
            return res.send({ code: 201, message: '失败' })
        }
        res.send({ code: 200, message: '成功' })
    })
})
router.get('/admin/user/edituser', (req, res) => {
    const id = req.query.id
    const sql = 'select * from ali_admin where admin_id=?'
    db.query(sql, id, (err, result) => {
        res.render(path.join(rootParh, './view/admin/user/edituser.html'), result[0])
    })

})
router.post('/admin/user/modifyuser', (req, res) => {
    const data = {
        admin_email: req.body.email,
        admin_nickname: req.body.nickname,
        admin_tel: req.body.tel,
        admin_state: req.body.state
    }
    const admin_id = req.body.id;
    const sql = 'update ali_admin set ? where admin_id=?';
    db.query(sql,[data,admin_id],(err,result)=>{
        if(err || result.affectedRows!=1) {
            console.log(err)
            return res.send({code:201,message:'失败'})
        }
        res.send({code:200,message:'成功'})
    })
})

module.exports = router