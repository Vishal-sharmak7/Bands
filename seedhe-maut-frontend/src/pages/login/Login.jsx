import React, { useState } from "react";
import "./Login.css"; // Import the CSS file for styling
// import Button from "../../components/button/loginbtn";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate =useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        return toast.error("Plase enter your credentials");
      }
  
      const response = await loginUser({email: email, password: password,});
      if(response.status){
        localStorage.setItem("accessToken", response.data.accessToken)
  
        localStorage.setItem("refreshToken", response.data.refreshToken)
  
        toast.success(response.msg, {
                  style: { background: "#28a745", color: "#fff", fontWeight: "bold" },
                }, 3000);
                navigate("/Home");
      } else{
        toast.error(response.msg)
      }
    } catch (error) {
      toast.error(error.response.data.msg)
    } 
  };

  return (
    <div>
      {/* <button className="login-btn" >
  
    </button> */}
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
            {/* <p>Don't have any account ? <a href="../signup/Signup.jsx">Signup</a></p> */}
            <p>
              Don't have an account? <Link to="/Signup">Signup</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
