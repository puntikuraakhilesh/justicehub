const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');



const authRoute = require("./routes/auth.route");
const lawyerRoute=require("./routes/lawyer.route");
const casesRoute=require("./routes/cases.route");
const peersRoute=require("./routes/peers.route");
const messageRoute=require("./routes/message.route");



dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));




app.use("/api/auth", authRoute);
app.use("/api/lawyerdetails",lawyerRoute);
app.use("/api/cases",casesRoute);
app.use("/api/peers",peersRoute);
app.use("/api/messages",messageRoute);



const PORT = process.env.PORT || 8800;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/",(req,res)=>{
    res.json("Server working fine")
})