const { urlencoded } = require('body-parser')
const express= require('express')
const { protect }=require('../auth/middleware')
const {getUserPeersAction}=require("../controllers/peers.controller")


const routes=express.Router()



routes.use(express.json())
routes.use(urlencoded({extended:true}))


routes.get("/getuserpeers/:userid",protect,getUserPeersAction);



module.exports=routes;