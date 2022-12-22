import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Message = () => {

    const [msgVal, setMsgVal] = useState([]);
    const [msg, setMsg] = useState([]);
    const navigate = useNavigate("");

    const ref = useRef(null);

    useEffect(() => {
        if (!localStorage.getItem("friendToChat")) {
            navigate("/");
        }
        setInterval(() => {
            getMsg();
        }, 100);

        setTimeout(() => {
            scrollMsgBox();
        }, 500);
        //eslint-disable-next-line
    }, []);

    const getMsg = async () => {
        let username = localStorage.getItem("username");
        let friendToChat = localStorage.getItem("friendToChat");
        let result = await fetch(`http://52.66.179.35:5000/getMsg/${username}/${friendToChat}`, {
            headers: {
                "Authorization": `bearer ${localStorage.getItem("token")}`
            }
        });
        result = await result.json();
        setMsgVal(result);
    }

    const sendMsg = async () => {
        if (msg.length > 0) {
            // setMsg(msg.concat(<TextMsg msgVal={msgVal} key={msg.length} />));
            setMsg('');
            ref.current.focus();

            let username = localStorage.getItem("username");

            let result = await fetch("http://52.66.179.35:5000/sendMsg", {
                method: "POST",
                body: JSON.stringify({ username: username, messageMe: msg, friendToChat: localStorage.getItem("friendToChat"), friendToChatName: localStorage.getItem("friendToChatName") }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${localStorage.getItem("token")}`
                }
            });

            // eslint-disable-next-line
            result = await result.json();

            getMsg();

            setTimeout(() => {
                scrollMsgBox();
            }, 200);

        } else {
            ref.current.focus();
        }
    }

    const deleteMsg = async (msgId) => {
        let result = await fetch(`http://52.66.179.35:5000/delete/${msgId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `bearer ${localStorage.getItem("token")}`
            }
        });
        result = await result.json();
        if (result) {
            getMsg();
        }
    }

    const showMore = async (id) => {
        let delBtn = document.getElementById(id);
        if (delBtn) {
            if (delBtn.style.display === "none") {
                delBtn.style.display = "block";
            } else if (delBtn.style.display === "block") {
                delBtn.style.display = "none";
            }
        }
    }

    const scrollMsgBox = () => {
        const element = document.querySelector("#messageBox");
        element.scrollTop = element.scrollHeight;
    }

    return (
        <div style={{ height: '90vh', width: "100%", position: "fixed", top: "9.5vh" }}>
            <div className='messageBox' id='messageBox'>
                {
                    msgVal.length > 0 ? msgVal.map((items, index) => {
                        return <div className=' mt-2' key={items._id}>
                            {
                                items.username === localStorage.getItem("username") ? <div className='d-flex justify-content-start'>
                                    <div onClick={() => { showMore(items._id) }} className='textMsg p-2 ps-3 pe-3 me-3 mx-sm-3 mx-lg-5 rounded-3' style={{ backgroundColor: "darkslategrey" }}>
                                        <p style={{ fontSize: '14px', color: "yellow", fontStyle: "italic" }} className='ps-1'>
                                            {
                                                items.username === localStorage.getItem("username") ? "You" : localStorage.getItem("friendToChatName")
                                            }
                                        </p>
                                        {items.messageMe}</div>
                                    {
                                        items.username === localStorage.getItem("username") ? <i onClick={() => { deleteMsg(items._id) }} style={{ cursor: "pointer", display: "none" }} className={`pt-2 mt-1 fa-sharp fa-solid fa-trash`} id={`${items._id}`}></i> : ""
                                    }
                                </div> : <div className='d-flex justify-content-end'>
                                    <div onClick={() => { showMore(items._id) }} className='textMsg p-2 ps-3 pe-3 mx-sm-3 mx-lg-5 rounded-3'>
                                        <p style={{ fontSize: '14px', color: "yellow", fontStyle: "italic" }} className='ps-1'>
                                            {
                                                items.username === localStorage.getItem("username") ? "You" : localStorage.getItem("friendToChatName")
                                            }
                                        </p>
                                        {items.messageMe}</div>
                                    {
                                        items.username === localStorage.getItem("username") ? <i onClick={() => { deleteMsg(items._id) }} style={{ cursor: "pointer", display: "none" }} className={`pt-2 mt-1 fa-sharp fa-solid fa-trash`} id={`${items._id}`}></i> : ""
                                    }
                                </div>
                            }
                        </div>
                    }) : <p className='text-center'>No messages yet</p>
                }
            </div>
            <div className='send d-flex align-items-center justify-content-center row'>
                <form className='d-flex justify-content-center col-xl-4 col-lg-6 col-md-7 col-sm-8'>
                    <input ref={ref} value={msg} type="text" placeholder='Enter Your Message Here' onChange={(e) => { setMsg(e.target.value) }} />
                    <div type="submit" onClick={sendMsg} className="sendBtn">
                        <i className="fa-solid fa-paper-plane fa-2x"></i>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Message
