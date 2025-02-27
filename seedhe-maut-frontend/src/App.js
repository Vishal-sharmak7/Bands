import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/home";
import Heading from "./components/header/heading";
import Footer from "./components/footer/Footer";

function App() {
  return (
    
    <div>
      <Heading />
      {/* Toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000} /* Set it to 5 seconds */
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        closeButton={false}
      />
      {/* App Routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
