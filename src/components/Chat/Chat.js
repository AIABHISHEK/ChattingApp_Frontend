import React , {useEffect, useState} from 'react';
import io from 'socket.io-client';
// import queryString from 'query-string';
import { useSearchParams } from 'react-router-dom';
import Infobar from '../../components/Infobar';
import Input from '../../components/Input/Input';
import Messages from '../../components/Messages/Messages';

import './Chat.css';


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
    useEffect(() => {
        socket.on('UserJoinMessage', (message) => {
            console.log(message);
            setMessages([...messages ,message]);
        });
    }, [messages]);
    useEffect(() => {
        socket.on('WelcomeMessage', (message) => {
            console.log(message);
            setMessages([message]);
        });
    }, [messages]);

    function sendMessage(event){
        event.preventDefault();
        socket.emit('sendMessage', {name, message}, () => setMessage(''));
    }
    return (
        <div className='outerContainer'>
            <div className='container'>
                <Infobar room={room} />
                
                <div className='all-messages'>
                    <Messages messages={messages} name={name} />
                </div>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chat;