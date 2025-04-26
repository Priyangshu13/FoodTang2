/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'; 
import "./Signup.css";
import { handleError, handleSuccess } from '../../utils';

const Signup = () => {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: ' ',
        password: '',
        confirmPassword: '' // Optional field for password confirmation
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        const copySignupInfo = {...signupInfo};
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const validatePassword = (password, confirmPassword) => {
        // Check if the password meets the required criteria
        const minLength = 8;  // Minimum length for password
        const upperCase = /[A-Z]/;
        const lowerCase = /[a-z]/;
        const number = /[0-9]/;
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

        if (password.length < minLength) {
            return "Password must be at least 6 characters long.";
        }

        if (!upperCase.test(password)) {
            return "Password must contain at least one uppercase letter.";
        }

        if (!lowerCase.test(password)) {
            return "Password must contain at least one lowercase letter.";
        }

        if (!number.test(password)) {
            return "Password must contain at least one number.";
        }

        if (!specialChar.test(password)) {
            return "Password must contain at least one special character.";
        }

        if (password !== confirmPassword) {
            return "Passwords do not match.";
        }

        return null; // Return null if all validations pass
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = signupInfo;

        // Basic client-side validation
        if (!name || !email || !password) {
            return handleError('Name, email, and password are required.');
        }

        // Password validation
        const passwordError = validatePassword(password, confirmPassword);
        if (passwordError) {
            return handleError(passwordError); // Show password validation error
        }

        try {
            const url = "http://localhost:4000/manager/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });

            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                console.log('Redirecting to login...');
                setTimeout(() => {
                    navigate('/login'); // Redirect to the login page
                }, 1000);
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            }
        } catch (error) {
            handleError(error);
        }
    }

    return (
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                        onChange={handleChange}
                        type="text"  
                        name="name"
                        autoFocus
                        placeholder='Enter Your Name'
                        value={signupInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        onChange={handleChange}
                        type="email"  
                        name="email"
                        placeholder='Enter Your Email'
                        value={signupInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        onChange={handleChange}
                        type="password"  
                        name="password"
                        placeholder='Enter Your Password'
                        value={signupInfo.password}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        onChange={handleChange}
                        type="password"  
                        name="confirmPassword"
                        placeholder='Confirm Your Password'
                        value={signupInfo.confirmPassword}
                    />
                </div>
                <button>Signup</button>
                <span>
                    Already have an account? <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup;
