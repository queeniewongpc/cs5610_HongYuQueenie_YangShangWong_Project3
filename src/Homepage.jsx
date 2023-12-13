import React from 'react';
import './Homepage.css'; 
import Navbar from './Navbar'; 

const Home = () => 
{
  return (
    <div className="home-container">
        <Navbar />
      <header className="header">
        <div className="header-content">
          <h1 className="title">Welcome to your home page</h1>
          <p className="subtitle">Connect and share with friends</p>
        </div>
      </header>
      {/* Rest of your content goes here */}
      
    </div>
  );
};

export default Home;