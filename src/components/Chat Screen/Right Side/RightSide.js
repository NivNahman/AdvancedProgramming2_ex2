import "../ChatScreen2.css"
import ContactInfo from "./Contact Info/ContactInfo";
import Chat from "./Chat/Chat"
import "./RightSide.css"
import AudioMessage from "./Text Box/AudioMessage"
import React, { useEffect } from "react";
// import { HubConnectionBuilder } from "@microsoft/signalr";


function RightSide({me,currentChat, setcurrentChat, setmyContacts, connection}) {
    const[message,setMessage] = React.useState("");
    const [showMedia, setShowMedia] = React.useState(false);
    //const[connection, setConnection] = React.useState(null);

    function dataChange(event){
        setMessage(event.target.value)
    }
    
        
    async function submitHandler(event, type, text) {
        if (message != "") {
            document.getElementById('message').value = ("");
            setMessage("");
            await fetch('http://'+ currentChat.contact.server + '/api/transfer',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    from: me.username,
                    to: currentChat.contact.id,
                    content: text
                })
            })
            .then(data => {
                    if(data.status == 201){
                        console.log("id:",currentChat.contact.id)
                        console.log("me.username:",me.username)
                        fetch('http://localhost:7261/api/contacts/'+ currentChat.contact.id+ '/messages',{
                            method: 'POST',
                            headers:{
                                'Content-Type': 'application/json'
                            },
                            body:JSON.stringify({
                                connecteduser: me.username,
                                contactname: currentChat.contact.id,
                                content: text
                            })
                        })
                        .then(data=>{
                            fetch('http://localhost:7261/api/contacts/'+ currentChat.contact.id +'/' + me.username)
                            .then(res=>res.json())
                            .then(data=>{
                                if(data.status!=404){ 
                                    setcurrentChat(data);
                                    fetch('http://localhost:7261/api/Users/chats/' + me.username)
                                    .then(res=>res.json())
                                    .then(data=>{
                                        if(data.status!=404){
                                        setmyContacts(data);
                                    }
                                    else{
                                        alert("Not Found - code 404");
                                    }
                                    });
                                }
                                else{
                                    alert("Not Found - code 404");
                                }
                            });
                        })
                    }
                })
            .catch(e => {alert(currentChat.contact.id+" server is not online ");console.log("There Was An Error, ",e); return;})   
        await connection.invoke('sendMessage', currentChat.contact.id); 
    }
    setShowMedia(false);  
}
    return (
        <table className="rightSide">
            <thead>
            <tr className="contact-info">
                <ContactInfo contact={currentChat.contact} />
            </tr>
            </thead>
            <tbody>
            <tr className="chat">
                <Chat me={me} chat={currentChat.messages} />
            </tr>
            </tbody>
            <tfoot>
            <tr className="text-box">
                <table className="textBox">
                    <tr>
                        <th className="add-file">
                            <div className="dropup">
                                <button onClick={()=>setShowMedia(!showMedia)} type="button" className="butn btn dropbtn btn-light btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <svg id="i-paperclip" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                        <path d="M10 9 L10 24 C10 28 13 30 16 30 19 30 22 28 22 24 L22 6 C22 3 20 2 18 2 16 2 14 3 14 6 L14 23 C14 24 15 25 16 25 17 25 18 24 18 23 L18 9" />
                                    </svg>
                                </button>
                                {showMedia && <div className="dropup-content" >
                                    <label className="butn btn btn-light" style={{ margin: "2px" }}>
                                        <svg id="i-photo" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                            <path d="M20 24 L12 16 2 26 2 2 30 2 30 24 M16 20 L22 14 30 22 30 30 2 30 2 24" />
                                            <circle cx="10" cy="9" r="3" />
                                        </svg>
                                        <input type="file" accept="image/png, image/jpeg" hidden onChange={(event, type, text) => submitHandler(event, "img", "bla")}></input>
                                    </label>

                                    <label className="butn btn btn-light" style={{ margin: "2px" }}>
                                    <svg id="i-video" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                            <path d="M22 13 L30 8 30 24 22 19 Z M2 8 L2 24 22 24 22 8 Z" />
                                            </svg>
                                        <input type="file" accept="video/*" hidden onChange={(event, type, text) => submitHandler(event, "video", "bla")} ></input>
                                    </label>
                                    <AudioMessage submitHandler={submitHandler}/>
                                
                            </div>}
                        </div>
                        </th>
                        <th className="input-text">
                            <input type="text" className="form-control" name="message" id="message" placeholder="Enter your message here" onChange={dataChange} value={message.message}></input>
                        </th>
                        <th className="send-button">
                            <button onClick={(event, type, text) => submitHandler(event, "text", message)} type="button" className="butn btn btn-light">
                                <svg id="i-send" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                    <path d="M2 16 L30 2 16 30 12 20 Z M30 2 L12 20" />
                                </svg>
                            </button>
                        </th>
                    </tr>
                </table>
            </tr>
            </tfoot>
        </table>
    );
}
export default RightSide