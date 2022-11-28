import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {

  const location = useLocation();

  const logOut = () => {
    localStorage.clear();
  }

  return (
    <header className='d-flex justify-content-between'>
      <div><i className="fa-solid fa-chevron-left"></i></div>
      <p className='ps-5 ms-5'>HelloChat</p>
      {location.pathname==="/" ? <Link to='/login' style={{color:'white', backgroundColor: 'blueviolet'}} className='me-5 p-1 px-3 rounded-3 bold' onClick={logOut}>{localStorage.getItem('name')} - Log Out</Link>: ""}

      {location.pathname==="/message" ? <div style={{color:'white', backgroundColor: 'blueviolet'}} className='me-5 p-1 px-3 rounded-3 bold'>{localStorage.getItem('friendToChatName')} ({localStorage.getItem("friendToChat")}) </div>: ""}
    </header>
  )
}

export default Header
