import Navbar from "./navbar";

const Layout=({children})=>{
    return (
        <>
        <Navbar></Navbar>
        <div>{children}</div>
        </>
    )
}
export default Layout;