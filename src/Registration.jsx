import { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; 
import './Registration.css';
import { useNavigate } from "react-router";


function UserAccount() 
{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorDetailsState, setErrorDetailsState] = useState('');
  const navigate = useNavigate();

  async function handleRegistration() 
  {
    try {
      const response = await axios.post('http://localhost:3500/api/user/registration', { username, password });
      if (response.data.success) 
      {
        console.log("Register success")
        navigate('/login');
      }
    } catch (error) {
      setErrorDetailsState('Error registering user:', error);
    }
  }

  let errorMessage = null;
  if(errorDetailsState) {
      errorMessage = <div>{errorDetailsState}</div>
  }

  return (
    <div className="signupContainer">
    <Navbar />
    <div className="container">
      <h2>Create an account</h2>
      <div className="formContainer">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegistration}>Register</button>
      </div>
    </div>
  </div>
);
}

export default UserAccount;