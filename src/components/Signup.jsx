import React, { useState } from 'react';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
    
        fetch('http://localhost/auth0/signup.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'username': username,
                'email': email,
                'password': password
            })
        })
        .then(response => {
            if (response.ok) {
                // Redirect to login page after signup
                window.location.href = '/login';
            } else {
                alert('Signup failed');
            }
        });
    };
    

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <form 
                onSubmit={handleSignup} 
                className="bg-white shadow-md flex flex-col items-center justify-center rounded px-8 pt-6 pb-8 mb-4 w-1/4"
            >
                <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="border  border-gray-300 p-2 rounded mb-4 w-full"
                />
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
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;
