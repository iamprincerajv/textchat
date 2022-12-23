import React from 'react'
import { useNavigate } from 'react-router-dom';

const Sidebar = (props) => {

    const { sidebar } = props;
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.clear();
        navigate("/login");
    }

    return (
        <div className={sidebar.join(" ")}>
            <p>Your Profile</p>
            <p onClick={logOut}>Log Out</p>
        </div>
    )
}

export default Sidebar
