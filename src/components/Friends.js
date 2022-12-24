import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Friends = (props) => {

    const [users, setUsers] = useState("");
    const { sidebar, setSidebar } = props;
    const navigate = useNavigate("");

    useEffect(() => {
        getUsers();

        if (localStorage.getItem("friendToChat")) {
            localStorage.removeItem("friendToChat");
            localStorage.removeItem("friendToChatName");
        };

        setSidebar(["sidebar"]);
        // eslint-disable-next-line
    }, [])

    const getUsers = async () => {
        let result = await fetch("http://localhost:5000/getUsers", {
            headers: {
                "Authorization": `bearer ${localStorage.getItem("token")}`
            }
        });
        result = await result.json();
        setUsers(result);
    }

    const search = async (e) => {
        let key = e.target.value;

        if (key) {
            let result = await fetch(`http://52.66.179.35:5000/search/${key}`, {
                headers: {
                    "Authorization": `bearer ${localStorage.getItem("token")}`
                }
            });
            result = await result.json();

            if (result) {
                setUsers(result);
            }
        } else {
            getUsers();
        }
    }

    const chatWithF = (username, name) => {
        if (username === localStorage.getItem("username")) {

        } else {
            localStorage.setItem("friendToChat", username);
            localStorage.setItem("friendToChatName", name);
            navigate("/message");
        }
    }

    return (
        <>
        <Sidebar sidebar={sidebar} />
        <div style={{position: "fixed", top: "9.5vh", width: "100%"}}>
            <div className='row'>
                <center>
                    <form className='friendsForm mt-5 col-lg-4 col-xl-3 col-md-5 col-sm-6 col-8'>
                        <input onChange={search} className='ps-4 pe-5 py-2 me-1' type="text" placeholder='Search for a friend' />
                    </form>
                </center>
            </div>

            <center>
                <div className='friendsList mt-5 col-xl-4 col-lg-6 col-md-7 col-sm-8 col-11'>
                    {
                        users.length > 0 ? users.map((items, index) => {
                            return <div onClick={() => { chatWithF(items.username, items.name) }} className='mx-1 p-3 mb-3 text-center d-flex friendsItem' key={items._id}>
                                <i className="fa-solid fa-user fa-3x my-2 mx-2"></i>
                                <div className='d-block text-start mx-3 my-2'>
                                    <p className='bolder' style={{fontSize: "19px"}}>{
                                        items.username === localStorage.getItem("username") ? "You" : items.name
                                    }</p>
                                    <p style={{ fontSize: "14px" }}>{items.username}</p>
                                </div>
                            </div>
                        }) : <p>No user found</p>
                    }
                </div>
            </center>
        </div>
        </>
    )
}

export default Friends
