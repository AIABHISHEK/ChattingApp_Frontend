import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Join = () => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');


    return (
        <div className='joinOuterContainer'>
            <div className='joinInnerContainer'>
                <h1 className='heading'>Join</h1>
                <div>
                <input type="text" placeholder='Name' name="name" onChange={(e)=> setName(e.target.value)}/>
                </div>
                <div>
                <input type="text" placeholder='Room' name="room" onChange={(e) => setRoom(e.target.value)}/>
                </div>
                 <Link onClick={ (e)=> (!name || !room)? e.preventDefault(): null} to={`/chat?name=${name}&room=${room}`}>
                    <button type="submit">Sign</button>
                 </Link>
            </div>
        </div>
    )
}

export default Join;