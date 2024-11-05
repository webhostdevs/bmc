 import React, { useState } from 'react';

function AuthForm({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState(''); // New state for username
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
      if (result.success) {
        setSuccessMessage(`${isLogin ? 'Login' : 'Signup'} successful!`);
        
        // Redirect to the admin page after login
        if (isLogin && result.redirect_url) {
          window.location.href = result.redirect_url;
        } else {
          onClose(); // Close form for signup or if no redirect URL is provided
          alert(`${isLogin ? 'Login' : 'Signup'} successful!`);
        }
      } else {
        setErrorMessage(result.message || 'An error occurred');
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
