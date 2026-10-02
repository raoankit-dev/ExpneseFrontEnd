import React from 'react'
import "./CSS/Register.css"

const Register = () => {
  return (
    <div>
      <div className='registration-bg'>
        <div>
          <img className='rimg-left' src="./src/Assits/register_img_left.png" alt="bg-image" />
          <img className='rimg-right' src="./src/Assits/register_img_right.png" alt="bg-image" />
        </div>
        <div className='register-card'>
          <div className="header">
            <h2>Create Your Account</h2>
            <p>Join ExTracke and start tracking your money <br /> in a smarter way.</p>
          </div>
          <div className="fields">
            <input type="text" placeholder='Full Name'/>
            <input type="email" placeholder='Email'/>
            <input type="password" placeholder='Password'/>
          </div>
          <div className="footer">
            <button className='register-btn'>Create Account</button>
            <p>Already have an account?  <a href="/login">Login</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
