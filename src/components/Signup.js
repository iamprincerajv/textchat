import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signpRes, setSignupRes] = useState('');
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

  const signup = async (e) => {
    e.preventDefault();

    if (name.length > 2 && username.length > 2 && username.length < 16 && email && password.length > 5 && password.length < 12) {
      let result = await fetch('https://hellochat.vercel.app/signup', {
        method: 'post',
        body: JSON.stringify({ name, username, email, password }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      result = await result.json();

      if (result.authToken) {
        localStorage.setItem('name', result.name);
        localStorage.setItem("username", result.username);
        localStorage.setItem("email", result.email);
        localStorage.setItem('token', result.authToken);
        setSignupRes('You have successfully signed up!');
        setAlertStyle({
          backgroundColor: 'blueviolet',
          width: "300px",
          display: 'block'
        });
        navigate('/');
      }

      if (result.error) {
        setSignupRes(result.error);
        setAlertStyle({
          backgroundColor: 'blueviolet',
          width: "300px",
          display: 'block'
        })
        console.log(result.error)
      }
    } else {
      setSignupRes('Please enter all the details correctly');
      setAlertStyle({
        backgroundColor: 'blueviolet',
        width: "300px",
        display: 'block'
      })
    }
  }

  return (
    <div style={{ position: "fixed", top: "60px", width: "100%", height: "90vh" }}>
      <div className='row'>
        <h4 className='text-center mt-5 mb-4 bolder'>SIGN UP</h4>
        <div className=' signupScroll'>
          <p className='p-2 ps-4 rounded-3 mx-auto' style={alertStyle}>{signpRes}</p>
          <div className='p-3 d-flex justify-content-center align-items-center row'>
            <form className='signupform col-xl-4 col-lg-5 col-md-6 col-sm-8 col-10'>
              <label htmlFor="nameInput">Name</label>
              <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" id="nameInput" placeholder='Enter Your Name' />
              <label htmlFor="usernameInput">Username</label>
              <input value={username} onChange={(e) => { setUsername(e.target.value.toLowerCase()) }} type="text" id="usernameInput" placeholder='Enter A Username' />
              <label htmlFor="emailInput">Email Address</label>
              <input value={email} onChange={(e) => { setEmail(e.target.value.toLowerCase()) }} type="email" id="emailInput" placeholder='Enter Your Email Address' />
              <label htmlFor="passInput">Password</label>
              <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" id="passInput" placeholder='Enter Your Password' />
              <button onClick={signup} type='submit' className='p-1 py-2 fw-bold fs-5 rounded-3'>SIGN UP</button>
            </form>
          </div>
          <center>
            <div className="formLast col-xl-4 col-lg-5 col-md-6 col-sm-8 col-10">
              <div className='d-flex justify-content-center'>
                <p className='me-2'>Already have an account? </p> <Link to='/login'>Log in</Link>
              </div>
            </div>
            <div className='mt-5 d-flex justify-content-center pb-5'>
              <p style={{ fontSize: "15px", fontStyle: "italic" }} className="me-3">Note:</p>
              <p className='text-start mb-5' style={{ fontSize: "13px" }}>1. Username must be 3 to 15 characters long. <br />
                2. Password must be 5 to 11 characters long.</p>
            </div>
          </center>
        </div>
      </div>
    </div>
  )
}

export default Signup
