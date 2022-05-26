import "./User.css"
import React from "react"
import defpic from "../../../../../src/default_picture.jpeg"
function User({ contact, lastMessage, lastMessageDate }) {
    var val 
    var date 
    if (lastMessage != null) {
        val = lastMessage;
        date = lastMessageDate;
         if (val.length > 15) {
            val = val.slice(0, 15) + "..."
        }
    }
    else {
        val = ""
        date = ""
    }
    return (
        <>
            <table className="user-table">
                <tbody>
                    <tr>
                        <th className="user-img">
                            <img className="image rounded-circle" src={defpic} alt="img"></img>
                        </th>
                        <th className="user-name">
                            {contact.name}
                            <div className="date">
                                <span>{val}</span>
                                <span style={{ float: "right" }}>{date.slice(11, 16)}</span>
                            </div>
                        </th>
                    </tr>
                </tbody>
            </table>

        </>
    );

}
export default User;