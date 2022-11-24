import React, { useState } from 'react';
import { useRef } from 'react';

const TextMsg = (props) => {
    return <div className=' mt-2 d-flex'>
        <p style={{fontSize: '15px'}} className='mx-5 ps-2'>{localStorage.getItem('name')}</p>
        <p className='textMsg p-2 ps-3 pe-4 mx-3 rounded-3'>{props.msgVal}</p>
    </div>
}

const Message = () => {

    const [msgVal, setMsgVal] = useState('');
    const [msg, setMsg] = useState([]);

    const ref = useRef(null);

    const sendMsg = async () => {
        if (msgVal.length > 0) {
            setMsg(msg.concat(<TextMsg msgVal={msgVal} key={msg.length} />));
            setMsgVal('');
            ref.current.focus();

            let username = localStorage.getItem("username");

            let result = await fetch("http://localhost:5000/sendMsg", {
                method: "POST",
                body: JSON.stringify({username: username, message: msgVal}),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            result = await result.json();

            console.log(result)
        } else {
            ref.current.focus()
        }
    }

    return (
        <div style={{ height: '91vh' }}>
            <div className='messageBox'>
                {msg}
            </div>
            <div className='send d-flex align-items-center justify-content-center'>
                <form className='d-flex justify-content-center'>
                    <input ref={ref} value={msgVal} type="text" placeholder='Enter Your Message Here' autoFocus onChange={(e) => { setMsgVal(e.target.value) }} />
                    <div type="submit" onClick={sendMsg} className="sendBtn">
                        <i className="fa-solid fa-paper-plane fa-2x"></i>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Message
