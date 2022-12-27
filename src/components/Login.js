import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginRes, setLoginRes] = useState('');
  const [alertStyle, setAlertStyle] = useState({
    backgroundColor: 'blueviolet',
    width: "400px",
    display: 'none'
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [])

  const login = async (e) => {
    e.preventDefault();

    if (email.length > 0 && password.length > 0) {
      let result = await fetch('http://localhost:5000/login', {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      result = await result.json();
      if (result.authToken) {
        setLoginRes('You have logged in successfully');
        setAlertStyle({
          backgroundColor: 'blueviolet',
          width: "300px",
          display: 'block'
        });

        localStorage.setItem('name', result.name);
        localStorage.setItem('username', result.username);
        localStorage.setItem('email', result.email);
        localStorage.setItem("token", result.authToken);
        navigate('/');
      } else {
        setLoginRes('Please enter correct email or password');
        setAlertStyle({
          backgroundColor: 'blueviolet',
          width: "300px",
          display: 'block'
        });
      }
    } else {
      setLoginRes('Please enter email or password');
      setAlertStyle({
        backgroundColor: 'blueviolet',
        width: "300px",
        display: 'block'
      });
    }
  }

  return (
    <div style={{ position: "fixed", top: "9.5vh", width: "100%", height: "90vh" }}>
      <div>
        <h4 className='text-center mt-5 mb-4 bolder'>LOG IN</h4>
        <div className="signupScroll">
          <p className='p-2 ps-4 rounded-3 mx-auto' style={alertStyle}>{loginRes}</p>
          <div className='p-3 d-flex justify-content-center align-items-center row'>
            <form className='signupform col-xl-4 col-lg-5 col-md-6 col-sm-8 col-10'>
              <label htmlFor="emailInput">Email Address</label>
              <input value={email} onChange={(e) => { setEmail(e.target.value.toLowerCase()) }} type="email" id="emailInput" placeholder='Enter Your Email Address' />
              <label htmlFor="passInput">Password</label>
              <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" id="passInput" placeholder='Enter Your Password' />
              <button onClick={login} type='submit' className='p-1 py-2 fw-bold fs-5 rounded-3'>LOG IN</button>
            </form>
          </div>
          <center>
            <div className="formLast d-flex justify-content-center col-xl-4 col-lg-5 col-md-6 col-sm-8 col-10">
              <p className='me-2'>Already have an account? </p> <Link to='/signup'>Sign Up</Link>
            </div>
          </center>
        </div>
      </div>
    </div>
  )
}

export default Login
