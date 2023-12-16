import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import NUlogo from './images/NUlogo.png';
import axios from 'axios';

const Navbar = ({ isLoggedIn, userName }) => 
{
  async function logOut() {
    await axios.post('/api/user/logout', {})
  }
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="https://www.northeastern.edu/" className="navbar-logo">
            <img src={NUlogo} className="logoImg " />
        </Link>
        <ul className="navbar-menu">
          <li className="nav-item">
            <Link to="/home" className="nav-links">
              Home
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="nav-item">
              <Link to={`/${userName}`} className="nav-links">
                {userName}
              </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-links"  onClick={logOut}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
          <>
            <li className="nav-item">
              <Link to="/login" className="nav-links">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/registration" className="nav-links">
                Register
              </Link>
            </li>
          </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
