import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import  AuthProvider  from "./pages/auth/AuthContext";
// import NavbarComp from "./components/NavbarComp"; // Navbar component (if you have one)
import Home from "./pages/Home";
import AuthPage from "./pages/auth/AuthPage";
import LawyerHome from "./pages/LawyerHome";
import CitizenHome from "./pages/CitizenHome";
import LawyerDetails from "./pages/LawyerDetails";
import { SnackbarProvider } from 'notistack';
// import { Toaster } from "react-hot-toast"; // For toast notifications




const App = () => {
  return (
    <AuthProvider>
      <SnackbarProvider maxSnack={1}>
      <Router>
        <div>
         {/* Navbar
         <NavbarComp /> */}

          {/* App Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/lawyerhome" element={<LawyerHome/>} />
            <Route path="/citizenhome" element={<CitizenHome/>} />
            <Route path="/lawyerdetails" element={<LawyerDetails/>} />
          </Routes>
        </div>

        {/* Toaster for Notifications
        <Toaster position="top-center" reverseOrder={false} /> */}
      </Router>
      </SnackbarProvider>
    </AuthProvider>
  );
};

export default App;
