import { useState } from 'react';
import { useNavigate } from "react-router";
import axios from 'axios';
import Navbar from './Navbar'; 
import './Registration.css';



function UserAccount() 
{
  const [loginFormState, setLoginFormState] = useState({});
  const [errorDetailsState, setErrorDetailsState] = useState('');
  const navigate = useNavigate();

  function updateUserNameInState(event) {
      const username = event.target.value;

      const newLoginFormState = {
          password: loginFormState.password,
          username: username,
      }

      setLoginFormState(newLoginFormState)
  }
  
  function updatePasswordInState(event) {
      const password = event.target.value;

      const newLoginFormState = {
          username: loginFormState.username,
          password: password,
      }

      setLoginFormState(newLoginFormState)
  }

  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [errorDetailsState, setErrorDetailsState] = useState('');
  // const navigate = useNavigate();

  async function handleRegistration() 
  {
    try {
      const response = await axios.post('/api/user/registration', loginFormState);
      //if (response.data.success) 
      //{
        //console.log("Register success")
        navigate('/login');
      //}
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
        <input type="text" placeholder="Username" onInput={updateUserNameInState}/>
        <input type="password" placeholder="Password" onInput={updatePasswordInState}/>
        <button onClick={handleRegistration}>Register</button>
      </div>
    </div>
  </div>
);
}

export default UserAccount;