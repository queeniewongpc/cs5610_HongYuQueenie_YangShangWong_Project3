import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router";
import Navbar from './Navbar'; 



export default function Login() {

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

    async function submitLogin() {
        try {
            const response = await axios.post('/api/user/login', loginFormState)

            navigate(`/${loginFormState.username}`)  
        } catch (err) {
            setErrorDetailsState("Please enter a valid username and password!")
        }


    }

    let errorMessage = null;
    if(errorDetailsState) {
        errorMessage = <div>{errorDetailsState}</div>
    }

    return (
        <div className="container">
        <Navbar />
        <div className="inputField">Username:</div>
        <input type='text' onInput={updateUserNameInState} className="inputField" />
        <div className="inputField">Password:</div>
        <input type='password' onInput={updatePasswordInState} className="inputField" />
        <div>
            <button onClick={submitLogin} className="submitButton">Login</button>
        </div>
        <div>
            {errorMessage}
        </div>
    </div> 
    );
}