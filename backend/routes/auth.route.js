const { urlencoded } = require('body-parser')
const express= require('express')
const { protect }=require('../auth/middleware')

const routes=express.Router()

const {signupAction,loginAction,logoutAction,getAllLawyersAction}=require('../controllers/auth.controller')

routes.use(express.json())
routes.use(urlencoded({extended:true}))

routes.post('/signup',signupAction);
routes.post('/login',loginAction);
routes.post('/logout',protect,logoutAction);
routes.get('/getalllawyers',protect,getAllLawyersAction);

module.exports=routes;