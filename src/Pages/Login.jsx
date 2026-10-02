import React from 'react'
import "./CSS/Login.css"
const Login = () => {
  return (
    <div>
      <div className='login-container'>
        <div className='image-container'>
          <img className='login-bg-img' src="./src/Assits/login-bg-v2.png" alt="bg-img" />
        </div>
        <div className='login-form'>
          <h2 className='login-heading'>Login</h2>
          <input type="text" placeholder='Email' />
          <input type="password" placeholder='Password' />
            <button className='login-btn'>Login</button>
            <p>If you dont have account-  <a href="/register">Join Us</a></p>
        </div>
      </div>
    </div>
  )
}

export default Login
