import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Homepage.css';
import Navbar from './Navbar';

function Homepage() {
  // show the post
  const [postListState, setPostListState] = useState([]);

  const getAllPost = async () => {
    const response = await axios.get('/api/blogpost/');
    setPostListState(response.data);
  };

  useEffect(() => {
    getAllPost();
  }, []);

  const postComponent = [...postListState].reverse().map((post) => (
    <div key={post._id} className="postContainer">
      <div className="postContent">
        <p>{post.owner} - {post.text} - {post.timestamp}</p>
      </div>
    </div>
  ));

  return (
    <div>
      <div className="home-container">
        <Navbar />
        <div className="blog-posts">{postComponent}</div>
      </div>
    </div>
  );
}

export default Homepage;
