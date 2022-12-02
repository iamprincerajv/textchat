import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Header = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const backHome = () => {
    navigate("/");
    localStorage.removeItem("friendToChat");
    localStorage.removeItem("friendToChatName");
  }

  const logOut = () => {
    localStorage.clear();
  }

  return (
    <header className='d-flex justify-content-between'>
      <div className='d-flex'>
        {
          location.pathname === "/message" ? <i onClick={backHome} className="fa-solid fa-chevron-left fa-xl ms-3 ms-lg-5 ms-md-5 ms-sm-4 mt-2" style={{ paddingTop: "9px", paddingLeft: "5px", paddingRight: "5px", cursor: "pointer" }}></i> : ""
        }
        {
          location.pathname==="/message" ? <p className='ps-3 ms-1'>HelloChat</p> : <p className='ps-3 ms-3 ps-lg-5 ms-lg-5 ps-sm-4 ms-sm-4'>HelloChat</p>
        }
      </div>
      {location.pathname === "/" ? <Link to='/login' style={{ color: 'white', backgroundColor: 'blueviolet' }} className='me-3 me-sm-4 me-md-5 p-1 px-3 rounded-3 bold' onClick={logOut}>{localStorage.getItem('name')} - Log Out</Link> : ""}

      {location.pathname === "/message" ? <div onClick={backHome} style={{ color: 'white', backgroundColor: 'blueviolet' }} className='me-3 me-sm-4 me-lg-5 me-md-5 p-1 px-3 rounded-3 bold'>{localStorage.getItem('friendToChatName')} ({localStorage.getItem("friendToChat")}) </div> : ""}
    </header>
  )
}

export default Header
