import React, { useState } from 'react'

const UpdateProfile = (props) => {

    const [name, setName] = useState(localStorage.getItem("name"));
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const email = localStorage.getItem("email");

    const updateProfile = (e) => {
        e.preventDefault();
    }

    const closeUpdate = (e) => {
        e.preventDefault();

        props.setUpdateClass(["updatePro"]);
    }

    return (
        <div className={props.updateClass.join(" ")}>
            <center>
                <h5 className='mb-3 mt-5 p-2 px-3 rounded-2'>Update Your Profile</h5>
                <form className='d-block mt-5'>
                    <label htmlFor="nameInput">Name</label>
                    <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" id="nameInput" placeholder='Enter Your Name' />
                    <label htmlFor="usernameInput">Username</label>
                    <input value={username} onChange={(e) => { setUsername(e.target.value.toLowerCase()) }} type="text" id="usernameInput" placeholder='Enter A Username' />
                    <button onClick={closeUpdate} type='button' className='p-2 px-4 me-1 mt-3 text-white rounded-2'>Cancel</button>
                    <button onClick={updateProfile} type='submit' className='p-2 px-4 ms-1 mt-3 text-white rounded-2'>Update</button>
                </form>
            </center>
        </div>
    )
}

export default UpdateProfile
