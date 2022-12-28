import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Header = (props) => {

  const { setSidebar } = props;

  const location = useLocation();
  const navigate = useNavigate();

  const backHome = () => {
    if (location.pathname==="/profile" && localStorage.getItem("friendToChat")) {
      navigate("/message");
    } else {
      navigate("/");
      localStorage.removeItem("friendToChat");
      localStorage.removeItem("friendToChatName");
    }
  }

  const showSidebar = () => {
    let sidebar = document.querySelector(".sidebar");

    if (sidebar.classList.contains("sidebarActive")) {
      setSidebar(["sidebar"]);
    } else {
      setSidebar(["sidebar", "sidebarActive"]);
    }
  }

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <header className='d-flex justify-content-between'>
      <div className='d-flex'>
        {
          location.pathname === "/message" || location.pathname === "/profile" ? <i onClick={backHome} className="fa-solid fa-chevron-left fa-xl ms-3 ms-lg-5 ms-md-5 ms-sm-4 mt-2" style={{ paddingTop: "9px", paddingLeft: "5px", paddingRight: "5px", cursor: "pointer" }}></i> : ""
        }
        {
          location.pathname === "/message" || location.pathname === "/profile" ? <p className='ps-1 ps-sm-3 ms-1'>HelloChat</p> : <p className='ps-3 ms-3 ps-lg-5 ms-lg-5 ps-sm-4 ms-sm-4'>HelloChat</p>
        }
      </div>
      {location.pathname === "/" ? <div style={{ color: 'white', backgroundColor: 'blueviolet', cursor: "pointer" }} className='me-3 me-sm-4 me-md-5 p-1 px-3 rounded-3 bold' onClick={showSidebar}>Menu</div> : ""}

      {location.pathname === "/message" ? <div onClick={() => { navigate("/profile") }} style={{ color: 'white', backgroundColor: 'blueviolet', cursor: "pointer" }} className='me-3 me-sm-4 me-lg-5 me-md-5 p-1 px-3 rounded-3 bold'>{localStorage.getItem("friendToChat")} </div> : ""}

      {location.pathname === "/profile" && !localStorage.getItem("friendToChat") ? <div onClick={logOut} style={{ color: 'white', backgroundColor: 'blueviolet', cursor: "pointer" }} className='me-3 me-sm-4 me-lg-5 me-md-5 p-1 px-3 rounded-3 bold'>Log Out </div> : ""}
    </header>
  )
}

export default Header
