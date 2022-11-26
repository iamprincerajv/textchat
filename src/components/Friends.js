import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const Friends = () => {

    const [users, setUsers] = useState("");

    useEffect(() => {
        getUsers();
        // eslint-disable-next-line
    }, [])

    const getUsers = async () => {
        let result = await fetch("http://localhost:5000/getUsers");
        result = await result.json();
        setUsers(result);
    }

    return (
        <>
            <form className='friendsForm text-center mt-5'>
                <input className='ps-4 pe-5 py-2 me-1' type="text" placeholder='Search for a friend' />
                <button className='p-2 px-3 bolder' type='submit' onClick={getUsers}>GO</button>
            </form>

            <center>
                <div className='friendsList mt-5'>
                    {
                        users.length > 0 ? users.map((items, index) => {
                            return <div className='p-2 ps-4 py-3 friendsItem' key={items._id}>
                                <i className="fa-solid fa-user fa-2xl me-4 mt-3 pt-1"></i>
                                <div className='d-block'>
                                    <p className='bolder'>{items.name}</p>
                                    <p style={{fontSize: "10px"}}>{items.username}</p>
                                </div>
                            </div>
                        }) : <p>No users</p>
                    }
                </div>
            </center>
        </>
    )
}

export default Friends
