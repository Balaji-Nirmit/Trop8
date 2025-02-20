import { useEffect, useState } from "react";
import { getPosts } from "../api/endpoints";
import Loader from "../components/loader";
import PostCard from "../components/postCard";

const Home=()=>{
    const [posts,setPosts] = useState([])
    const [loading,setLoading]=useState(true)
    const [nextPage,setNextPage]=useState(1)
    const fetchData=async ()=>{
        const data=await getPosts(nextPage)
        setPosts([...posts,...data.results])
        setNextPage(data.next?nextPage+1:null)
    }

    useEffect(()=>{
        try{
            fetchData()
        }catch{
            alert('error getting posts')
        }finally{
            setLoading(false)
        }
    },[])
    const handleMore=()=>{
        if(nextPage){
            fetchData()
        }
    }
    
    return (
        <>
        <div className="flex flex-col gap-2 ">
            {loading? <Loader></Loader>: posts.map((item)=>{ return <PostCard prop={item} key={item.id}></PostCard>})}
        </div>
        <button onClick={handleMore}>more</button>
        </>
    )
}
export default Home;