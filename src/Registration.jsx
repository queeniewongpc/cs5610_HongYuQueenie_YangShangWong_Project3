import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from './Navbar'; 
import './Registration.css';

function UserAccount() 
{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const navigate = useNavigate();

  async function handleRegistration() 
  {
    try {
      const response = await axios.post('/api/registration', { username, password });
      if (response.data.success) 
      {
        // navigate(`/home/${username}`);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle errors or display error messages to the user
    }
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
        {/* Add components or routes for login/register forms here */}
      </div>
    </div>
  </div>
);
}

export default UserAccount;