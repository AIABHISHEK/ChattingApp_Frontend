import React , {useEffect, useState} from 'react';
import io from 'socket.io-client';
// import queryString from 'query-string';
import { useSearchParams } from 'react-router-dom';

let socket;


const Chat = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const URL = 'http://localhost:5000'
    useEffect(()=>{
        let pageHref = window.location.search;
        const searchParams = new URLSearchParams(pageHref.substring(pageHref.indexOf('?')));
        const name = searchParams.get('name');
        const room = searchParams.get('room')

        socket = io(URL);
        console.log(socket);
        setName(name);
        setRoom(room);
        socket.emit('join', {name, room}, () => {  });
        
        socket.on('joined_room', (data)=>{
            console.log(data);
        });

        return () => {
            // when this component dismount disconnect and turn off socket for this instance of client
            socket.emit('disconnect');
            socket.off();
        }
    },[URL, window.location.search])

    useEffect(()=>{
        socket.on('message', (message)=>{
            console.log(message);
            setMessages([...messages, message]);
        });
    }, [messages]);
    function sendMessage(event){
        event.preventDefault();
        socket.emit('sendMessage', {name, message}, () => setMessage(''));
    }
    return (
        <div className='outerContainer'>
            <div className='container'>
                <input type="text" defaultValue={message} value={message} name='message' onChange={(e) => setMessage(e.target.value)} onKeyDownCapture={(e) => e.key === 'Enter' ? sendMessage(e):null} />
            </div>
        </div>
    )
}

export default Chat;