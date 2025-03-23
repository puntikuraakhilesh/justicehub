// 
const { urlencoded } = require("body-parser");
const express = require("express");
const { protect } = require("../auth/middleware");
const { sendMessageAction, getMessagesAction } = require("../controllers/message.controller");

const routes = express.Router();

routes.use(express.json());
routes.use(urlencoded({ extended: true }));

routes.post("/sendmessage/:recvid", protect, sendMessageAction);
routes.get("/getmessages/:recvid", protect, getMessagesAction);

module.exports = routes;
