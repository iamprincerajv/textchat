import React from 'react'
import { useNavigate } from 'react-router-dom';

const Dialog = (props) => {

    const navigate = useNavigate();

    const deleteUser = async () => {
        let name = localStorage.getItem("name");
        let username = localStorage.getItem("username");
        let email = localStorage.getItem("email")
        if(localStorage.getItem("token")) {
            let result = await fetch(`http://localhost:5000/deleteUser/${name}/${username}/${email}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `bearer ${localStorage.getItem("token")}`
                }
            });
            result = await result.json();
            localStorage.clear();
            navigate("/login");
            console.log(result)
        }
    }

    return (
        <div className={props.dialogClass.join(" ")}>
            <center>
                <p>Are you sure?</p>
                <button onClick={()=>{props.setDialogClass(["dialog", "pt-4"])}}>No</button>
                <button onClick={deleteUser}>Yes</button>
            </center>
        </div>
    )
}

export default Dialog
