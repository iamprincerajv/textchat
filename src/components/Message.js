import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

// const TextMsg = (props) => {
//     return <div className=' mt-2 d-flex'>
//         <p style={{fontSize: '15px'}} className='mx-5 ps-2'>{localStorage.getItem('name')}</p>
//         <p className='textMsg p-2 ps-3 pe-4 mx-3 rounded-3'>{props.msgVal}</p>
//     </div>
// }

const Message = () => {

    const [msgVal, setMsgVal] = useState([]);
    const [msg, setMsg] = useState([]);

    const ref = useRef(null);

    useEffect(()=>{
        getMsg();
        //eslint-disable-next-line
    }, []);

    const getMsg = async ()=>{
        let username = localStorage.getItem("username");
        let result = await fetch(`http://localhost:5000/getMsg/${username}`);
        result = await result.json();
        setMsgVal(result.result);
        console.log(msgVal)
    }

    const sendMsg = async () => {
        if (msgVal.length > 0) {
            // setMsg(msg.concat(<TextMsg msgVal={msgVal} key={msg.length} />));
            setMsg('');
            ref.current.focus();

            let username = localStorage.getItem("username");

            let result = await fetch("http://localhost:5000/sendMsg", {
                method: "POST",
                body: JSON.stringify({username: username, message: msg}),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            result = await result.json();

            console.log(result);
            getMsg();
        } else {
            ref.current.focus()
        }
    }

    return (
        <div style={{ height: '91vh' }}>
            <div className='messageBox'>
                {
                    msgVal.length>0 ? msgVal.map((items, index)=>{
                        return <div className=' mt-2 d-flex' key={items._id}>
                        <p style={{fontSize: '15px'}} className='mx-5 ps-2'>{localStorage.getItem('name')}</p>
                        <p className='textMsg p-2 ps-3 pe-4 mx-3 rounded-3'>{items.message}</p>
                    </div>
                    }) : <p>No messages</p>
                }
            </div>
            <div className='send d-flex align-items-center justify-content-center'>
                <form className='d-flex justify-content-center'>
                    <input ref={ref} value={msg} type="text" placeholder='Enter Your Message Here' autoFocus onChange={(e) => { setMsg(e.target.value) }} />
                    <div type="submit" onClick={sendMsg} className="sendBtn">
                        <i className="fa-solid fa-paper-plane fa-2x"></i>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Message
