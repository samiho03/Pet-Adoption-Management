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




