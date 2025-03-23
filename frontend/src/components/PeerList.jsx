// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { List, ListItem, ListItemText, CircularProgress, Typography } from "@mui/material";

// const PeerList = ({ setSelectedPeer }) => {
//   const [peers, setPeers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPeers = async () => {
//       try {
//         const token = localStorage.getItem("token"); // Get auth token
//         const userId = localStorage.getItem("userId"); // Get user ID
        
//         if (!token || !userId) {
//           setError("Authentication error. Please log in again.");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(
//           `http://localhost:8800/api/peers/getuserpeers/${userId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         setPeers(response.data.peers || []);
//       } catch (err) {
//         console.error("Error fetching peers:", err);
//         setError("Failed to load peers.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPeers();
//   }, []);

//   return (
//     <List>
//       {/* Show Loading Spinner */}
//       {loading && <CircularProgress sx={{ display: "block", margin: "auto" }} />}

//       {/* Show Error Message */}
//       {error && <Typography color="error">{error}</Typography>}

//       {/* Show Peers List */}
//       {!loading && !error && peers.length > 0 ? (
//         peers.map((peer) => (
//           <ListItem button key={peer._id} onClick={() => setSelectedPeer(peer)}>
//             <ListItemText primary={peer.username}  />
//           </ListItem>
//         ))
//       ) : (
//         !loading && <Typography color="textSecondary">No peers available</Typography>
//       )}
//     </List>
//   );
// };

// export default PeerList;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { List, ListItem, ListItemText, CircularProgress, Typography } from "@mui/material";

// const PeerList = ({ setSelectedPeer }) => {
//   const [peers, setPeers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPeers = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         let userId = localStorage.getItem("userId");

//         if (!token || !userId) {
//           setError("Authentication error. Please log in again.");
//           setLoading(false);
//           return;
//         }

//         // Ensure userId is a valid ObjectId
//         if (userId === "null" || userId.length !== 24) {
//           console.error("Invalid userId:", userId);
//           setError("Invalid user session. Please re-login.");
//           setLoading(false);
//           return;
//         }

//         const response = await axios.get(
//           `http://localhost:8800/api/peers/getuserpeers/${userId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         setPeers(response.data.peers || []);
//       } catch (err) {
//         console.error("Error fetching peers:", err);
//         setError("Failed to load peers.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPeers();
//   }, []);

//   return (
//     <List>
//       {loading && <CircularProgress sx={{ display: "block", margin: "auto" }} />}
//       {error && <Typography color="error">{error}</Typography>}
//       {!loading && !error && peers.length > 0 ? (
//         peers.map((peer) => (
//           <ListItem button key={peer._id} onClick={() => setSelectedPeer(peer)}>
//             <ListItemText primary={peer.username} />
//           </ListItem>
//         ))
//       ) : (
//         !loading && <Typography color="textSecondary">No peers available</Typography>
//       )}
//     </List>
//   );
// };

// export default PeerList;




// src/components/PeerList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, ListItem, ListItemText, CircularProgress, Typography } from "@mui/material";

const PeerList = ({ setSelectedPeer }) => {
  const [peers, setPeers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPeers = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId || userId === "null" || userId.length !== 24) {
          setError("Invalid user session. Please re-login.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:8800/api/peers/getuserpeers/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPeers(response.data.peers || []);
      } catch (err) {
        console.error("Error fetching peers:", err);
        setError("Failed to load peers.");
      } finally {
        setLoading(false);
      }
    };

    fetchPeers();
  }, []);

  return (
    <List>
      {loading && <CircularProgress sx={{ display: "block", margin: "auto" }} />}
      {error && <Typography color="error">{error}</Typography>}
      
      {!loading && !error && peers.length > 0 ? (
        peers.map((peer) => (
          <ListItem button key={peer._id} onClick={() => setSelectedPeer(peer)}>
            <ListItemText primary={peer.username} />
          </ListItem>
        ))
      ) : (
        !loading && <Typography color="textSecondary">No peers available</Typography>
      )}
    </List>
  );
};

export default PeerList;
