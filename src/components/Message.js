import React, { useState } from 'react';

const TextMsg = (props) => {
return <p className='textMsg p-2 ps-3 pe-4 mx-5 mt-1 rounded-3'>{props.msgVal}</p>
}

const Message = () => {

    const [msgVal, setMsgVal] = useState('');
    const [msg, setMsg] = useState([]);

    const sendMsg = () => {
        console.log('object');
        setMsg(msg.concat(<TextMsg msgVal={msgVal} key={msg.length} />));
        setMsgVal('');
    }

    return (
        <div style={{ height: '91vh'}}>
            <div className='messageBox'>
                {msg}
            </div>
            <div className='send d-flex align-items-center justify-content-center'>
                <form className='d-flex justify-content-center'>
                    <input value={msgVal} type="text" placeholder='Enter Your Message Here' autoFocus onChange={(e)=>{setMsgVal(e.target.value)}} />
                    <div type="submit" onClick={sendMsg} className="sendBtn">
                    <i className="fa-solid fa-paper-plane fa-2x"></i>
                    </div>
                </form>
            </div>
            </div>
    )
}

export default Message
