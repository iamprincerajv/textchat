import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginRes, setLoginRes] = useState('');
  const [alertStyle, setAlertStyle] = useState({
    backgroundColor: 'blueviolet',
    width: "400px",
    display: 'none'
  });

  const login = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <h4 className='text-center mt-5 mb-4 bolder'>LOG IN</h4>
      <p className='p-2 ps-4 rounded-3 mx-auto' style={alertStyle}>{loginRes}</p>
      <div className='signup p-3 d-flex justify-content-center align-items-center'>
        <form className='signupform'>
          <label htmlFor="emailInput">Email Address</label>
          <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" id="emailInput" placeholder='Enter Your Email Address' />
          <label htmlFor="passInput">Password</label>
          <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" id="passInput" placeholder='Enter Your Password' />
          <button onClick={login} type='submit' className='p-1 py-2 fw-bold fs-5 rounded-3'>SIGN UP</button>
        </form>
      </div>
      <div className="formLast d-flex justify-content-center">
        <p className='me-2'>Already have an account? </p> <Link to='/signup'>Sign Up</Link>
      </div>
    </>
  )
}

export default Login
