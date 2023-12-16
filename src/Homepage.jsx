import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Homepage.css';
import Navbar from './Navbar';

function Homepage() {
  const [postListState, setPostListState] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUsername] = useState('');
  const [joinTimestamp, setJoinTimestamp] = useState('');

  async function getUsername() {
    const response = await axios.get('/api/user/isLoggedIn');

    if (response.data.username) {
      setUsername(response.data.username);
    }
  }

  const getAllPost = async () => {
    const response = await axios.get('/api/blogpost/');
    setPostListState(response.data);
  };

  useEffect(() => {
    getAllPost();
    getUsername();
  }, []);


  const postComponent = [...postListState].reverse().map((post) => (
    <div key={post._id} className="postContainer">
      <div className="postContent">
        <div className="post-owner">{post.owner}</div>
        <div className="post-text">{post.text}</div>
        <div className="post-timestamp">{post.timestamp}</div>
      </div>
    </div>
  ));

  function updatePostContent(event) {
    setNewPostContent(event.target.value);
  }

  async function makeNewPost() {
    const newPost = {
      owner: userName,
      text: newPostContent,
    };

    await axios.post('/api/blogpost', newPost);

    await getAllPost();

    setNewPostContent('');
  }

  let usernameMessage = <div>Loading...</div>;
  if (userName) {
    usernameMessage = <div>Logged in as {userName}</div>;
  }

  return (
    <div>
      <div className="home-container">
        {userName ? <Navbar isLoggedIn={isLoggedIn} userName={userName}/> : <Navbar />}
  
        {userName && (
          <div className="container">
            <h3>Make a new post</h3>
            <div>Content: </div>
            <input
              className="inputField"
              onInput={updatePostContent}
              value={newPostContent}
            />
            <button className="submitButton" onClick={makeNewPost}>
              Submit
            </button>
          </div>
        )}

        <div className="blog-posts">{postComponent}</div>
      </div>
    </div>
  );
}

export default Homepage;
