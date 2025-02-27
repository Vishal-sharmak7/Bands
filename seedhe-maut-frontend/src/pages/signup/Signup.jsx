import React, { useState } from "react";
import "../signup/Signup.jsx";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../services/userService.js";
import { toast } from 'react-toastify';



const Signup = () => {
  const [user, setUser] = useState({
    firstName:"",
    lastName:"",
    name: "",
    email: "",
    password: "",
    number:"",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate =useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const objToSend = {
        firstName: user['firstName'],
        lastName: "sharma",
        userName: user['name'],
        email: user['email'],
        phoneNumber: user['number'],
        password: user['password']
      }

      if(!user['email'] || !user['password']){
          return toast.error("invaild form")
      }

      const response = await createUser(objToSend);
   
      if (response.status) {
        toast.success("Signup successful", {
          style: { background: "#28a745", color: "#fff", fontWeight: "bold" },
        }, 3000);
        navigate("/");
        
      }
    } catch (err) {
      toast.error(err.message)
    }
    // useEffect(() => {
    //   const fetchUsers = async () => {
    //     try {
    //       const dataToSend= {

    //       }
    //       const data = await createUser(dataToSend);
    //       setUsers(data);
    //     } catch (error) {
    //       console.error("Failed to fetch users");
    //     }
    //   };

    //   fetchUsers();
    // }, []);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Signup</h1>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleSubmit}>
        <div>
            <label>First Name</label>
            <input
              type="text"
              value={user.firstName || ""}
              id="fuser"
              placeholder="Enter your first name "
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              value={user.lastName || ""}
              id="luser"
              placeholder="Enter your last name "
              onChange={(e) => setUser({ ...user, lastName: e.target.value})}
            />
          </div>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={user.name || ""}
              id="user"
              placeholder="Enter your username "
              onChange={(e) => setUser({...user, name: e.target.value})}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={user.email ||""}
              id="sEmail"
              placeholder="Enter your email"
              onChange={(e) => setUser({...user, email: e.target.value})}
            />
          </div>
          <div>
            <label>Phone Number</label>
            <input
              type="number"
              value={user.number || ""}
              id="sNumber"
              placeholder="Enter your Phone number"
              onChange={(e) => setUser({...user, number: e.target.value})}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={user.password || ""}
              id="Spass"
              placeholder="enter your password"
              onChange={(e) => setUser({...user, password: e.target.value})}
            />
          </div>
          <button type="submit">Submit</button>
          <p>
            Already have an account? <Link to="/">login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Signup;
