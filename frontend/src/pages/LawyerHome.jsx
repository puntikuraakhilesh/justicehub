// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FiBriefcase } from "react-icons/fi";
// import LawyerNavBar from "./navbars/LawyerNavBar";

// const LawyerHome = () => {
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     const storedUsername = localStorage.getItem("username") || "Lawyer";
//     setUsername(storedUsername);
//   }, []);

//   return (
//     <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 to-black text-white">

//       {/* Main Section */}
//       <div className="flex flex-grow items-center justify-center px-6">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="text-center max-w-5xl px-10 py-16 rounded-xl bg-gray-950 shadow-2xl border border-gray-700 w-full"
//         >
//           <div className="flex justify-center mb-6">
//             <FiBriefcase className="text-7xl text-gray-300" />
//           </div>
//           <h1 className="text-7xl font-extrabold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent sm:text-8xl leading-tight">
//             Welcome to Justice Hub
//           </h1>
//           <p className="mt-6 text-6xl font-semibold text-gray-100 sm:text-7xl">
//             Hello, <span className="text-7xl font-extrabold text-white">{username}</span>!  
//             <br /> You are logged in as a <span className="text-7xl font-extrabold text-green-400">Lawyer</span>.
//           </p>

//           <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.5 }}
//             className="mt-10"
//           >
//             <button className="px-10 py-4 text-3xl font-semibold rounded-full bg-green-600 hover:bg-green-500 transition shadow-lg">
//               My Cases
//             </button>
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default LawyerHome;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { motion } from "framer-motion";
import { FiBriefcase } from "react-icons/fi";
import LawyerNavBar from "./navbars/LawyerNavBar";
import Chatbot from "./common/Chatbot";

const LawyerHome = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "Lawyer";
    setUsername(storedUsername);
  }, []);

  return (<>
  <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 to-black text-white">
     

     {/* Main Section */}
     <div className="flex flex-grow items-center justify-center px-6">
       <motion.div
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.6, ease: "easeOut" }}
         className="text-center max-w-5xl px-10 py-16 rounded-xl bg-gray-950 shadow-2xl border border-gray-700 w-full"
       >
         <div className="flex justify-center mb-6">
           <FiBriefcase className="text-7xl text-gray-300" />
         </div>
         <h1 className="text-7xl font-extrabold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent sm:text-8xl leading-tight">
           Welcome to Justice Hub
         </h1>
         <p className="mt-6 text-6xl font-semibold text-gray-100 sm:text-7xl">
           Hello, <span className="text-7xl font-extrabold text-white">{username}</span>!  
           <br /> You are logged in as a <span className="text-7xl font-extrabold text-green-400">Lawyer</span>.
         </p>

         <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.3, duration: 0.5 }}
           className="mt-10"
         >
           <button
             onClick={() => navigate("/caseslawyer")} // Navigate on click
             className="px-10 py-4 text-3xl font-semibold rounded-full bg-green-600 hover:bg-green-500 transition shadow-lg"
           >
             My Cases
           </button>
         </motion.div>
       </motion.div>
     </div>
   </div>
   <Chatbot username={username}/>
  </>
    
  );
};

export default LawyerHome;
