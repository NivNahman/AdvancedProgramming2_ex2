import "./Message.css"
function Message({ message }) {
    if(message.sent){
        return (
            <div className="my-message">
                {message.content}
                <p className="date">
                    {message.created.slice(11, 16)}
                    {/* {message.date.getHours()}:{message.date.getMinutes()} | {message.date.getDate()}.{message.date.getMonth()}.{message.date.getFullYear()} */}
                </p>
            </div>
        );
    }
    return(
        <div className="his-message">
                {message.content}
                <p className="date">
                    {message.created.slice(11, 16)}
                    {/* {message.date.getHours()}:{message.date.getMinutes()} | {message.date.getDate()}.{message.date.getMonth()}.{message.date.getFullYear()} */}
                </p>
            </div>
    )
}

export default Message;