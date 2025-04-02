



import React, { useState, useEffect } from "react";
import { FiMessageCircle } from "react-icons/fi";

const Chatbot = ({ username }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatKey, setChatKey] = useState(Date.now()); 


  useEffect(() => {
    setChatKey(Date.now()); 
  }, [username]);

  return (
    <div>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-500 text-white p-4 rounded-full shadow-lg transition-all"
        style={{ zIndex: 1000 }}
      >
        <FiMessageCircle className="text-4xl" />
      </button>

      
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
         
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
          >
            ✖
          </button>

          
          <iframe
            key={chatKey} 
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
