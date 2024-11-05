import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useContext, useState } from "react";
import HomePage from "./components/HomePage";
import VendorDetails from "./components/VendorDetails";
import Navbar from "./components/Navbar";
import AuthForm from "./components/AuthForm";
import ContactForm from "./components/ContactUs";
import "./App.css";
import Footer from "./components/Footer";
import NewVendor from "./components/NewVendor";
import EventsPage from "./components/EventsPage.jsx";
import AuthForm from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import { AuthProvider, AuthContext } from './AuthContext';

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <AuthProvider> {/* Wrap the app with AuthProvider */}
      <Router>
        <AuthConsumer searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Router>
    </AuthProvider>
  );
}

// Create a separate component to consume the AuthContext
function AuthConsumer({ searchTerm, setSearchTerm }) {
  const { isAuthenticated, showAuthForm, toggleAuthForm } = useContext(AuthContext); // Use AuthContext

  return (
    <div className="bg-white min-h-screen w-full">
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        toggleAuthForm={toggleAuthForm}
        isLoggedIn={isAuthenticated}
      />

      <Routes>
        <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
        <Route path="/vendor/:id" element={<VendorDetails />} />
        <Route path="/contactus" element={<ContactForm />} />
        <Route path="/admin" element={<NewVendor />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>

      {/* Display AuthForm only if showAuthForm is true */}
      {showAuthForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <AuthForm onClose={toggleAuthForm} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
