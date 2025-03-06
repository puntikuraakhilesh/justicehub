const { urlencoded } = require('body-parser')
const express= require('express')
const { protect }=require('../auth/middleware')
const { addDetailsAction,editDetailsAction,updateAllDetailsAction,getDetailsAction ,getAllDetailsAction} = require('../controllers/lawyer.controller')

const routes=express.Router()





routes.use(express.json())
routes.use(urlencoded({extended:true}))


routes.post('/adddetails',protect,addDetailsAction);
routes.patch('/editdetails/:user_id',protect,editDetailsAction);
routes.put('/updatedetails/:user_id',protect,updateAllDetailsAction);
routes.get('/getdetails/:user_id',protect,getDetailsAction);
routes.get('/getalldetails',protect,getAllDetailsAction);



module.exports=routes;