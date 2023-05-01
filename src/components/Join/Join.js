import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Join.css';

const Join = () => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');


    return (
        <div className='joinOuterContainer'>
            <div className='joinInnerContainer'>
                <h1 className='heading'>Join  Chat Room</h1>
                <div>
                    <input type="text" className="joinInput mt-25" placeholder='Name' name="name" onChange={(e)=> setName(e.target.value)}/>
                </div>
                <div>
                    <input type="text" className="joinInput mt-25" placeholder='Room' name="room" onChange={(e) => setRoom(e.target.value)}/>
                </div>
                 <Link onClick={ (e)=> (!name || !room)? e.preventDefault(): null} to={`/chat?name=${name}&room=${room}`}>
                    <button className='button .br-15 mt-25' type="submit">Sign</button>
                 </Link>
            </div>
        </div>
    )
}

export default Join;