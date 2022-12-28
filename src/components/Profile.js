import React, { useEffect, useState } from 'react'
import UpdateProfile from './UpdateProfile';

const Profile = () => {

    const [name, setName] = useState("Name");
    const [username, setUsername] = useState("Username");
    const [email, setEmail] = useState("Email Address");
    const [updateClass, setUpdateClass] = useState(["updatePro"]);

    useEffect(() => {
        getProfile();
        // eslint-disable-next-line 
    }, [])

    const getProfile = async () => {
        let key1 = localStorage.getItem("email");
        let key2 = localStorage.getItem("friendToChat");

        if (!localStorage.getItem("friendToChat")) {
            let result = await fetch(`http://localhost:5000/getProfile/${key1}`, {
                headers: {
                    "Authorization": `bearer ${localStorage.getItem("token")}`
                }
            });
            result = await result.json();

            if (result) {
                setName(result[0].name);
                setUsername(result[0].username);
                setEmail(result[0].email);
                localStorage.setItem("name", result[0].name);
                localStorage.setItem("username", result[0].username);
                localStorage.setItem("email", result[0].email);
            }
        } else {
            let result = await fetch(`http://localhost:5000/getProfile/${key2}`, {
                headers: {
                    "Authorization": `bearer ${localStorage.getItem("token")}`
                }
            });
            result = await result.json();

            if (result) {
                setName(result[0].name);
                setUsername(result[0].username);
                setEmail(result[0].email);
            }
        }
    }

    const showUpdate = (e) => {
        e.preventDefault();

        setUpdateClass(["updatePro", "updateActive"]);
    }

    return (
        <>
            <div className='profile p-3'>
                <h2 className='text-center mb-5'>Profile</h2>
                <center>
                    <div className="mb-4">
                        <div className="profileImg">
                            <i className="fa-solid fa-user fa-4x my-2 mx-2"></i>
                        </div>
                    </div>
                    <div className="profileData">
                        <div className='d-flex justify-content-center'>
                            <p className='profileLabel'>Name</p>
                            <p className='labelAns'>{name}</p>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <p className='profileLabel'>Username</p>
                            <p className='labelAns'>{username}</p>
                        </div>
                        {
                            !localStorage.getItem("friendToChat") ? <div className='d-flex justify-content-center'>
                                <p className='profileLabel'>Email Address</p>
                                <p className='labelAns'>{email}</p>
                            </div> : ""
                        }
                    </div>
                    {
                        !localStorage.getItem("friendToChat") ? <button onClick={showUpdate} className='editBtn mt-4 p-1 px-5'>Edit Your Profile</button> : ""
                    }
                </center>
            </div>
            {
                !localStorage.getItem("friendToChat") ? <UpdateProfile updateClass={updateClass} setUpdateClass={setUpdateClass} getProfile={getProfile} /> : ""
            }
        </>
    )
}

export default Profile
