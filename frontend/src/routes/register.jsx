import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/endpoints";

const Register=()=>{
    const [username,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [firstname,setFirstName]=useState('');
    const [lastname,setLastName]=useState('');
    const [email,setEmail]=useState('');
    const [registration,setRegistration]=useState('');
    const nav= useNavigate();
    
    const handleRegister=async ()=>{
       if(password === confirmPassword){
        try{
            await register(username,email,firstname,lastname,password,registration);
            nav('/login')
        }catch{
            alert('Invalid data')
        }
       }
    }
    return (
        <>
        <form>
            <input type="text" onChange={(e)=>setUserName(e.target.value)} placeholder="Username" />
            <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="password" />
            <input type="password" onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="confirm password" />
            <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="email" />
            <input type="text" onChange={(e)=>setFirstName(e.target.value)} placeholder="first name" />
            <input type="text" onChange={(e)=>setLastName(e.target.value)} placeholder="last name" />
            <input type="text" onChange={(e)=>setRegistration(e.target.value)} placeholder="Registration number" />
            <button onClick={handleRegister}>Register</button>
        </form>
        </>
    )
}
export default Register;