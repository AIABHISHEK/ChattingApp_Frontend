import React from 'react';

import './Infobar.css';

const Infobar = ({ room }) => (

    <div className='infoBar'>
        <div className='leftInnerContainer'>
            {/* <img className='onlineIcon' src="" alt="img" /> */}
            <h3>{room}</h3>
        </div>
        <div className='rightInnerContainer'>
            <a href="/"> </a>
        </div>
    </div>
)
export default Infobar;