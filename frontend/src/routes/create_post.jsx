import { useState } from "react";
import { createPost } from "../api/endpoints";

const CreatePost = () =>{
    const [description,setDescription] = useState('')
    const handleCreation=async (e)=>{
        e.preventDefault()
        try{
            await createPost(description)
        }catch{
            alert('error creating post')
        }
    }
    return (
        <>
         <form onSubmit={handleCreation}>
            <input type="text" onChange={(e)=>setDescription(e.target.value)} placeholder="Description" />
            <button type="submit">Create</button>
        </form>
        </>
    )
}
export default CreatePost;