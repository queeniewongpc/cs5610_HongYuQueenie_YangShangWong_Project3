import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function UserPage() {
  //show the post
  const [postListState, setPostListState] = useState([]);

  const params = useParams();
  const owner = params.owner;


  const getAllUserPost = async () => {
    const response = await axios.get('http://localhost:3500/api/post/all?owner=' + owner);
    setPostListState(response.data);
  };

  useEffect(() => {
    getAllUserPost();
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
  // make a new post
  const [newPostImage, setNewPostImage] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  function updatePostContent(event) {
    setNewPostContent(event.target.value);
  }

  function updatePostImage(event) {
    setNewPostImage(event.target.value);
  }


  async function makeNewPost() {
    const newPost = {
      owner: owner,
      text: newPostContent,
      image: newPostImage ? newPostImage : null,
    };

    await axios.post('http://localhost:3500/api/post', newPost);

    await getAllUserPost();

    setNewPostImage('');
    setNewPostContent('');
  }

  // make a new post

  if(postListState.length === 0) {
    (<dev>What's on your mind?</dev>)
  }

  return (
    <div>
      <div>
        <h3>Make a new post</h3>
        <div>Content: </div>
        <input onInput={updatePostContent} value={newPostContent} />
        <div>Image: </div>
        <input onInput={updatePostImage} value={newPostImage} />
        <div></div>
        <button onClick={makeNewPost}>Post!</button>
      </div>
      <div>{postComponent}</div>
    </div>
  );
}

export default UserPage;
