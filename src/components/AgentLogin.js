import react ,{useState,useEffect}from "react";
import '../App.css';
import axios from "axios";
import {useNavigate,Navigate,Link as RouterLink} from "react-router-dom";

function AgentLogin ({setAgentId}) {
    const [emailId,setEmailId]=useState("")
    const [password,setPassword]=useState("")
    // const [jwt,setJwt]=useState("")
    const navigate = useNavigate()

 const login = async(e)=>{
    e.preventDefault();

   try{ 
        const data = await axios.post("https://kd-crm-backend.herokuapp.com/agent/login",{
        emailId,
        password,
        },{withCredentials: true, credentials: 'include'})
        console.log(data)
        // this.setState({login:true})
        const jwt = data.data.authToken
        setAgentId(data.data)
        if(data.status===200){
            localStorage.setItem("agentId",data.data)
        navigate('/adminpage/allotedRequest')
        }
    } 
    catch (err){
            window.alert(err.response.data.error);

        }
    // console.log(jwt)
}
    // if(this.state.login){
    //     return(    <Navigate to="/adminpage" jwt={this.state.jwt}/>)
    // } 
    // else{ 

        useEffect(()=>{
            window.sessionStorage.setItem("userType","agent");
        },[])

    return(
        <>
        <div className="form-page">
            <form onSubmit={login}>
            <h1 style={{color:"white", fontFamily:"sans-serif"}}>Agent login</h1>
            <div>
            <label></label>
            <input type="text" name="emailId" value={emailId} placeholder="Email Id" onChange={e=>setEmailId(e.target.value)}></input>
            </div>
            <div>
            <label></label>
            <input type="password" name="password" value={password} placeholder="Password" onChange={e=>setPassword(e.target.value)}></input>
            </div>
            <button type="submit">Login</button>
            </form>
            <RouterLink style={{color:"white",textDecoration:"none"}}to="/login"><p>Are you an Admin? Click here.</p></RouterLink>
        </div>
        </>
    )
// }
}


export default AgentLogin