import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Friends = () => {

    const [users, setUsers] = useState("");
    const navigate = useNavigate("");

    useEffect(() => {
        getUsers();

        if(localStorage.getItem("friendToChat")) {
            localStorage.removeItem("friendToChat");
            localStorage.removeItem("friendToChatName");
        }
        // eslint-disable-next-line
    }, [])

    const getUsers = async () => {
        let result = await fetch("http://localhost:5000/getUsers");
        result = await result.json();
        setUsers(result);
    }

    const search = async (e) => {
        let key = e.target.value;

        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();

            if (result) {
                setUsers(result);
            }
        } else {
            getUsers();
        }
    }

    const chatWithF = (username, name)=>{
        localStorage.setItem("friendToChat", username);
        localStorage.setItem("friendToChatName", name);
        navigate("/message");
    }

    return (
        <>
            <form className='friendsForm text-center mt-5'>
                <input onChange={search} autoFocus className='ps-4 pe-5 py-2 me-1' type="text" placeholder='Search for a friend' />
            </form>

            <center>
                <div className='friendsList mt-5'>
                    {
                        users.length > 0 ? users.map((items, index) => {
                            return <div onClick={()=>{chatWithF(items.username, items.name)}} className='p-2 ps-4 py-3 mb-1 friendsItem' key={items._id}>
                                <i className="fa-solid fa-user fa-2xl me-4 mt-3 pt-1"></i>
                                <div className='d-block'>
                                    <p className='bolder'>{items.name}</p>
                                    <p style={{ fontSize: "10px" }}>{items.username}</p>
                                </div>
                            </div>
                        }) : <p>No user with this search term</p>
                    }
                </div>
            </center>
        </>
    )
}

export default Friends
