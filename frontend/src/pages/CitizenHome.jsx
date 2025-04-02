// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FiUser } from "react-icons/fi";

// const CitizenHome = () => {
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     const storedUsername = localStorage.getItem("username") || "Citizen";
//     setUsername(storedUsername);
//   }, []);

//   return (
//     <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-6">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="text-center max-w-5xl px-10 py-16 rounded-xl bg-gray-950 shadow-2xl border border-gray-700 w-full"
//       >
//         <div className="flex justify-center mb-6">
//           <FiUser className="text-7xl text-gray-300" />
//         </div>
//         <h1 className="text-6xl font-extrabold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent sm:text-8xl leading-tight">
//           Welcome to Justice Hub
//         </h1>
//         <p className="mt-6 text-3xl font-light text-gray-300 sm:text-4xl">
//           Hello, <span className="font-semibold text-white">{username}</span>! 
//           <br /> You are logged in as a <span className="text-blue-400">Citizen</span>.
//         </p>

//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.3, duration: 0.5 }}
//           className="mt-10"
//         >
//           <button className="px-10 py-4 text-2xl font-semibold rounded-full bg-blue-600 hover:bg-blue-500 transition shadow-lg">
//             Explore Cases
//           </button>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default CitizenHome;



// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FiUser } from "react-icons/fi";

// const CitizenHome = () => {
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     const storedUsername = localStorage.getItem("username") || "Citizen";
//     setUsername(storedUsername);
//   }, []);

//   return (
//     <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-6">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="text-center max-w-5xl px-10 py-16 rounded-xl bg-gray-950 shadow-2xl border border-gray-700 w-full"
//       >
//         <div className="flex justify-center mb-6">
//           <FiUser className="text-7xl text-gray-300" />
//         </div>
//         <h1 className="text-7xl font-extrabold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent sm:text-8xl leading-tight">
//           Welcome to Justice Hub
//         </h1>
//         <p className="mt-6 text-6xl font-semibold text-gray-100 sm:text-7xl">
//           Hello, <span className="text-5xl font-extrabold text-white">{username}</span>!  
//           <br /> You are logged in as a <span className="text-5xl font-extrabold text-blue-400">Citizen</span>.
//         </p>

//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.3, duration: 0.5 }}
//           className="mt-10"
//         >
//           <button className="px-10 py-4 text-3xl font-semibold rounded-full bg-blue-600 hover:bg-blue-500 transition shadow-lg">
//             My Cases
//           </button>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default CitizenHome;




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { motion } from "framer-motion";
import { FiUser } from "react-icons/fi";
import Chatbot from "./common/Chatbot";

const CitizenHome = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "Citizen";
    setUsername(storedUsername);
  }, []);

  return (<>
  <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-5xl px-10 py-16 rounded-xl bg-gray-950 shadow-2xl border border-gray-700 w-full"
      >
        <div className="flex justify-center mb-6">
          <FiUser className="text-7xl text-gray-300" />
        </div>
        <h1 className="text-7xl font-extrabold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent sm:text-8xl leading-tight">
          Welcome to Justice Hub
        </h1>
        <p className="mt-6 text-6xl font-semibold text-gray-100 sm:text-7xl">
          Hello, <span className="text-7xl font-extrabold text-white">{username}</span>!  
          <br /> You are logged in as a <span className="text-7xl font-extrabold text-blue-400">Citizen</span>.
        </p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10"
        >
          <button
            onClick={() => navigate("/mycasescitizen")} // Navigate on click
            className="px-10 py-4 text-3xl font-semibold rounded-full bg-blue-600 hover:bg-blue-500 transition shadow-lg"
          >
            My Cases
          </button>
        </motion.div>
      </motion.div>
    </div>
    <Chatbot username={username}/>
  </>
    
  );
};

export default CitizenHome;
