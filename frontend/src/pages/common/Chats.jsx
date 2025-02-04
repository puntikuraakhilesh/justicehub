import React, { useEffect, useState } from "react";
import { Grid, Paper } from "@mui/material";
import PeerList from "../../components/PeerList";
import ChatWindow from "../../components/ChatWindow";
import axios from "axios";

const Chats = () => {
  const [peers, setPeers] = useState([]);
  const [selectedPeer, setSelectedPeer] = useState(null);

  useEffect(() => {
    const fetchPeers = async () => {
      const userId = localStorage.getItem("uid");
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(`http://localhost:8800/api/peers/getuserpeers/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPeers(res.data.peers);
      } catch (error) {
        console.error("Error fetching peers:", error);
      }
    };

    fetchPeers();
  }, []);

  return (
    <Grid container spacing={2} style={{ height: "100vh", padding: "20px" }}>
      <Grid item xs={3}>
        <Paper style={{ height: "100%", padding: "10px" }}>
          <PeerList peers={peers} setSelectedPeer={setSelectedPeer} />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <Paper style={{ height: "100%", padding: "10px" }}>
          <ChatWindow selectedPeer={selectedPeer} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Chats;
