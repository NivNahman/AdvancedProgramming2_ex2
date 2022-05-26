import "./ChatScreen2.css"
import "./Right Side/Text Box/TextBox.css"
import LeftSide from "./Left Side/LeftSide";
import RightSide from "./Right Side/RightSide";
import React ,{useEffect} from "react";
import {Modal} from 'react-bootstrap';
import { StyledEngineProvider } from "@mui/material";
import SelectInput from "@material-ui/core/Select/SelectInput";
import { HubConnectionBuilder } from "@microsoft/signalr";

//* THINGS WE NEED TO DO: 
//* DVIR WILL DO A FUNCTION THAT RETURNS IF A SPECIFIC USER EXISTS 
//* TO FINISH THE ADD USER IN THIS PAGE 

function ChatScreen({ me, setUser, myContacts, setmyContacts, Logout}) {
    const[isTalking,setIsTalking] = React.useState(0);
    const[currentChat,setcurrentChat] = React.useState({});
    const[connection, setConnection] = React.useState(null);
    //const[name, setName] = React.useState("");
    const[plaster, setPlaster] = React.useState(1);
    const name = React.useRef("");

    async function getNewchat(){
        if(name.current!=""){
        await fetch('http://localhost:7261/api/contacts/'+ name.current +'/' + me.username)
                        .then(async res=>res.json())
                        .then(async data=>{
                            if(data.status!=404){ 
                                console.log("the new chat is", data);
                                setcurrentChat(data);
                            }
                            else{
                                alert("Not Found - code 404");
                            }
                    })
                }
        await fetch('http://localhost:7261/api/Users/chats/' + me.username)
            .then(async res=>res.json())
            .then(data=>{
                if(data.status!=404){
                setmyContacts(data);
            }
            else{
                alert("Not Found - code 404");
            }
            });
    }
    async function addNewContact(){
        await fetch('http://localhost:7261/api/Users/chats/' + me.username)
            .then(async res=>res.json())
            .then(data=>{
                if(data.status!=404){
                    console.log("the data is", data);
                    console.log("the data.status is", data.status);
                setmyContacts(data);
            }
            else{
                console.log("the data.status is", data.status);
                alert("Not Found - code 404");
            }
            });
    }

    useEffect(() => {
        const conn = new HubConnectionBuilder()
        .withUrl('http://localhost:7261/Hubs/MyHub')
        .withAutomaticReconnect()
        .build();
        setConnection(conn)
    },[]);

    useEffect(() => {
        if(connection) {
            connection.start()
                .then(() => {
                    connection.on('RecievedMessage', dst => {
                        if (me.username == dst){
                            getNewchat();
                    }
                })
                    connection.on('FriendRequest', dst => {
                        if (me.username == dst){
                            console.log("got in friend request")
                            addNewContact();
                    }
                })
            })
        .catch(e => console.log('Connection failed:', e));  
        }   
        //setPlaster(plaster+1);   
    },[connection]);

    if(isTalking == 0){
    return (
        <table className="chat-screen">
            <tbody>
            <tr>
                <th className="left-side">
                <LeftSide me={me} setIsTalking = {setIsTalking} myContacts = {myContacts} setmyContacts = {setmyContacts} setcurrentChat={setcurrentChat} Logout={Logout} name={name} connection={connection}/>
                </th>
                <th className="right-side" id="back-image">
                </th>
            </tr>
            </tbody>
        </table>

    );
    }
    else{
        return(
            <table className="chat-screen">
            <tbody>
            <tr>
                <th className="left-side">
                <LeftSide me={me} setIsTalking = {setIsTalking} myContacts = {myContacts} setmyContacts = {setmyContacts} setcurrentChat={setcurrentChat} Logout={Logout} name={name} connection={connection}/>
                </th>
                <th className="right-side">
                <RightSide me={me} currentChat={currentChat} setcurrentChat = {setcurrentChat} setmyContacts = {setmyContacts} connection={connection}/>
                </th>
            </tr>
            </tbody>
        </table>
        );
    }
}

export default ChatScreen;
