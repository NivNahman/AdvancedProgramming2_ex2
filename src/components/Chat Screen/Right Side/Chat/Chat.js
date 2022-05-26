import React from 'react';
import Message from './Message/Message';
import "./Chat.css"

function Chat({ me , chat}) {
    return(
        
        <ul className='messages-list'>
            {
                chat.map((message, key) => 
                    <li className="clearfix" key={key}>
                        <Message message = {message}/>
                    </li>
                )
            }  
        </ul>

    )
}
export default Chat;