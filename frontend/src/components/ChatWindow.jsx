// import React, { useEffect, useState } from "react";
// import { Box, Typography, Paper } from "@mui/material";
// import MessageInput from "./MessageInput";
// import axios from "axios";
// import socket from "../socket";

// const ChatWindow = ({ selectedPeer }) => {
//   const [messages, setMessages] = useState([]);
//   const userId = localStorage.getItem("userId"); // Get logged-in user ID

//   useEffect(() => {
//     if (!selectedPeer) return;

//     const fetchMessages = async () => {
//       const token = localStorage.getItem("token");

//       try {
//         const res = await axios.get(`http://localhost:8800/api/messages/getmessages/${selectedPeer._id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setMessages(res.data);
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       }
//     };

//     fetchMessages();
//   }, [selectedPeer]);

//   useEffect(() => {
//     socket.on("newMessage", (message) => {
//       setMessages((prev) => [...prev, message]);
//     });

//     return () => socket.off("newMessage");
//   }, []);

//   return (
//     <Box display="flex" flexDirection="column" height="100%">
//       <Typography variant="h6" sx={{ mb: 2 }}>
//         Chat with {selectedPeer?.username || "Select a Peer"}
//       </Typography>
//       <Paper sx={{ flex: 1, overflowY: "auto", p: 2, display: "flex", flexDirection: "column" }}>
//         {messages.map((msg, index) => (
//           <Typography
//           key={index}
//           sx={{
//             my: 1,
//             textAlign: msg.senderId === userId ? "right" : "left",
//             backgroundColor: msg.senderId === userId ? "#1976d2" : "#f5f5f5",
//             color: msg.senderId === userId ? "#fff" : "#000",
//             padding: "8px 12px",
//             borderRadius: "10px",
//             maxWidth: "70%",
//             alignSelf: msg.senderId === userId ? "flex-end" : "flex-start",
//           }}
//         >
//           {msg.message}
//         </Typography>
        
//         ))}
//       </Paper>
//       <MessageInput selectedPeer={selectedPeer} setMessages={setMessages} />
//     </Box>
//   );
// };

// export default ChatWindow;



// import React, { useEffect, useState } from "react";
// import { Box, Typography, Paper } from "@mui/material";
// import MessageInput from "./MessageInput";
// import axios from "axios";
// import socket from "../socket";

// const ChatWindow = ({ selectedPeer }) => {
//   const [messages, setMessages] = useState([]);
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     if (!selectedPeer) return;

//     const fetchMessages = async () => {
//       const token = localStorage.getItem("token");

//       try {
//         const res = await axios.get(`http://localhost:8800/api/messages/getmessages/${selectedPeer._id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setMessages(res.data);
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       }
//     };

//     fetchMessages();
//   }, [selectedPeer]);

//   useEffect(() => {
//     socket.on("newMessage", (message) => {
//       setMessages((prev) => [...prev, message]);
//     });

//     return () => socket.off("newMessage");
//   }, []);

//   return (
//     <Box display="flex" flexDirection="column" height="100%">
//       <Typography variant="h6" sx={{ mb: 2 }}>
//         Chat with {selectedPeer?.username || "Select a Peer"}
//       </Typography>
//       <Paper sx={{ flex: 1, overflowY: "auto", p: 2 }}>
//         {messages.map((msg, index) => (
//           <Typography
//             key={index}
//             sx={{
//               my: 1,
//               textAlign: msg.senderId === userId ? "right" : "left",
//               color: msg.senderId === userId ? "blue" : "black",
//             }}
//           >
//             {msg.senderId === userId ? "You: " : `${selectedPeer?.username}: `}
//             {msg.message}
//           </Typography>
//         ))}
//       </Paper>
//       <MessageInput selectedPeer={selectedPeer} setMessages={setMessages} />
//     </Box>
//   );
// };

// export default ChatWindow;









import React, { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import MessageInput from "./MessageInput";
import axios from "axios";
import socket from "../socket";

const ChatWindow = ({ selectedPeer }) => {
  const [messages, setMessages] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!selectedPeer) return;

    const fetchMessages = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(
          `http://localhost:8800/api/messages/getmessages/${selectedPeer._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedPeer]);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.off("newMessage");
  }, []);

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      height="100%" 
      sx={{ p: 2, bgcolor: "#f5f5f5", borderRadius: "10px", boxShadow: 2 }}
    >
      <Typography variant="h6" sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}>
        Chat with {selectedPeer?.username || "Select a Peer"}
      </Typography>
      <Paper 
        sx={{ 
          flex: 1, 
          overflowY: "auto", 
          p: 2, 
          bgcolor: "#ffffff", 
          borderRadius: "10px" 
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: msg.senderId === userId ? "flex-end" : "flex-start",
              mb: 1,
            }}
          >
            <Typography
              sx={{
                p: "10px 15px",
                borderRadius: "10px",
                maxWidth: "60%",
                wordWrap: "break-word",
                bgcolor: msg.senderId === userId ? "#1976d2" : "#000",
                color: "#fff",
                fontSize: "14px",
              }}
            >
              {msg.message}
            </Typography>
          </Box>
        ))}
      </Paper>
      <MessageInput selectedPeer={selectedPeer} setMessages={setMessages} />
    </Box>
  );
};

export default ChatWindow;
