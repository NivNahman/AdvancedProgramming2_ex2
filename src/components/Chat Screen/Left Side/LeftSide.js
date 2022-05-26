import ContactsList from "./Contact List/ContactsList";
import MyInfo from "./My Info/MyInfo";
import React from "react";
import "./LeftSide.css";

function LeftSide({me, setIsTalking, myContacts, setmyContacts,setcurrentChat, Logout, name, connection}) {

    return (
        <>
        <table className="left">
        <tbody>
            <tr className="my-info">
                <MyInfo me={me} setmyContacts={setmyContacts} Logout={Logout} connection={connection}/>
            </tr>
            <tr className="contact-list">
                <ContactsList me={me} myContacts={myContacts} setmyContacts={setmyContacts} setIsTalking = {setIsTalking} setcurrentChat={setcurrentChat} name={name}/>
            </tr>
            </tbody>
        </table>
        </>
    );
}
export default LeftSide;