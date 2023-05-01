import React from 'react';

import './Input.css';

const Input = ({ message, setMessage, sendMessage }) => (
    <form className='form'>
        <input className='input' type="text" placeholder='message...' defaultValue={message} value={message} name='message' onChange={(e) => setMessage(e.target.value)} onKeyDownCapture={(e) => e.key === 'Enter' ? sendMessage(e) : null} />
        <button className='sendButton' type="submit" onClick={(e) => sendMessage(e)}>Send</button>
    </form>
        
)

export default Input;
