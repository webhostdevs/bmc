import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
    const { loginWithRedirect, isAuthenticated } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
    
        fetch('https://bookmycater.freewebhostmost.com/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'email': email,
                'password': password
            })
        })
        .then(response => {
            if (response.ok) {
                window.location.href = '/';
            } else {
                alert('Login failed');
            }
        });
    };
    

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <form 
                onSubmit={handleLogin} 
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <h2 className="text-xl font-semibold mb-4">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border border-gray-300 p-2 rounded mb-4 w-full"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border border-gray-300 p-2 rounded mb-4 w-full"
                />
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 w-full"
                >
                    Login
                </button>
            </form>
            
            {/* Display signup options if not logged in */}
            {!isAuthenticated && (
                <div className="mt-4 text-center">
                    <p className="text-gray-700">Don't have an account?</p>
                      <Link to="/sign-up">
                    <a  
                        className="text-blue-500 hover:underline"
                    >
                        Sign up here
                    </a>
                     </Link> 
                </div>
            )}
        </div>
    );
};

export default Login;
