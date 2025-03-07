// import React from "react";
// import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import  AuthProvider  from "./pages/auth/AuthContext";
// // import NavbarComp from "./components/NavbarComp"; // Navbar component (if you have one)
// import Home from "./pages/Home";
// import AuthPage from "./pages/auth/AuthPage";
// import LawyerHome from "./pages/LawyerHome";
// import CitizenHome from "./pages/CitizenHome";
// import LawyerDetails from "./pages/LawyerDetails";
// import { SnackbarProvider } from 'notistack';
// // import { Toaster } from "react-hot-toast"; // For toast notifications
// import PageNotFound from "./pages/PageNotFound";
// import AddCaseCitizen from "./pages/citizenspecific/AddCaseCitizen";
// import MyCasesCitizen from "./pages/citizenspecific/MyCasesCitizen";
// import Lawyers from "./pages/common/Lawyers";
// import Chats from "./pages/common/Chats";



// const App = () => {
//   return (
//     <AuthProvider>
//       <SnackbarProvider maxSnack={1}>
//       <Router>
//         <div>
//          {/* Navbar
//          <NavbarComp /> */}

//           {/* App Routes */}
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/auth" element={<AuthPage />} />
//             <Route path="/lawyerhome" element={<LawyerHome/>} />
//             <Route path="/citizenhome" element={<CitizenHome/>} />
//             <Route path="/lawyerdetails" element={<LawyerDetails/>} />
//             <Route path="/addcasecitizen" element={<AddCaseCitizen/>} />
//             <Route path="/mycasescitizen" element={<MyCasesCitizen/>} />
//             <Route path="/lawyers" element={<Lawyers/>} />
//             <Route path="/chats" element={<Chats/>} />
//             <Route path="/*" element={<PageNotFound/>} />
//           </Routes>
//         </div>

//         {/* Toaster for Notifications
//         <Toaster position="top-center" reverseOrder={false} /> */}
//       </Router>
//       </SnackbarProvider>
//     </AuthProvider>
//   );
// };

// export default App;





// import React, { useContext } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AuthProvider, { AuthContext } from "./pages/auth/AuthContext";
// import CitizenNavBar from "./pages/navbars/CitizenNavBar";
// import LawyerNavBar from "./pages/navbars/LawyerNavBar";
// import { SnackbarProvider } from "notistack";

// // Pages
// import Home from "./pages/Home";
// import AuthPage from "./pages/auth/AuthPage";
// import LawyerDetails from "./pages/LawyerDetails";
// import PageNotFound from "./pages/PageNotFound";

// // Citizen Pages
// import CitizenHome from "./pages/CitizenHome";
// import AddCaseCitizen from "./pages/citizenspecific/AddCaseCitizen";
// import MyCasesCitizen from "./pages/citizenspecific/MyCasesCitizen";

// // Lawyer Pages
// import LawyerHome from "./pages/LawyerHome";
// import CasesLawyer from "./pages/lawyerspecific/CasesLawyer";

// // Common Pages
// import Lawyers from "./pages/common/Lawyers";
// import Chats from "./pages/common/Chats";

// const App = () => {
//   const { role } = useContext(AuthContext); // Access the user role (citizen/lawyer)

//   // Dynamically render the correct navbar
//   const renderNavBar = () => {
//     switch (role) {
//       case "citizen":
//         return <CitizenNavBar />;
//       case "lawyer":
//         return <LawyerNavBar />;
//       default:
//         return null; // No navbar for unauthenticated users
//     }
//   };

//   return (
//     <AuthProvider>
//       <SnackbarProvider maxSnack={3}>
//         <Router>
//           {/* Render Navbar based on user role */}
//           {renderNavBar()}

//           <div className="content-wrapper">
//             <Routes>
//               {/* General Routes */}
//               <Route path="/" element={<Home />} />
//               <Route path="/auth" element={<AuthPage />} />
//               <Route path="/lawyerdetails" element={<LawyerDetails />} />

//               {/* Citizen-Specific Routes */}
//               {role === "citizen" && (
//                 <>
//                   <Route path="/citizenhome" element={<CitizenHome />} />
//                   <Route path="/addcasecitizen" element={<AddCaseCitizen />} />
//                   <Route path="/mycasescitizen" element={<MyCasesCitizen />} />
//                   <Route path="/lawyers" element={<Lawyers />} />
//                   <Route path="/chats" element={<Chats />} />
//                 </>
//               )}

//               {/* Lawyer-Specific Routes */}
//               {role === "lawyer" && (
//                 <>
//                   <Route path="/lawyerhome" element={<LawyerHome />} />
//                   <Route path="/caseslawyer" element={<CasesLawyer />} />
//                   <Route path="/chats" element={<Chats />} />
//                 </>
//               )}

//               {/* Fallback Route */}
//               <Route path="/*" element={<PageNotFound />} />
//             </Routes>
//           </div>
//         </Router>
//       </SnackbarProvider>
//     </AuthProvider>
//   );
// };

// export default App;



// import React, { useContext } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AuthProvider, { AuthContext } from "./pages/auth/AuthContext";
// import CitizenNavBar from "./pages/navbars/CitizenNavBar";
// import LawyerNavBar from "./pages/navbars/LawyerNavBar";
// import { SnackbarProvider } from "notistack";

// // Pages
// import Home from "./pages/Home";
// import AuthPage from "./pages/auth/AuthPage";
// import LawyerDetails from "./pages/LawyerDetails";
// import PageNotFound from "./pages/PageNotFound";

