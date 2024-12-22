const { urlencoded } = require('body-parser')
const express= require('express')
const { protect }=require('../auth/middleware')
const {addCaseAction,deleteCaseAction,editCaseAction,assignLawyerAction,getAssignedCasesAction,getAllCasesAction,changeCaseStatusAction}=require("../controllers/cases.controller");




const routes=express.Router()

routes.use(express.json())
routes.use(urlencoded({extended:true}))


routes.post("/addcase",protect,addCaseAction);
routes.delete("/deletecase/:caseid",protect,deleteCaseAction);
routes.put("/editcase/:caseid",protect,editCaseAction);
routes.get("/getallcases/:userid",protect,getAllCasesAction);
routes.put("/assignlawer/:caseid",protect,assignLawyerAction);
routes.get("/getassignedcases/:lawerid",protect,getAssignedCasesAction);
routes.put("/changecasestatus/:caseid",protect,changeCaseStatusAction);



module.exports=routes;