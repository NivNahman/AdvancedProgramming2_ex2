import User from "./User"
import "./ContactsList.css"
import React, { useEffect } from "react"

function ContactsList({ me, myContacts,setmyContacts,setIsTalking, setcurrentChat, name}) {
  
    function getLastMessage(arr){
        if (arr.length == 0){
            return ""
        }
        else{
            return arr[arr.length-1]
        }
    }
    function submitHandler(event){
        for(var i = 0;i<myContacts.length;i++){
            if(event.currentTarget.id == myContacts[i].contact.id){
                fetch('http://localhost:7261/api/contacts/'+ myContacts[i].contact.id +'/' + me.username)
                .then(res=>res.json())
                .then(data=>{
                    setcurrentChat(data);
                //updatedChat.current = data;
                name.current = data.contact.id;
                setIsTalking(1);    
            });
        }
        }
    }
   
    return (
        <>
        <ul className="friends-list">
        {myContacts.map((chat, key) => 
                     <li className="clearfix" key={key}>
                        <button onClick={submitHandler} id={chat.contact.id} type="button" className="btn btn-light user-button">
                        <User contact = {chat.contact} lastMessage={chat.contact.last} lastMessageDate={chat.contact.lastdate} />
                        </button>
                     </li>                       

                 )
        }
        </ul>
        </>
    )
}
export default ContactsList