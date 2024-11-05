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

function AuthForm({ onClose }) {
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

    // Basic validation
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
        
        if (result && typeof result.success === 'boolean') {
            if (result.success) {
                alert(`${isLogin ? 'Login' : 'Signup'} successful!`);
                
                // Instead of redirecting, load the home page
                window.location.href = '/'; // Replace with the actual path to your home page
            } else {
                setErrorMessage(result.message || 'An error occurred');
            }
        } else {
            setErrorMessage('Unexpected response from the server');
        }
    } catch (error) {
        setErrorMessage('An error occurred during the request');
    }
};


  return (
    <div className="relative">
      <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
        &times;
      </button>

      <h2 className="text-lg font-bold mb-4">{isLogin ? 'Login' : 'Signup'}</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border p-2 mb-2 w-full"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 mb-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 mb-2 w-full"
        />
        {!isLogin && (
          <input
            type="password"
            placeholder="Retype Password"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
            required
            className="border p-2 mb-2 w-full"
          />
        )}
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          {isLogin ? 'Login' : 'Signup'}
        </button>
      </form>
      <p className="mt-2">
        {isLogin ? 'No account? ' : 'Already have an account? '}
        <button onClick={toggleForm} className="text-blue-500 underline">
          {isLogin ? 'Signup' : 'Login'}
        </button>
      </p>
    </div>
  );
}

export default AuthForm;
