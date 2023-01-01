import React, { useState } from 'react'

const UpdateProfile = (props) => {

    const [name, setName] = useState(localStorage.getItem("name"));
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const email = localStorage.getItem("email");

    const updateProfile = async (e) => {
        e.preventDefault();

        if(name.length > 2 && username.length > 2 && username.length < 16) {
            let result = await fetch(`http://3.109.144.2:5000/updateProfile/${email}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({name, username})
            });

            // eslint-disable-next-line
            result = await result.json();

            props.getProfile();
            props.setUpdateClass(["updatePro"]);
        }
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