// // Citizen Pages
// import CitizenHome from "./pages/CitizenHome";
// import AddCaseCitizen from "./pages/citizenspecific/AddCaseCitizen";
// import MyCasesCitizen from "./pages/citizenspecific/MyCasesCitizen";

// // Lawyer Pages
// import LawyerHome from "./pages/LawyerHome";
// import CasesLawyer from "./pages/lawyerspecific/CasesLawyer";

// // Common Pages
// import Lawyers from "./pages/common/Lawyers";
// import Chats from "./pages/common/Chats";

// const App = () => {
//   const { role } = useContext(AuthContext); // Access context

//   // Dynamically render the correct navbar based on user role
//   const renderNavBar = () => {
//     switch (role) {
//       case "citizen":
//         return <CitizenNavBar />;
//       case "lawyer":
//         return <LawyerNavBar />;
//       default:
//         return null; // No navbar for unauthenticated users
//     }
//   };

//   return (
//     <AuthProvider>
//       <SnackbarProvider maxSnack={3}>
//         <Router>
//           {/* Render Navbar based on user role */}
//           {renderNavBar()}

//           <div className="content-wrapper">
//             <Routes>
//               {/* General Routes */}
//               <Route path="/" element={<Home />} />
//               <Route path="/auth" element={<AuthPage />} />
//               <Route path="/lawyerdetails" element={<LawyerDetails />} />

//               {/* Citizen-Specific Routes */}
//               {role === "citizen" && (
//                 <>
//                   <Route path="/citizenhome" element={<CitizenHome />} />
//                   <Route path="/addcasecitizen" element={<AddCaseCitizen />} />
//                   <Route path="/mycasescitizen" element={<MyCasesCitizen />} />
//                   <Route path="/lawyers" element={<Lawyers />} />
//                   <Route path="/chats" element={<Chats />} />
//                 </>
//               )}

//               {/* Lawyer-Specific Routes */}
//               {role === "lawyer" && (
//                 <>
//                   <Route path="/lawyerhome" element={<LawyerHome />} />
//                   <Route path="/caseslawyer" element={<CasesLawyer />} />
//                   <Route path="/chats" element={<Chats />} />
//                 </>
//               )}

//               {/* Fallback Route */}
//               <Route path="/*" element={<PageNotFound />} />
//             </Routes>
//           </div>
//         </Router>
//       </SnackbarProvider>
//     </AuthProvider>
//   );
// };

// export default App;


import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider, { AuthContext } from "./pages/auth/AuthContext";
import CitizenNavBar from "./pages/navbars/CitizenNavBar";
import LawyerNavBar from "./pages/navbars/LawyerNavBar";
import { SnackbarProvider } from "notistack";

// Pages
import Home from "./pages/Home";
import AuthPage from "./pages/auth/AuthPage";
import LawyerDetails from "./pages/LawyerDetails";
import PageNotFound from "./pages/PageNotFound";

// Citizen Pages
import CitizenHome from "./pages/CitizenHome";
import AddCaseCitizen from "./pages/citizenspecific/AddCaseCitizen";
import MyCasesCitizen from "./pages/citizenspecific/MyCasesCitizen";

// Lawyer Pages
import LawyerHome from "./pages/LawyerHome";
import CasesLawyer from "./pages/lawyerspecific/CasesLawyer";

// Common Pages
import Lawyers from "./pages/common/Lawyers";
import Chats from "./pages/common/Chats";
import Profile from "./pages/lawyerspecific/Profile";
import LawyerDet from "./pages/common/LawyerDet";
import CaseDetails from "./pages/lawyerspecific/CaseDetails";
const App = () => {
  const { token, userId, isLoggedIn, username, role } = useContext(AuthContext); // Access context

  // Dynamically render the correct navbar based on user role
  const renderNavBar = () => {
    switch (role) {
      case "citizen":
        return <CitizenNavBar />;
      case "lawyer":
        return <LawyerNavBar />;
      default:
        return null; // No navbar for unauthenticated users
    }
  };

  return (
    <AuthProvider>
      <SnackbarProvider maxSnack={3}>
        <Router>
          {/* Render Navbar based on user role */}
          {renderNavBar()}

          <div className="content-wrapper">
            <Routes>
              {/* General Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/lawyerdetails" element={<LawyerDetails />} />

              {/* Citizen-Specific Routes */}
              {role === "citizen" && (
                <>
                  <Route path="/citizenhome" element={<CitizenHome />} />
                  <Route path="/addcasecitizen" element={<AddCaseCitizen />} />
                  <Route path="/mycasescitizen" element={<MyCasesCitizen />} />
                  <Route path="/lawyers" element={<Lawyers />} />
                  <Route path="/chats" element={<Chats />} />
                  <Route path="/lawyer/:id" element={<LawyerDet />} />
                </>
              )}

              {/* Lawyer-Specific Routes */}
              {role === "lawyer" && (
                <>
                  <Route path="/lawyerhome" element={<LawyerHome />} />
                  <Route path="/caseslawyer" element={<CasesLawyer />} />
                  <Route path="/profile" element={<Profile/>} />
                  <Route path="/chats" element={<Chats />} />
                  <Route path="/lawyers" element={<Lawyers />} />
                  <Route path="/lawyer/:id" element={<LawyerDet />} />
                  <Route path="/case-details/:caseId" element={<CaseDetails/>} />
                </>
              )}

              {/* Fallback Route */}
              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </div>
        </Router>
      </SnackbarProvider>
    </AuthProvider>
  );
};

export default App;
