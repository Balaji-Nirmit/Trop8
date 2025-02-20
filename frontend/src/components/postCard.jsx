import { useState } from "react";
import { toggleLike } from "../api/endpoints";

const PostCard=({prop})=>{
    const [likeCount,setLikeCount]=useState(prop.like_count)
    const [likedByMe,setLikedByMe]=useState(prop.liked)

    const handleToggleLike=async ()=>{
        const data=await toggleLike(prop.id)
        if(data.now_liked){
            setLikeCount(likeCount+1)
            setLikedByMe(true)
        }
        else{
            setLikeCount(likeCount-1)
            setLikedByMe(false)
        }
    }
    return (
        <>
        <span className="border-2 border-black ">
            {prop.username}
            <br/>
            {prop.description}
            <br/>
            {prop.formatted_date}
            <br/>
            <div>
            {likeCount} -- {likedByMe?<button className="text-red-500" onClick={handleToggleLike}>liked</button>:<button onClick={handleToggleLike}>like</button>}
            </div>
        </span>
        </>
    )
}
export default PostCard;