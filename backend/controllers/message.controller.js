
const Message = require("../models/Message.model");
const Conversation = require("../models/Conversation.model");
const mongoose = require("mongoose");

const sendMessageAction = async (req, res) => {
  try {
    const senderId = req.user; // Comes from protect middleware
    const { recvid } = req.params;
    const { message } = req.body;

    // Validate IDs and message content
    if (!mongoose.Types.ObjectId.isValid(senderId)) {
      return res.status(400).json({ message: "Invalid sender ID." });
    }
    if (!mongoose.Types.ObjectId.isValid(recvid)) {
      return res.status(400).json({ message: "Invalid receiver ID." });
    }
    if (!message || message.trim() === "") {
      return res.status(400).json({ message: "Message content cannot be empty." });
    }

    // Find or create the conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recvid] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recvid],
      });
    }

    // Create new message
    const newMessage = await Message.create({
      senderId,
      receiverId: recvid,
      message,
    });

    // Link message to conversation
    conversation.messages.push(newMessage._id);
    await conversation.save();

    // Emit message to both sender and receiver
    const io = req.app.get("io");
    if (io) {
      io.to(senderId.toString()).emit("newMessage", newMessage);
      io.to(recvid.toString()).emit("newMessage", newMessage);
    }

    res.status(201).json({
      message: "Message sent successfully",
      newMessage,
    });
  } catch (error) {
    console.error("Error in sendMessageAction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getMessagesAction = async (req, res) => {
    try {
      const senderId = req.user;
      const { recvid } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(recvid)) {
        return res.status(400).json({ message: "Invalid sender or receiver ID." });
      }
  
      const conversation = await Conversation.findOne({
        participants: { $all: [senderId, recvid] },
      }).populate("messages");
  
      if (!conversation) {
        return res.status(404).json({ message: "No conversation found." });
      }
  
      res.status(200).json(conversation.messages || []);
    } catch (error) {
      console.error("Error in getMessagesAction:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
module.exports = { sendMessageAction ,getMessagesAction};








































//how to get the req.user check this video at 1:15:00 to 30 mins     https://www.youtube.com/watch?v=KGH6z0Z0GXA
//the detailed explantion is over in that video

// const sendMessageAction = async (req, res) => {
//     try {

//         const senderId=req.user;//if not using this we can also use const{message,senderId}=req.body;
//         const { recvid } = req.params;
//         const {  message } = req.body;

//         // Validate inputs
//         if (!senderId || !recvid || !message) {
//             return res.status(400).json({ message: "All fields (senderId, recvid, message) are required" });
//         }

//         // Find or create a conversation between sender and receiver
//         let gotConversation = await Conversation.findOne({
//             participants: { $all: [senderId, recvid] },
//         });

//         if (!gotConversation) {
//             gotConversation = await Conversation.create({
//                 participants: [senderId, recvid],
//             });
//         }

//         // Create a new message
//         const newMessage = await Message.create({
//             senderId,
//             receiverId: recvid,
//             message,
//         });

//         // Add the message to the conversation
//         gotConversation.messages.push(newMessage._id);

//         // Save the conversation and message
//         await Promise.all([gotConversation.save(), newMessage.save()]);

//         // Optional: Socket.io Integration (uncomment if applicable)
//         const receiverSocketId = getReceiverSocketId(recvid); 
//         if (receiverSocketId) {
//             io.to(receiverSocketId).emit("newMessage", newMessage);
//         }

//         // Respond with the new message
//         return res.status(201).json({
//             message: "Message sent successfully",
//             newMessage,
//         });
//     } catch (error) {
//         console.error("Error in sendMessageAction:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

// const sendMessageAction = async (req, res) => {
//     try {
//         const senderId = req.user; // Get sender from middleware
//         const { recvid } = req.params;
//         const { message } = req.body;

//         if (!senderId || !recvid || !message) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         let conversation = await Conversation.findOne({
//             participants: { $all: [senderId, recvid] },
//         });

//         if (!conversation) {
//             conversation = await Conversation.create({
//                 participants: [senderId, recvid],
//             });
//         }

//         const newMessage = await Message.create({
//             senderId,
//             receiverId: recvid,
//             message,
//         });

//         conversation.messages.push(newMessage._id);
//         await Promise.all([conversation.save(), newMessage.save()]);

//         // Emit the message to both sender and receiver
//         const io = req.app.get("io"); // Access socket instance
//         io.to(senderId.toString()).emit("newMessage", newMessage);
//         io.to(recvid.toString()).emit("newMessage", newMessage);

//         res.status(201).json({
//             message: "Message sent successfully",
//             newMessage,
//         });
//     } catch (error) {
//         console.error("Error in sendMessageAction:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };












// const Message = require("../models/Message.model");
// const Conversation = require("../models/Conversation.model");
// const mongoose = require('mongoose');


// const sendMessageAction = async (req, res) => {
//     try {
//         const senderId = req.user;
//         const { recvid } = req.params;
//         const { message } = req.body;

//         // Validate sender and receiver IDs
//         if (!senderId || senderId === "null" || !mongoose.Types.ObjectId.isValid(senderId)) {
//             return res.status(400).json({ message: "Invalid sender ID." });
//         }

//         if (!recvid || recvid === "null" || !mongoose.Types.ObjectId.isValid(recvid)) {
//             return res.status(400).json({ message: "Invalid receiver ID." });
//         }

//         let conversation = await Conversation.findOne({
//             participants: { $all: [senderId, recvid] },
//         });

//         if (!conversation) {
//             conversation = await Conversation.create({
//                 participants: [senderId, recvid],
//             });
//         }

//         const newMessage = await Message.create({
//             senderId,
//             receiverId: recvid,
//             message,
//         });

//         conversation.messages.push(newMessage._id);
//         await conversation.save();

//         // Emit message to both sender and receiver
//         const io = req.app.get("io");
//         if (io) {
//             io.to(senderId.toString()).emit("newMessage", newMessage);
//             io.to(recvid.toString()).emit("newMessage", newMessage);
//         } else {
//             console.error("Socket.io instance is missing");
//         }

//         res.status(201).json({
//             message: "Message sent successfully",
//             newMessage,
//         });
//     } catch (error) {
//         console.error("Error in sendMessageAction:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };




// const getMessagesAction = async (req,res) => {
//     try {
//         const receiverId = req.params.recvid;
//         const senderId = req.user;
//         const conversation = await Conversation.findOne({
//             participants:{$all : [senderId, receiverId]}
//         }).populate("messages"); 

//         // console.log(conversation);
//         return res.status(200).json(conversation?.messages);
//     } catch (error) {
//         console.log(error);
//     }
// }


// module.exports = { sendMessageAction,getMessagesAction };





