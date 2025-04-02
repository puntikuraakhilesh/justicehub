// import React, { useState } from "react";
// import { FiMessageCircle } from "react-icons/fi"; // Chat bubble icon

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div>
//       {/* Chat Bubble Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-500 text-white p-4 rounded-full shadow-lg transition-all"
//         style={{ zIndex: 1000 }}
//       >
//         <FiMessageCircle className="text-3xl" />
//       </button>

//       {/* Chatbot Popup */}
//       {isOpen && (
//         <div
//           className="fixed bottom-20 right-6 bg-white rounded-lg shadow-xl p-2"
//           style={{
//             width: "350px",
//             height: "500px",
//             zIndex: 999,
//             borderRadius: "10px",
//             boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
//           }}
//         >
//           {/* Close Button */}
//           <button
//             onClick={() => setIsOpen(false)}
//             className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
//           >
//             ✖
//           </button>

//           {/* Embedded Chatbot */}
//           <iframe
//             src="https://www.chatbase.co/chatbot-iframe/hyfjbAtmZEJTgIaopcD-y"
//             width="100%"
//             height="100%"
//             style={{ border: "none", borderRadius: "10px" }}
//             title="Chatbase Chatbot"
//           ></iframe>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;


// import React, { useState } from "react";
// import { FiMessageCircle } from "react-icons/fi"; // Chat bubble icon

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div>
//       {/* Chat Bubble Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-500 text-white p-4 rounded-full shadow-lg transition-all"
//         style={{ zIndex: 1000 }}
//       >
//         <FiMessageCircle className="text-4xl" />
//       </button>

//       {/* Chatbot Popup (Increased Size) */}
//       {isOpen && (
//         <div
//           className="fixed bottom-24 right-6 bg-white rounded-lg shadow-2xl p-2"
//           style={{
//             width: "400px", // Increased width
//             height: "550px", // Increased height
//             zIndex: 999,
//             borderRadius: "12px",
//             boxShadow: "0px 6px 15px rgba(0,0,0,0.15)",
//           }}
//         >
//           {/* Close Button */}
//           <button
//             onClick={() => setIsOpen(false)}
//             className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
//           >
//             ✖
//           </button>

//           {/* Embedded Chatbot */}
//           <iframe
//             src="https://www.chatbase.co/chatbot-iframe/hyfjbAtmZEJTgIaopcD-y"
//             width="100%"
//             height="100%"
//             style={{ border: "none", borderRadius: "12px" }}
//             title="Chatbase Chatbot"
//           ></iframe>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;





import React, { useState, useEffect } from "react";
import { FiMessageCircle } from "react-icons/fi";

const Chatbot = ({ username }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatKey, setChatKey] = useState(Date.now()); // Unique key to refresh chat

  // Refresh chat history when username changes
  useEffect(() => {
    setChatKey(Date.now()); // Generate a new key when a new user logs in
  }, [username]);

  return (
    <div>
      {/* Chat Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-500 text-white p-4 rounded-full shadow-lg transition-all"
        style={{ zIndex: 1000 }}
      >
        <FiMessageCircle className="text-4xl" />
      </button>

      {/* Chatbot Popup */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 bg-white rounded-lg shadow-2xl p-2"
          style={{
            width: "400px",
            height: "550px",
            zIndex: 999,
            borderRadius: "12px",
            boxShadow: "0px 6px 15px rgba(0,0,0,0.15)",
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
          >
            ✖
          </button>

          {/* Chatbot with Dynamic Key */}
          <iframe
            key={chatKey} // Refresh chat on username change
            src="https://www.chatbase.co/chatbot-iframe/hyfjbAtmZEJTgIaopcD-y"
            width="100%"
            height="100%"
            style={{ border: "none", borderRadius: "12px" }}
            title="Chatbase Chatbot"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
