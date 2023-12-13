import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Homepage.css';
import Navbar from './Navbar';

const Home = () => {
  const [postListState, setPostListState] = useState([]);

  useEffect(() => {
    async function getAllPost() {
      const response = await axios.get('http://localhost:3500/api/post/all');
      setPostListState(response.data);
    }
    getAllPost();
  }, []);

  const postComponent = postListState.map((currentPostValue, index) => (
    <div key={index}>
      {currentPostValue.owner} - Post: {currentPostValue.text}
      <div></div>
      {currentPostValue.image && (
        <img src={currentPostValue.image} alt="Post Image" />
      )}
    </div>
  ));

  return (
    <div className="home-container">
      <Navbar />
      <header className="header">
        <div className="header-content">
          <h1 className="title">Welcome to your home page</h1>
          <p className="subtitle">Connect and share with friends</p>
        </div>
      </header>
      <div className="post-container">
        {/* Display posts */}
        {postComponent}
      </div>
      {/* Rest of your content goes here */}
    </div>
  );
};

export default Home;
