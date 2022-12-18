import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Friends = () => {

    const [users, setUsers] = useState("");
    const navigate = useNavigate("");

    useEffect(() => {
        getUsers();

        if (localStorage.getItem("friendToChat")) {
            localStorage.removeItem("friendToChat");
            localStorage.removeItem("friendToChatName");
        }
        // eslint-disable-next-line
    }, [])

    const getUsers = async () => {
        let result = await fetch("http://13.233.193.253:5000/getUsers");
        result = await result.json();
        setUsers(result);
    }

    const search = async (e) => {
        let key = e.target.value;

        if (key) {
            let result = await fetch(`http://13.233.193.253:5000/search/${key}`);
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
        <div>
            <div className='row'>
                <center>
                    <form className='friendsForm mt-5 col-lg-4 col-xl-3 col-md-5 col-sm-6 col-8'>
                        <input onChange={search} className='ps-4 pe-5 py-2 me-1' type="text" placeholder='Search for a friend' />
                    </form>
                </center>
            </div>


            <div className='row'>
                <center>
                    <div className='friendsList d-flex justify-content-between row mt-5 col-xl-4 col-lg-6 col-md-7 col-sm-8 col-11'>
                        {
                            users.length > 0 ? users.map((items, index) => {
                                return <div onClick={() => { chatWithF(items.username, items.name) }} className='col-5 col-sm-3 mx-1 p-3 mb-3 text-center friendsItem' key={items._id}>
                                    <i className="fa-solid fa-user fa-3x my-2"></i>
                                    <div className='d-block text-start'>
                                        <p className='bolder'>{
                                            items.username === localStorage.getItem("username") ? "You" : items.name
                                        }</p>
                                        <p style={{ fontSize: "10px" }}>{items.username}</p>
                                    </div>
                                </div>
                            }) : <p>No user with this search term</p>
                        }
                    </div>
                </center>
            </div>
        </div>
    )
}

export default Friends
