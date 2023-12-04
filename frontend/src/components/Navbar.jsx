import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "../style.scss";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // Perform logout action from your context
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="links">
          <Link className="link" to="/home">
            <h6>Home</h6>
          </Link>
          <Link className="link" to="/products">
            <h6>Products</h6>
          </Link>
          <Link className="link" to="/functionality">
            <h6>Functions</h6>
          </Link>
          <Link className="link" to="/initialize_database">
            <h6>Initialize DB</h6>
          </Link>
      
        

          <span >{currentUser?.username}</span>
          {currentUser ? (
            <Link className="logout-link" to="/" onClick={handleLogout}> {/* Redirect to '/' after logout */}
              Logout
            </Link>
          ) : (
            <Link className="login-link" to="/">
              Login
            </Link>
          )}

        </div>
      </div>
    </div>
  );
};

export default Navbar;
