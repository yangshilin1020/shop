const express = require ('express')
const app = express()
const bp = require('body-parser');
const session = require ('express-session')
app.use(session({
    secret :'eyfy24fyed',
    resave :false,
    saveUninitialized :false
}))

app.use(bp.urlencoded({extended:false}));



app.use('/assets', express.static('./view/assets'));
app.use('/uploads', express.static('./view/uploads'));
const template = require('express-art-template');
app.engine('html', template);


app.listen(5000,()=>{
    console.log('success')
})

global.rootParh = __dirname ;
app.use(checksession);

const router_cate = require('./routers/router_cate.js');
app.use(router_cate);

const router_front = require('./routers/router_front.js');
app.use(router_front);

const router_login = require('./routers/router_login.js')
app.use(router_login);

const router_user = require('./routers/router_user.js')
app.use(router_user);
const router_center = require('./routers/router_center.js')
app.use(router_center);
const router_post = require('./routers/router_post.js')
app.use(router_post);
const router_pic = require('./routers/router_pic.js')
app.use(router_pic);
const api = require('./api.js')
app.use(api)



function checksession(req,res,next) {
    if (req.url != '/admin/login' &&  req.url != '/admin/checkLogin') {
        if (req.session.isLogin != true){
            return res.redirect('/admin/login')
        }
    }
   
    next()
}