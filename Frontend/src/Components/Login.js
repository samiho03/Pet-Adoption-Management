import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the custom CSS for styling

const Login = ({ onLoginSuccess }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/login', formData);
            
            // Log the full response to inspect its structure
            console.log(response.data);

            const { jwt, userRole } = response.data; // Assume the response contains jwt and userRole
            localStorage.setItem('token', jwt);
            localStorage.setItem('userRole', userRole); // Save user role in localStorage

            // Call the parent component's function to update the login state
            window.alert('Login successful!');
            onLoginSuccess(jwt, userRole); // Pass both token and role

            // Navigate based on user role
            if (userRole === 'ADMIN') {
                navigate('/PetDetailsForm'); // Admin panel
            } else {
                navigate('/UserForm'); // User form for regular users
            }
        } catch (error) {
            if (error.response) {
                setMessage(`Error: ${error.response.data.message || error.response.status}`);
            } else {
                setMessage('Error during login');
            }
        }
    };

    const navigateToSignup = () => {
        navigate('/signup');
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">Login to Your Account</h2>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn btn-primary submit-btn"
                 style={{  marginTop: '30px', backgroundColor: '#93775d', borderRadius: '10px', paddingLeft: '30px', paddingTop: '10px', paddingBottom: '10px', paddingRight: '30px' ,width:'100%' }}
                >
                    <h5>Login</h5>
                </button>

                {message && <p className="error-message">{message}</p>}

                <p className="signup-link">
                    Don't have an account?{' '}
                    <span onClick={navigateToSignup} className="signup-link-text">
                        Create an account
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;





