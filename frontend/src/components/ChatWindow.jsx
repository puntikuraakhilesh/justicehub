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






// src/components/ChatWindow.js
// import React, { useEffect, useState } from "react";
// import { Box, Typography, CircularProgress } from "@mui/material";
// import MessageInput from "./MessageInput";
// import axios from "axios";
// import socket from "../socket";

// const ChatWindow = ({ selectedPeer }) => {
//   const [messages, setMessages] = useState([]); // Always initialized as an array
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (!selectedPeer) return;

//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `http://localhost:8800/api/messages/getmessages/${selectedPeer._id}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         const fetchedMessages = response.data.messages || [];
//         setMessages(Array.isArray(fetchedMessages) ? fetchedMessages : []); // Ensure array
//       } catch (err) {
//         console.error("Error fetching messages:", err);
//         setError("Failed to load messages.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMessages();

//     socket.on("receiveMessage", (newMessage) => {
//       setMessages((prev) => [...prev, newMessage]);
//     });

//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [selectedPeer]);

//   if (!selectedPeer) {
//     return <Typography>Select a peer to start chatting.</Typography>;
//   }

//   return (
//     <Box sx={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
//       {loading && <CircularProgress />}
//       {error && <Typography color="error">{error}</Typography>}
//       {messages.length > 0 ? (
//         messages.map((msg) => (
//           <Box key={msg._id} sx={{ marginBottom: "0.5rem" }}>
//             <Typography variant="body1">
//               <strong>{msg.senderId === selectedPeer._id ? "Them" : "You"}:</strong> {msg.message}
//             </Typography>
//           </Box>
//         ))
//       ) : (
//         !loading && <Typography>No messages yet.</Typography>
//       )}
//       <MessageInput selectedPeer={selectedPeer} setMessages={setMessages} />
//     </Box>
//   );
// };

// export default ChatWindow;









// src/components/ChatWindow.jsx
// import React, { useEffect, useState } from "react";
// import { Box, Typography, CircularProgress } from "@mui/material";
// import MessageInput from "./MessageInput";
// import axios from "axios";
// import socket from "../socket";

// const ChatWindow = ({ selectedPeer }) => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!selectedPeer) return;

//     const fetchMessages = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `http://localhost:8800/api/messages/getmessages/${selectedPeer._id}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         setMessages(Array.isArray(response.data) ? response.data : []);
//       } catch (err) {
//         console.error("Error fetching messages:", err);
//         setError("Failed to load messages.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMessages();

//     // Listen for new incoming messages
//     socket.on("receiveMessage", (newMessage) => {
//       setMessages((prev) => [...prev, newMessage]);
//     });

//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [selectedPeer]);

//   if (!selectedPeer) {
//     return <Typography variant="h6">Please select a peer to start chatting.</Typography>;
//   }

//   return (
//     <Box sx={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
//       {loading && <CircularProgress />}
//       {error && <Typography color="error">{error}</Typography>}
      
//       {messages.length > 0 ? (
//         messages.map((msg) => (
//           <Box key={msg._id} sx={{ marginBottom: "0.5rem" }}>
//             <Typography variant="body1">
//               <strong>{msg.senderId === selectedPeer._id ? "Them" : "You"}:</strong> {msg.message}
//             </Typography>
//           </Box>
//         ))
//       ) : (
//         !loading && <Typography>No messages yet.</Typography>
//       )}

//       <MessageInput selectedPeer={selectedPeer} setMessages={setMessages} />
//     </Box>
//   );
// };

// export default ChatWindow;









// import React, { useEffect, useState } from "react";
// import { Box, Typography, CircularProgress, Paper } from "@mui/material";
// import MessageInput from "./MessageInput";
// import axios from "axios";
// import socket from "../socket";

// const ChatWindow = ({ selectedPeer }) => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const userId = localStorage.getItem("userId"); // Logged-in user's ID

//   useEffect(() => {
//     if (!selectedPeer) {
//       setMessages([]); // Clear messages when no peer is selected
//       return;
//     }

//     const fetchMessages = async () => {
//       setLoading(true);
//       setError(null); // Reset error on each fetch

//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `http://localhost:8800/api/messages/getmessages/${selectedPeer._id}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         // Ensure response is an array
//         setMessages(Array.isArray(response.data) ? response.data : []);
//       } catch (err) {
//         console.error("Error fetching messages:", err);
//         setError("Failed to load messages.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMessages();

