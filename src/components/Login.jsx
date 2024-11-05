// import React, { useContext, useState } from 'react';
// import { AuthContext } from '../AuthContext';
// import { Link } from 'react-router-dom';

// const Login = () => {
//     const { loginWithRedirect, isAuthenticated } = useContext(AuthContext);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleLogin = (e) => {
//         e.preventDefault();
    
//         fetch('https://bookmycater.freewebhostmost.com/login.php', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//             body: new URLSearchParams({
//                 'email': email,
//                 'password': password
//             })
//         })
//         .then(response => {
//             if (response.ok) {
//                 window.location.href = '/';
//             } else {
//                 alert('Login failed');
//             }
//         });
//     };
    

//     return (
//         <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//             <form 
//                 onSubmit={handleLogin} 
//                 className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
//             >
//                 <h2 className="text-xl font-semibold mb-4">Login</h2>
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     className="border border-gray-300 p-2 rounded mb-4 w-full"
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     className="border border-gray-300 p-2 rounded mb-4 w-full"
//                 />
//                 <button 
//                     type="submit" 
//                     className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 w-full"
//                 >
//                     Login
//                 </button>
//             </form>
            
//             {/* Display signup options if not logged in */}
//             {!isAuthenticated && (
//                 <div className="mt-4 text-center">
//                     <p className="text-gray-700">Don't have an account?</p>
//                       <Link to="/sign-up">
//                     <a  
//                         className="text-blue-500 hover:underline"
//                     >
//                         Sign up here
//                     </a>
//                      </Link> 
//                 </div>
//             )}
//         </div>
//     );
// };
// export default Login;

import React, { useState } from 'react';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setErrorMessage(''); // Clear errors when switching forms
        setSuccessMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ((!isLogin && !username) || !email || !password) {
            setErrorMessage('Please provide all required fields');
            return;
        }

        if (!isLogin && password !== retypePassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        const url = isLogin
            ? 'https://bookmycater.freewebhostmost.com/login.php'
            : 'https://bookmycater.freewebhostmost.com/signup.php';

        const payload = isLogin
            ? { email, password }
            : { username, email, password };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (result.success) {
                if (isLogin) {
                    alert('Login successful!');
                    // Store the token in localStorage or context
                    localStorage.setItem('token', result.token); // Save token for session management
                } else {
                    alert('Signup successful!');
                }
            } else {
                setErrorMessage(result.message || 'An error occurred');
            }
        } catch (error) {
            setErrorMessage('An error occurred during the request');
        }
    };

    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Signup'}</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {!isLogin && (
                    <input
                        type="password"
                        placeholder="Retype Password"
                        value={retypePassword}
                        onChange={(e) => setRetypePassword(e.target.value)}
                        required
                    />
                )}
                <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
            </form>
            <p>
                {isLogin ? 'No account? ' : 'Already have an account? '}
                <button onClick={toggleForm}>
                    {isLogin ? 'Signup' : 'Login'}
                </button>
            </p>
        </div>
    );
};

export default AuthForm;
