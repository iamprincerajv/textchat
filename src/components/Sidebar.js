import React from 'react'
import { useNavigate } from 'react-router-dom';

const Sidebar = (props) => {

    const { sidebar } = props;
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.clear();
        navigate("/login");
    }

    const settings = () => {
        navigate("/settings");
    }

    return (
        <div className={sidebar.join(" ")}>
            <p onClick={()=>{navigate("/profile")}}>Your Profile</p>
            <p onClick={settings}>Settings</p>
            <p onClick={logOut}>Log Out</p>
        </div>
    )
}

export default Sidebar
