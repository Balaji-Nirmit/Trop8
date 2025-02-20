import { useState } from "react";
import { useAuth } from "../store/contexts/useAuth";
import { useNavigate } from "react-router-dom";

const Login=()=>{
    const [username,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const {auth_login}=useAuth();
    const nav=useNavigate()
    const handleLogin=(e)=>{
        e.preventDefault();
        auth_login(username,password)
        
    }
    const handleNavigate=()=>{
        nav('/register');
    }
    return (
        <>
        <form onSubmit={handleLogin}>
            <input type="text" onChange={(e)=>setUserName(e.target.value)} placeholder="Username" />
            <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="password" />
            <button type="submit">Login</button>
        </form>
        click <button onClick={handleNavigate}>here</button> to create account
        </>
    )
}
export default Login;