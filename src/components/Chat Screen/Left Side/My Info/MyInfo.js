import React from "react"
import "./MyInfo.css"
import addIcon from "./add-user.png"
import {Modal} from 'react-bootstrap';
import { LocalDiningOutlined } from "@material-ui/icons";


function MyInfo({me, setmyContacts, Logout, connection}) {

    var username = ''
    var nickname = ''
    var server = ''

    const[show,setShow] = React.useState(false);
    const[neg,setNeg] = React.useState(true);

        async function addUser(){ 
            console.log("the USERNAME is;", me.username);
                if(me.username === username){
                    alert("you cant add yourself to the chat list")
                    return
                }
                else{
                    console.log("the server is", server);
                    await fetch('http://'+ server +'/api/invitations',{
                        method: 'POST',
                        headers:{
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify({
                            from: me.username,
                            to: username,
                            server: 'localhost:7261'
                        })
                    })
                    //.then(res=>res.json())
                    .then(data=>{
                        if(data.status==201){
                            fetch('http://localhost:7261/api/contacts/Adduser',{
                            method: 'POST',
                            headers:{
                                'Content-Type': 'application/json'
                            },
                            body:JSON.stringify({
                                connecteduser: me.username,
                                id: username,
                                name: nickname,
                                server: server
                            })
                        })
                        .then(res => res.json())
                        .then(data=>{
                            if(data.status!=404){
                                setmyContacts(data)
                            }
                            else{
                                alert("Cannot add contact - code 404")
                            }
                        })
                        }
                        else{
                            alert("Cannot add contact - code 404")
                        }
                    })
                    .catch(e => {alert("Cannot add contact - code 404");console.log("There Was An Error, ",e); setNeg(false);return})
                await connection.invoke('addNewUser', username); 
                }
            }

    return (
        <>

        <table className="myInfo">
            <tbody>
                <tr>
                    <th className="my-img">
                        <img className="img rounded-circle" src={me.img} alt="img"></img>
                    </th>
                    <th className="my-name">
                        {me.nickname}
                    </th>
                    <th className="add-friend">
                        <button type="button" className="btn btn-light add-friend-btn container" onClick={()=>{setShow(true)}}>
                            <img className="add-friend-bton" src={addIcon} alt="add user"></img>
                        </button>
                </th>
                <th className="logout">
                <button type="button" className="btn btn-light small-btn" onClick={()=>Logout()}>
                            Logout
                        </button>
                </th>
                </tr>
            </tbody>
        </table>

        {show && < Modal show={show}>
        <Modal.Header closeButton onClick={()=>setShow(false)}>
            <Modal.Title id="contained-modal-title-vcenter">
                Add new chat
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input placeholder="Enter Username" id="newContact" onChange={(e) => username = e.target.value}></input>
            <input placeholder="Enter nickname" id="newName" onChange={(e) => nickname = e.target.value}></input>
            <input placeholder="Enter server" id="newServer" onChange={(e) => server = e.target.value}></input>
        </Modal.Body>
        <Modal.Footer>
            <button variant="danger" onClick={()=>setShow(false)}>Close</button>
            <button onClick={() => {addUser();setShow(false)}} >Submit</button>
        </Modal.Footer>
        </Modal>}

        </>

    );
}
export default MyInfo;