//how to get the req.user check this video at 1:15:00 to 30 mins     https://www.youtube.com/watch?v=KGH6z0Z0GXA
//the detailed explantion is over in that video




const Message = require("../models/Message.model");
const Conversation = require("../models/Conversation.model");

const sendMessageAction = async (req, res) => {
    try {

        const senderId=req.user;//if not using this we can also use const{message,senderId}=req.body;
        const { recvid } = req.params;
        const {  message } = req.body;

        // Validate inputs
        if (!senderId || !recvid || !message) {
            return res.status(400).json({ message: "All fields (senderId, recvid, message) are required" });
        }

        // Find or create a conversation between sender and receiver
        let gotConversation = await Conversation.findOne({
            participants: { $all: [senderId, recvid] },
        });

        if (!gotConversation) {
            gotConversation = await Conversation.create({
                participants: [senderId, recvid],
            });
        }

        // Create a new message
        const newMessage = await Message.create({
            senderId,
            receiverId: recvid,
            message,
        });

        // Add the message to the conversation
        gotConversation.messages.push(newMessage._id);

        // Save the conversation and message
        await Promise.all([gotConversation.save(), newMessage.save()]);

        // Optional: Socket.io Integration (uncomment if applicable)
        // const receiverSocketId = getReceiverSocketId(recvid); 
        // if (receiverSocketId) {
        //     io.to(receiverSocketId).emit("newMessage", newMessage);
        // }

        // Respond with the new message
        return res.status(201).json({
            message: "Message sent successfully",
            newMessage,
        });
    } catch (error) {
        console.error("Error in sendMessageAction:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const getMessagesAction = async (req,res) => {
    try {
        const receiverId = req.params.recvid;
        const senderId = req.user;
        const conversation = await Conversation.findOne({
            participants:{$all : [senderId, receiverId]}
        }).populate("messages"); 

        // console.log(conversation);
        return res.status(200).json(conversation?.messages);
    } catch (error) {
        console.log(error);
    }
}


module.exports = { sendMessageAction,getMessagesAction };
