import React, { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import ChatScreen from "./components/Chat Screen/ChatScreen";
import defpic from "../src/default_picture.jpeg"


function App() {
    
    const [details, setDetails] = React.useState({ username: "",nickname:"", img: "" ,password: "",password2:"" });
    const [mode, setMode] = React.useState(1);
    const [user, setUser] = React.useState({username: "", nickname: "", password: "", img: "", chats:[] });
    const [error, setError] = React.useState("");
    const [image, setImage] = React.useState("");
    const[myContacts, setmyContacts] = React.useState([]);
    const[flag,setFlag] = React.useState(0);
    //const[connection, setConnection] = React.useState(null);


    
    async function getnewMyContacts(){
        await fetch('http://localhost:7261/api/Users/chats/' + user.username)
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
    // useEffect(() => {
    //     const newConnect = new HubConnectionBuilder()
    //     .withUrl('https://localhost:7261/MyHub')
    //     .withAutomaticReconnect()
    //     .build();
    //     setConnection(newConnect)
    // },[])
    
    // useEffect(async () => {
    //     if(connection) {
    //         connection.start()
    //         .then(async() => {
    //             console.log("CONNECTED!");
    //             connection.invoke("ChangedRecieved", user);
    //             connection.on("ChangedRecieved", async message => {
    //                 console.log("I got a message ");
    //                 getnewMyContacts();
    //             })
    //         })
    //     }
    // })
    function login(details) {
         
        fetch('http://localhost:7261/api/Users/login/' + details.username + "/" + details.password,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                username: details.username,
                password: details.password
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.status != 404){
                setUser({
                    username: data.username,
                    nickname: data.nickname,
                    password: data.password,
                    img: defpic,
                    chats: data.chats
                });}
            else{
                alert("username or password are incorrect");
            }    
       })
    }    
   

    function signUp(details){
        if(details.username == "" || details.password == "" || details.nickname == "" || details.password2 == ""){
            setError("There is an Empty Field");
            return;
        }
        else if(details.username.length<8){
            setError("Username Must Be At Least 8 Characters");
            return;
        }
        else if(details.password.length < 8){
            setError("Password Must Be At Least 8 Characters");
            return;
        }
        else if (details.password.search(/[A-Z]/) == -1) {
            setError("Your Password needs a Higher case letter");
            return;
        }
        else if (details.password.search(/[a-z]/) == -1) {
            setError("Your Password needs a Higher case letter");
            return;
        }
        else if(details.password != details.password2){
            setError("Passwords Do Not Match");
            return;
        }
        else{
            fetch('http://localhost:7261/api/Users/signUp?username=' + details.username +'&nickname=' + details.nickname + '&password=' + details.password,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    username: details.username,
                    nickname: details.nickname,
                    password: details.password,
                })
            })
            .then(res => res.json())
            .then(data=>{
                if(data.status != 400){
                setUser({
                    username: data.username,
                    nickname: data.nickname,
                    password: data.password,
                    img: defpic,
                    chats: []
                })
            }
            else{
                alert("username is already in use");
            }
            })
        }
    };
        
    function Logout(){
        setUser({ username: "", password: "" });
        setFlag(0);
        setMode(1);
    }

    function changeMode(num){
        setError("");
        setMode(num);
    }

    if(mode === 1){ 
        return ( 
            <div className = "App" > {
                    (user.username != "") ? ( 
                        changeMode(3)
                    ) : ( <
                        LoginForm login = { login }
                        error = { error }
                        changeMode = {changeMode}
                        details ={details}
                        setDetails = {setDetails}
                        />
                    )
                } </div>
            );
    }

    if(mode === 2){
        return ( 
            <div className = "App" > {
                    (user.username != "") ? ( 
                        changeMode(3)
                    ) : ( <
                        SignUpForm signUp={signUp} 
                        error = { error }
                        changeMode = {changeMode}
                        image ={image}
                        setImage={setImage}
                        details ={details}
                        setDetails = {setDetails}
                        />
                    )
                } </div>
            );
    }

    if(mode === 3){
        if(flag == 0){
            fetch('http://localhost:7261/api/Users/chats/' + user.username)
            .then(res=>res.json())
            .then(data=>{
             setmyContacts(data);
            })
             setFlag(1);
    }
        return(
            <div className = "App" > {
                 <ChatScreen me = {user} setUser = {setUser} myContacts={myContacts} setmyContacts={setmyContacts} Logout={Logout}/>
        } </div>
        );
    }
}
export default App;
    