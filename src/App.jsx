import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  //show the post
  const [postListState, setPostListState] = useState([]);

  const getAllPost = async () => {
    const response = await axios.get('http://localhost:3500/api/blogpost/all');
    setPostListState(response.data);
  };

  useEffect(() => {
    getAllPost();
  }, []);

  const postComponent = [];

  for (let i = 0; i < postListState.length; i++) {
    const currentPostValue = postListState[i];
    postComponent.push(
      <div key={i}>
        {currentPostValue.owner} - Post: {currentPostValue.text} - {currentPostValue.timestamp}
        <div></div>
        {currentPostValue.image && <img src={currentPostValue.image} alt="Post Image" />}
      </div>
    );
  }
  //show the post

  return (
      <div>{postComponent}</div>

  );
}

export default App;
