import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// const TextMsg = (props) => {
//     return <div className=' mt-2 d-flex'>
//         <p style={{fontSize: '15px'}} className='mx-5 ps-2'>{localStorage.getItem('name')}</p>
//         <p className='textMsg p-2 ps-3 pe-4 mx-3 rounded-3'>{props.msgVal}</p>
//     </div>
// }

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
        }, 100)
        //eslint-disable-next-line
    }, []);

    const getMsg = async () => {
        let username = localStorage.getItem("username");
        let friendToChat = localStorage.getItem("friendToChat");
        let result = await fetch(`http://13.233.193.253:5000/getMsg/${username}/${friendToChat}`);
        result = await result.json();
        setMsgVal(result);
    }

    const sendMsg = async () => {
        if (msg.length > 0) {
            // setMsg(msg.concat(<TextMsg msgVal={msgVal} key={msg.length} />));
            setMsg('');
            ref.current.focus();

            let username = localStorage.getItem("username");

            let result = await fetch("http://13.233.193.253:5000/sendMsg", {
                method: "POST",
                body: JSON.stringify({ username: username, messageMe: msg, friendToChat: localStorage.getItem("friendToChat"), friendToChatName: localStorage.getItem("friendToChatName") }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            result = await result.json();
            console.log(result)

            getMsg();
        } else {
            ref.current.focus();
        }
    }

    const deleteMsg = async (msgId) => {
        let result = await fetch(`http://13.233.193.253:5000/delete/${msgId}`, {
            method: "DELETE"
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

    return (
        <div style={{ height: '91vh' }}>
            <div className='messageBox'>
                {
                    msgVal.length > 0 ? msgVal.map((items, index) => {
                        return <div className=' mt-2' key={items._id}>
                            {
                                items.username === localStorage.getItem("username") ? <div className='d-flex justify-content-start'>
                                <p onClick={() => { showMore(items._id) }} className='textMsg p-2 ps-3 pe-3 mx-3 rounded-3'>
                                    <p style={{ fontSize: '14px', color: "yellow", fontStyle: "italic" }} className='ps-1'>
                                        {
                                            items.username === localStorage.getItem("username") ? "You" : localStorage.getItem("friendToChatName")
                                        }
                                    </p>
                                    {items.messageMe}</p>
                                {
                                    items.username === localStorage.getItem("username") ? <i onClick={() => { deleteMsg(items._id) }} style={{ cursor: "pointer", display: "none" }} className={`pt-2 mt-1 fa-sharp fa-solid fa-trash`} id={`${items._id}`}></i> : ""
                                }
                            </div> : <div className='d-flex justify-content-end'>
                                <p onClick={() => { showMore(items._id) }} className='textMsg p-2 ps-3 pe-3 mx-3 rounded-3'>
                                    <p style={{ fontSize: '14px', color: "yellow", fontStyle: "italic" }} className='ps-1'>
                                        {
                                            items.username === localStorage.getItem("username") ? "You" : localStorage.getItem("friendToChatName")
                                        }
                                    </p>
                                    {items.messageMe}</p>
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
