import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UserPage.css';
import Navbar from './Navbar';

function UserPage() {
  // show the post
  const [postListState, setPostListState] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUsername] = useState('');
  const [joinTimestamp, setJoinTimestamp] = useState('');

  const params = useParams();
  const owner = params.owner;

  async function getUsername() {
    const response = await axios.get('/api/user/isLoggedIn');

    if (response.data.username) {
      setUsername(response.data.username);
    }
  }

  const getAllUserPost = async () => {
    const response = await axios.get('/api/blogpost/all');
    setPostListState(response.data);
  };

  useEffect(() => {
    getAllUserPost();
    getUsername();
  }, []);

  const handleUpdate = (postId) => {
    // Implement the update logic here
    console.log('Update post with ID:', postId);
  };

  const handleDelete = async (postId) => {
    // Implement the delete logic here
    await axios.delete(`/api/blogpost/${postId}`);
    await getAllUserPost();
  };

  const postComponent = [...postListState].reverse().map((post) => (
    <div key={post._id} className="postContainer">
      <div className="postContent">
        <p>{post.owner} - {post.text} - {post.timestamp}</p>
      </div>
      <div className="postButtons">
        <button onClick={() => handleUpdate(post._id)}>Update</button>
        <button onClick={() => handleDelete(post._id)}>Delete</button>
      </div>
    </div>
  ));
  function updatePostContent(event) {
    setNewPostContent(event.target.value);
  }

  async function makeNewPost() {
    const newPost = {
      owner: owner,
      text: newPostContent,
    };

    await axios.post('/api/blogpost', newPost);

    await getAllUserPost();

    setNewPostContent('');
  }

  let usernameMessage = <div>Loading...</div>;
  if (userName) {
    usernameMessage = <div>Logged in as {userName}</div>;
  }

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      
      <div className="userPageContainer">
        <h1>{usernameMessage}</h1>
        <div className="container">
          <h3>Make a new post</h3>
          <div>Content: </div>
          <input className="inputField" onInput={updatePostContent} value={newPostContent} />
          <button className="submitButton" onClick={makeNewPost}>
            Submit
          </button>
        </div>
        <p>Joined on: {joinTimestamp}</p>
        <div className="postContainer">{postComponent}</div>
      </div>
    </div>
  );
}

export default UserPage;
