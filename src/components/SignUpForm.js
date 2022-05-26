import React from "react";
import "../index.css"


function SignUpForm({signUp,error,changeMode,image,setImage, details,setDetails}){

    function dataChange(event){  
        if(event.target.name === 'img'){  
                setImage(URL.createObjectURL(event.target.files[0]))
        }
        else{
        setDetails(prevData => {return {
            ...prevData, [event.target.name] : event.target.value}
        })
    }
}

    const submitHandler = e => {
        e.preventDefault();
        signUp(details);
        details.username=""
        details.nickname=""
        details.password=""
        details.password2=""
    }

    function modeChange(event){
        event.preventDefault();
        changeMode(1);
    }

    return(
        <form onSubmit = { submitHandler }>
            <div className="login-wrap">
            <div className="login-html">
            <div className="col-md-6 mx-auto p-0">
                    <div className="login-box">
                        <div className="login-snip">
                         {
                                    (error != "") ? ( 
                                    <div className = "bar error"> {error} </div>) : ""}
                            <input id="tab-1" value ="Login" type="radio" name="tab" className="sign-in" onClick={modeChange}defaultChecked />
                            <label htmlFor="tab-1" className= "tab" checked>Login</label>
                            <input id="tab-2" value ="Sign-Up" type="radio" name="tab" className="sign-up" defaultChecked></input>
                            <label htmlFor="tab-2" className= "tab">Sign Up</label>
                            <div className="login-space">    
                                <div className="sign-up-form">
                                    <div className="group">
                                        <label htmlFor="user" className="label">Username</label>
                                        <input type="text" name="username" className="input" placeholder="Create your Username" onChange = {dataChange} value = { details.username }/>
                                    </div>
                                    <div className="group">
                                        <label htmlFor="user" className="label">Nickname</label>
                                        <input type="text" name = "nickname" className="input" placeholder="Create your Nickname" onChange = {dataChange} value = { details.nickname }/>
                                    </div>
                                    {/* <div className="group">
                                        <label htmlFor="pass" className="label">Picture</label>
                                        <input type="file" accept="image/png, image/jpeg" name = "img" className="input" placeholder="Choose a picture" onChange={dataChange} />
                                    </div> */}
                                    <div className="group">
                                        <label htmlFor="pass" className="label">Password</label>
                                        <input type="password" name = "password" className="input" data-type="password" placeholder="Create your password" onChange = {dataChange} value = { details.password }/>
                                    </div>
                                    <div className="group">
                                        <label htmlFor="pass" className="label">Repeat Password</label>
                                        <input type="password" name = "password2" className="input" data-type="password" placeholder="Repeat your password" onChange = {dataChange} value = { details.password2 }/>
                                    </div>
                                    <div className="group">
                                        <input type="submit" value="Sign Up" className="button" id="submit-button" />
                                    </div>
                                    <div className="hr" />
                                    <div className="foot r">
                                        <label htmlFor="tab-1">Already Member?</label>
                                    </div>
                                </div>    
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>
        </form>
    )};
export default SignUpForm