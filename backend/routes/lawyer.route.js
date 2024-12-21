const { urlencoded } = require('body-parser')
const express= require('express')
const { protect }=require('../auth/middleware')
const { addDetailsAction,editDetailsAction,updateAllDetailsAction } = require('../controllers/lawyer.controller')

const routes=express.Router()





routes.use(express.json())
routes.use(urlencoded({extended:true}))


routes.post('/adddetails',protect,addDetailsAction);
routes.patch('/editdetails/:user_id',protect,editDetailsAction);
routes.put('/updatedetails/:user_id',protect,updateAllDetailsAction);


module.exports=routes;