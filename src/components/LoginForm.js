import React from 'react'
import "../index.css"


function LoginForm({ login, error, changeMode, details, setDetails }) {

    function dataChange(event){
        setDetails(prevData => {return {
            ...prevData, [event.target.name] : event.target.value}
        })
    }
    
    function modeChange(event){
        event.preventDefault();
        changeMode(2);
    }
    
    const submitHandler = e => {
        e.preventDefault();
        login(details);
        document.getElementById("username").value=""
        document.getElementById("password").value=""
        details.username=""
        details.password=""
    }

    return (
         
    <form onSubmit = { submitHandler }>
        <div className="login-wrap">
            <div className="login-html">
            <div className="col-md-6 mx-auto p-0">
                    <div className="login-box">
                        <div className="login-snip">
                        <h2 ></h2> {
                                    (error != "") ? ( 
                                    <div className = "bar error"> {error} </div>) : ""}
                            <input id="tab-1" value ="Login" type="radio" name="tab" className="sign-in" defaultChecked />
                            <label htmlFor="tab-1" className= "tab" checked>Login</label>
                            <input id="tab-2" value ="Sign-Up" type="radio" name="tab" className="sign-up" onClick={modeChange}></input>
                            <label htmlFor="tab-2" className= "tab">Sign Up</label>
                            <div className = "form-inner" >
                                <div className="login-space">
                                    <div className = "group">
                                        <label htmlFor = "username" className="label">Username:</label>
                                        <input type = "text" className='input' name = "username" id = "username" placeholder="Enter your username" onChange = {dataChange} value = { details.username }/>
                                    </div>
                                    <div className = "group">
                                        <label htmlFor = "password" className="label" > Password: </label> 
                                        <input type = "password"  className='input' name = "password" id = "password" placeholder="Enter your password" onChange = {dataChange} value = { details.password }/> 
                                    </div >
                                    <div className='group'> 
                                    <input type = "submit" value = "Login" className='button' id="submit-button"/>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
        </div> 
    </form >

        )
    }

    export default LoginForm