const express = require ('express')
const router =  express.Router();
const path = require ('path')
const db = require ('../db.js')
const moment = require ('moment')




router.get('/admin/cate/cate',(req,res) =>{
   
    res.render(path.join(rootParh,'./view/admin/cate/cate.html'))
})
router.get('/admin/cate/getCate',(req,res) =>{
   const sql = 'select * from ali_cate';
   db.query(sql,(err,result) =>{
       if(err) {
           console.log(err);
           return res.send({code:201,message:"失败"});
       }
       res.send({message:200,list:result})
   })
})
router.get('/admin/cate/addcate',(req,res) =>{
    res.render(path.join(rootParh,'./view/admin/cate/addcate.html'))
})
router.post('/admin/cate/addCateDeal',(req,res)=>{
    const data = {
        cate_name : req.body.name,
        cate_icon : req.body.icon,
        cate_addtime : moment().format('YYYY-MM-DD')
    }
    const sql = 'insert into ali_cate set ?'
    db.query(sql,data,(err,result)=>{
        if (err) {
            console.log(err)
            return res.send({code:201,message: '添加栏目失败'})
        }
        res.send({code:200,message:'添加成功'})
    })
})
router.post('/admin/cate/delcate',(req,res)=>{
    const id = req.body.id;
    const sql = 'delete from ali_cate where cate_id=?';
    db.query(sql,id,(err,result)=>{
        if(err || result.affectedRows != 1) {
            console.log(err)
            return res.send({code:201,message:'删除失败'})
        }
        res.send({code:200,message : '删除成功'})
    })
})
router.get('/admin/cate/editcate',(req,res) =>{
    const id = req.query.id
    const sql  = 'select * from ali_cate where cate_id=?'
    db.query(sql,id,(err,result)=>{
        res.render(path.join(rootParh,'view','admin/cate/editcate.html'),result[0])
    })
})
router.post('/admin/cate/modifycate',(req,res)=>{
    const data = {
        cate_name : req.body.name,
        cate_icon : req.body.icon
    }
    const id = req.body.id;
    const sql = 'update ali_cate set ? where cate_id=?'
    db.query(sql,[data,id],(err,result)=>{
        if(err ||result.affectedRows != 1) {
            console.log(err);
            return res.send({code:201,message :"失败"})
        }
        res.send({code:200,message:"成功"})
    })
})

module.exports = router