//     // Listen for incoming messages in real-time
//     socket.on("receiveMessage", (newMessage) => {
//       if (newMessage.senderId === selectedPeer._id || newMessage.receiverId === selectedPeer._id) {
//         setMessages((prev) => [...prev, newMessage]);
//       }
//     });

//     // Cleanup listener on component unmount or peer change
//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [selectedPeer]);

//   if (!selectedPeer) {
//     return <Typography variant="h6">Please select a peer to start chatting.</Typography>;
//   }

//   return (
//     <Box
//       display="flex"
//       flexDirection="column"
//       height="100%"
//       sx={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}
//     >
//       <Typography variant="h6" sx={{ mb: 2 }}>
//         Chat with {selectedPeer?.username || "Unknown"}
//       </Typography>

//       <Paper
//         sx={{
//           flex: 1,
//           overflowY: "auto",
//           padding: "1rem",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         {loading && <CircularProgress />}
//         {error && <Typography color="error">{error}</Typography>}

//         {messages.length > 0 ? (
//           messages.map((msg) => (
//             <Typography
//               key={msg._id}
//               sx={{
//                 my: 1,
//                 textAlign: msg.senderId === userId ? "right" : "left",
//                 backgroundColor: msg.senderId === userId ? "#1976d2" : "#f5f5f5",
//                 color: msg.senderId === userId ? "#fff" : "#000",
//                 padding: "8px 12px",
//                 borderRadius: "10px",
//                 maxWidth: "70%",
//                 alignSelf: msg.senderId === userId ? "flex-end" : "flex-start",
//               }}
//             >
//               {msg.message}
//             </Typography>
//           ))
//         ) : (
//           !loading && <Typography>No messages yet.</Typography>
//         )}
//       </Paper>

//       <MessageInput selectedPeer={selectedPeer} setMessages={setMessages} />
//     </Box>
//   );
// };

// export default ChatWindow;








import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import MessageInput from "./MessageInput";
import axios from "axios";
import socket from "../socket";

const ChatWindow = ({ selectedPeer }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId"); // Logged-in user's ID

  useEffect(() => {
    if (!selectedPeer) {
      setMessages([]); // Clear previous messages when no peer is selected
      setLoading(false);
      setError(null);
      return;
    }

    const fetchMessages = async () => {
      setLoading(true);
      setMessages([]);
      setError(null);
    
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found.");
        }
    
        if (!selectedPeer?._id) {
          throw new Error("Invalid peer selected.");
        }
    
        const response = await axios.get(
          `http://localhost:8800/api/messages/getmessages/${selectedPeer._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
    
        const fetchedMessages = Array.isArray(response.data) ? response.data : [];
        setMessages(fetchedMessages);
      } catch (err) {
        console.error("Error fetching messages:", err.response ? err.response.data : err.message);
        setError(
          err.response?.data?.message || "Failed to load messages. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
    

    fetchMessages();

    socket.on("receiveMessage", (newMessage) => {
      if (
        newMessage.senderId === selectedPeer._id ||
        newMessage.receiverId === selectedPeer._id
      ) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [selectedPeer]);

  if (!selectedPeer) {
    return <Typography variant="h6">Please select a peer to start chatting.</Typography>;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      sx={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Chat with {selectedPeer?.username || "Unknown"}
      </Typography>

      <Paper
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {loading && <CircularProgress />}
        {error && !loading && <Typography color="error">{error}</Typography>}

        {!loading && !error && messages.length > 0 ? (
          messages.map((msg) => (
            <Typography
              key={msg._id}
              sx={{
                my: 1,
                textAlign: msg.senderId === userId ? "right" : "left",
                backgroundColor: msg.senderId === userId ? "#1976d2" : "#f5f5f5",
                color: msg.senderId === userId ? "#fff" : "#000",
                padding: "8px 12px",
                borderRadius: "10px",
                maxWidth: "70%",
                alignSelf: msg.senderId === userId ? "flex-end" : "flex-start",
              }}
            >
              {msg.message}
            </Typography>
          ))
        ) : (
          !loading && <Typography>No messages yet.</Typography>
        )}
      </Paper>

      <MessageInput selectedPeer={selectedPeer} setMessages={setMessages} />
    </Box>
  );
};

export default ChatWindow;
