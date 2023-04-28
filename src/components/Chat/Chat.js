import React , {useEffect, useState} from 'react';
import io from 'socket.io-client';
// import queryString from 'query-string';
import { useSearchParams } from 'react-router-dom';

let socket;


const Chat = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
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
        socket.emit('join', {name, room});

        return () => {
            // when this component dismount disconnect and turn off socket for this instance of client
            socket.emit('disconnect');
            socket.off();
        }
    },[URL, window.location.search])
    return (
        <h1> hello </h1>
    )
}

export default Chat;