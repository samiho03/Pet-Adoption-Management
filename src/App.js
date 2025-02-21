import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PetDetailsForm from './Components/PetDetailsForm';
import DoctorDetails from './Components/DoctorDetails';
import EmployeeDetails from './Components/EmployeeDetails';
import Sidebar from './Components/Sidebar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import PetProfile from './Components/PetProfile';
import DocDecision from './Components/DocDecision';
import UserForm from './Components/UserForm'; // Import UserForm component
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // State to hold user role

  // Check if the user is already logged in (using JWT token in localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole'); // Get role from localStorage
    if (token) {
      setIsLoggedIn(true);
      setUserRole(role); // Set user role if token exists
    }
  }, []);

  // Function to handle login success
  const handleLoginSuccess = (token, role) => {
    setIsLoggedIn(true);
    setUserRole(role); // Set user role based on login response
    localStorage.setItem('token', token); // Store the JWT token
    console.log('Token saved:', token);
    console.log('User Role:', role);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('userRole'); // Remove user role from localStorage
  };

  // Function to protect routes and redirect to login if not authenticated
  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      {isLoggedIn ? (
        <div className="app-container">
          {userRole === 'ADMIN' ? ( // Check if the user is an admin
            <>
              <Sidebar onLogout={handleLogout} />
              <div className="content">
                <Routes>
                  <Route path="/PetDetailsForm" element={<PrivateRoute><PetDetailsForm /></PrivateRoute>} />
                  <Route path="/PetProfile" element={<PrivateRoute><PetProfile /></PrivateRoute>} />
                  <Route path="/DocDecision" element={<PrivateRoute><DocDecision /></PrivateRoute>} />
                  <Route path="/DoctorDetails" element={<PrivateRoute><DoctorDetails /></PrivateRoute>} />
                  <Route path="/EmployeeDetails" element={<PrivateRoute><EmployeeDetails /></PrivateRoute>} />
                  <Route path="*" element={<Navigate to="/PetDetailsForm" />} />
                </Routes>
              </div>
            </>
          ) : (
            // Render UserForm for regular users
            <div className="content">
              <Routes>
                <Route path="/UserForm" element={<PrivateRoute><UserForm onLogout={handleLogout} /></PrivateRoute>} />
                <Route path="*" element={<Navigate to="/UserForm" />} />
              </Routes>
            </div>
          )}
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;








// import React, { useState, useEffect } from 'react'; 
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import PetDetailsForm from './Components/PetDetailsForm';
// import DoctorDetails from './Components/DoctorDetails';
// import EmployeeDetails from './Components/EmployeeDetails';
// import Sidebar from './Components/Sidebar';
// import Login from './Components/Login';
// import Signup from './Components/Signup';
// import PetProfile from './Components/PetProfile';
// import DocDecision from './Components/DocDecision';
// import './App.css';

// const App = () => {
//   // Manage the login status in state
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Check if the user is already logged in (using JWT token in localStorage)
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       // Optionally, validate token here (e.g., using axios to call an API endpoint)
//       setIsLoggedIn(true);
//     }
//   }, []);

//   // Function to handle login success
//   const handleLoginSuccess = (token) => {
//     setIsLoggedIn(true);
//     localStorage.setItem('token', token); // Store the JWT token
//     console.log('Token saved:', token);
//   };

//   // Function to handle logout
//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     localStorage.removeItem('token'); // Remove token from localStorage
//   };

//   // Function to protect routes and redirect to login if not authenticated
//   const PrivateRoute = ({ children }) => {
//     const token = localStorage.getItem('token');
//     return token ? children : <Navigate to="/login" />;
//   };

//   return (
//     <Router>
//       {/* Conditionally render based on login status */}
//       {isLoggedIn ? (
//         <div className="app-container">
//           <Sidebar onLogout={handleLogout} /> {/* Pass the handleLogout function to Sidebar */}
//           <div className="content">
//             <Routes>
//               {/* Protect routes using PrivateRoute */}
//               <Route 
//                 path="/PetDetailsForm" 
//                 element={
//                   <PrivateRoute>
//                     <PetDetailsForm />
//                   </PrivateRoute>
//                 } 
//               />
//               <Route 
//                 path="/PetProfile" 
//                 element={
//                   <PrivateRoute>
//                     <PetProfile />
//                   </PrivateRoute>
//                 } 
//               />
//               <Route 
//                 path="/DocDecision" 
//                 element={
//                   <PrivateRoute>
//                     <DocDecision />
//                   </PrivateRoute>
//                 } 
//               />
//               <Route 
//                 path="/DoctorDetails" 
//                 element={
//                   <PrivateRoute>
//                     <DoctorDetails />
//                   </PrivateRoute>
//                 } 
//               />
//               <Route 
//                 path="/EmployeeDetails" 
//                 element={
//                   <PrivateRoute>
//                     <EmployeeDetails />
//                   </PrivateRoute>
//                 } 
//               />
//               {/* Default route to redirect to the PetDetailsForm */}
//               <Route path="*" element={<Navigate to="/PetDetailsForm" />} />
//             </Routes>
//           </div>
//         </div>
//       ) : (
//         <Routes>
//           <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
//           <Route path="/signup" element={<Signup />} />
//           {/* Redirect to login if user tries to access an unknown route while not authenticated */}
//           <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//       )}
//     </Router>
//   );
// };

// export default App;



// import React, { useState, useEffect } from 'react'; 
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import PetDetailsForm from './Components/PetDetailsForm';
// import DoctorDetails from './Components/DoctorDetails';
// import PetCare from './Components/EmployeeDetails';
// import UserForm from './Components/UserForm';
// import Sidebar from './Components/Sidebar';
// import Login from './Components/Login';
// import Signup from './Components/Signup';
// import './App.css';
// import PetProfile from './Components/PetProfile';
// import EmployeeDetails from './Components/EmployeeDetails';
// import DocDecision from './Components/DocDecision';

// const App = () => {
//   // Manage the login status in state
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Check if the user is already logged in (using localStorage or a token)
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setIsLoggedIn(true); // Assume the user is logged in if the token exists
//     }
//   }, []);

//   // Function to handle login
//   const handleLoginSuccess = () => {
//     setIsLoggedIn(true);  // Set the state to true when login is successful
//     localStorage.setItem('token', 'your-login-token'); // Store token
//   };

//   // Function to handle logout
//   const handleLogout = () => {
//     setIsLoggedIn(false); // Update login state
//     localStorage.removeItem('token'); // Remove token from localStorage
//   };

//   return (
//     <Router>
//       {/* Conditionally render based on login status */}
//       {isLoggedIn ? (
//         <div className="app-container">
//           <Sidebar onLogout={handleLogout} /> {/* Pass the handleLogout function to Sidebar */}
//           <div className="content">
//             <Routes>
//               <Route path="/PetDetailsForm" element={<PetDetailsForm />} />
//               <Route path="/PetProfile" element={<PetProfile />} />
//               <Route path="/DocDecision" element={<DocDecision />} />
//               <Route path="/DoctorDetails" element={<DoctorDetails />} />
//               <Route path="/EmployeeDetails" element={<EmployeeDetails />} />
//               {/* Redirect to PetDetailsForm for unknown routes */}
//               <Route path="*" element={<Navigate to="/PetDetailsForm" />} />
//             </Routes>
//           </div>
//         </div>
//       ) : (
//         <Routes>
//           <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
//           <Route path="/signup" element={<Signup />} />
//           {/* Redirect to login for unknown routes */}
//           <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//       )}
//     </Router>
//   );
// };

// export default App;



// import React from 'react'; 
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import PetDetailsForm from './Components/PetDetailsForm';
// import DoctorDetails from './Components/DoctorDetails';
// import UserForm from './Components/UserForm';
// import Sidebar from './Components/Sidebar';
// import Login from './Components/Login';
// import Signup from './Components/Signup';
// import './App.css';
// import PetProfile from './Components/PetProfile';
// import EmployeeDetails from './Components/EmployeeDetails';
// import DocDecision from './Components/DocDecision';

// const App = () => {
//   return (
//     <Router>
//       <div className="app-container">
//         <Sidebar />
//         <div className="content">
//           <Routes>
//             <Route path="/PetDetailsForm" element={<PetDetailsForm />} />
//             <Route path="/PetProfile" element={<PetProfile />} />
//             <Route path="/DocDecision" element={<DocDecision />} />
//             <Route path="/DoctorDetails" element={<DoctorDetails />} />
//             <Route path="/EmployeeDetails" element={<EmployeeDetails />} />
//             {/* Redirect root to a default route */}
//             <Route path="/PeDetailsForm" element={<Navigate to="/PetDetailsForm" />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;

