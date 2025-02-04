import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import socket from "../socket";

const MessageInput = ({ selectedPeer, setMessages }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim() || !selectedPeer) return;
    
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `http://localhost:8800/api/messages/sendmessage/${selectedPeer._id}`,
        { message },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages((prev) => [...prev, res.data.newMessage]);
      socket.emit("sendMessage", res.data.newMessage);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Box display="flex" gap={2} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={sendMessage}>
        Send
      </Button>
    </Box>
  );
};

export default MessageInput;


// import React, { useState } from "react";
// import { TextField, Button } from "@mui/material";
// import axios from "axios";
// import socket from "../socket";

// const MessageInput = ({ selectedPeer, setMessages }) => {
//   const [message, setMessage] = useState("");

//   const sendMessage = async () => {
//     if (!message.trim()) return;

//     const senderId = localStorage.getItem("userId");
//     const recvid = selectedPeer?._id;

//     const newMessage = {
//       senderId,
//       receiverId: recvid,
//       message,
//     };

//     // Optimistically update UI before sending request
//     setMessages((prev) => [...prev, newMessage]);

//     try {
//       await axios.post(`http://localhost:8800/api/messages/send/${recvid}`, { message }, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });

//       // Emit message to server
//       socket.emit("sendMessage", newMessage);
//     } catch (error) {
//       console.error("Failed to send message:", error);
//     }

//     setMessage(""); // Clear input field
//   };

//   return (
//     <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
//       <TextField
//         fullWidth
//         variant="outlined"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message..."
//         onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//       />
//       <Button variant="contained" color="primary" onClick={sendMessage}>
//         Send
//       </Button>
//     </div>
//   );
// };

// export default MessageInput;
