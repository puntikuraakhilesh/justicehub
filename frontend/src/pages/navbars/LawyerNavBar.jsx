import { motion } from "framer-motion";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import axios from "axios";
import { useSnackbar } from 'notistack';

const tabs = [
  { name: "Home", href: "/lawyerhome" },
  { name: "Profile", href: "/profile" },
  { name: "Cases", href: "/caseslawyer" },
  { name: "Lawyers", href: "/lawyers" },
  { name: "Chats", href: "/chats" },
];

const LawyerNavBar = () => {
  const [selected, setSelected] = useState(tabs[0].name);
  const navigate = useNavigate();
  const { logout, token } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const showToast = (message, variant = "info") => {
    enqueueSnackbar(message, { variant });
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:8800/api/auth/logout',
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      logout();
      navigate('/auth');        
      window.location.reload();
      showToast("Logged Out successfully!", "success");
    } catch (err) {
      console.error(err);
      showToast("Error Logging Out!", "error");
    }
  };

  return (
    <div className="px-4 py-1 bg-black flex items-center flex-wrap gap-2">
      {/* Navigation tabs */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <Chip
            key={tab.name}
            text={tab.name}
            href={tab.href}
            selected={selected === tab.name}
            setSelected={setSelected}
          />
        ))}
      </div>
      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="ml-auto text-sm font-semibold text-gray-400 hover:text-gray-200 hover:bg-gray-800 px-3 py-1 rounded-md transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

const Chip = ({ text, href, selected, setSelected }) => {
  return (
    <Link
      to={href}
      onClick={() => setSelected(text)}
      className={`${
        selected
          ? "text-white"
          : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
      } text-sm transition-colors px-3 py-1 rounded-md relative`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-gray-700 rounded-md"
        ></motion.span>
      )}
    </Link>
  );
};

export default LawyerNavBar;
