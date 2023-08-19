import React, { useState } from 'react';
import axios from "axios";
import Profile from './Profile';
import bgImage from '../bg.png';

const Login = ({onLogin}) => {
  const [user,setUser] = useState({
    username:"",
    password:"",
})
const [error,setError] = useState("")
const [success,setSuccess] = useState("")
const [token,setToken] = useState("")
const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for login status

console.log(token)

  
async function verifyUser(e){
  e.preventDefault();
  
  if(!user.username|| !user.password){
      setError("Please enter username and password")
      setSuccess("")
      return;
  }

try{
  const response = await  axios.post("https://dummyjson.com/auth/login", 
      {
      username: user.username,
      password: user.password,
      },
      {
        headers:{
          "Content-Type":"application/json"
        }
      }
      )
      setSuccess("Login successfull")
      setToken(response.data.token)
      setError("")
      onLogin();
    // Store user details in localStorage
    const userData = {
      id: response.data.id,
      username: response.data.username,
      email: response.data.email,
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      gender: response.data.gender,
      image: response.data.image,
      token: response.data.token,
    };
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
}
catch(err){
      setError("Invalid credentials")
      setSuccess("")
      setIsLoggedIn(false);
}
}

    return(
    <div className="login-page">
      <img src={bgImage} className='image-1'></img>
        <form className="login-form" onSubmit={verifyUser}> 
        {error && <h4 className="error">{error}</h4>}
            {
                success && <h4 className="success">{success}</h4>
            }
            <div className="header">
                <p>Welcome back! 👋</p>
            </div>
            <div className="header">
                <h3>Sign in to your account</h3>
            </div>
            <div className="form-group">
            <label htmlFor="username">Your email</label><br></br>
            </div>
            <div className="form-group">
            <input type="text" placeholder="Enter your email" onChange={(e)=>{setUser({...user,username:e.target.value})}}></input>
            </div>
            <div className="form-group">
            <label htmlFor="password">Password</label><br></br>
            </div>
            <div className="form-group">
            <input type="password" placeholder="Enter your password" onChange={(e)=>{setUser({...user,password:e.target.value})}}></input>
            </div>
            <button type="submit"> CONTINUE</button>
            
            <div className="fp">
            <a href="#">Forget your password?</a>
            </div>
        </form>
        <div className="signup-link">
            <p>Don't have an account? <a href="#">sign up</a></p>
        </div>
        

    </div>
)
}
export default Login;