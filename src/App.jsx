import { useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'

function App() {

  //show the post
  const [postListState, setPostListState] = useState([])

  useEffect( function() {
    async function getAllPost() {
      const response = await axios.get('http://localhost:3500/api/post/all')
      setPostListState(response.data);
    }

     getAllPost();
  }, []); 

  const postComponent = [];

  for(let i = 0; i < postListState.length; i++) {
    const currentPostValue = postListState[i];
    console.log(currentPostValue.image)
    postComponent.push(<div>
      {currentPostValue.owner} - Post: {currentPostValue.text}
      <div></div>
      {currentPostValue.image && (

        <img src={currentPostValue.image} alt="Post Image" />
      )}
    </div>)
  }  
  //show the post
  

  return (
    <div>{postComponent}</div>
  )
}

export default App
