import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {

  const location = useLocation();

  const logOut = () => {
    localStorage.clear();
  }

  return (
    <header className='d-flex justify-content-between'>
      <p className='ps-5 ms-5'>HelloChat</p>
      {location.pathname==="/message" || location.pathname==="/" ? <Link to='/login' style={{color:'white', backgroundColor: 'blueviolet'}} className='me-5 p-1 px-3 rounded-3 bold' onClick={logOut}>{localStorage.getItem('name')} - Log Out</Link>: ""}
    </header>
  )
}

export default Header
