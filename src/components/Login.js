import react ,{useEffect, useState}from "react";
import '../app.css'
import axios from "axios"
import {useNavigate,Navigate,Link as RouterLink} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import { adminLoginAction } from "./redux";

function Login (props) {
    const [emailId,setEmailId]=useState("")
    const [password,setPassword]=useState("")
    // const [jwt,setJwt]=useState("")
    const navigate = useNavigate()
    const adminLogin = useSelector(state=>state.adminLogin);
    const dispatch = useDispatch()
    console.log(adminLogin)

 const login = async(e)=>{
    e.preventDefault();
    
   try{ 
        const data = await axios.post("https://kd-crm-backend.herokuapp.com/admin/login",{
        emailId,
        password,
        },{withCredentials: true, credentials: 'include'})
        // console.log(emailId)
        // this.setState({login:true})
        const jwt = data.data.authToken
        console.log(data)
        if(data.status===200){
        navigate('/adminpage/customerRequest',{state:"admin"}
        )
       
        dispatch(adminLoginAction())
        }
        
    } 
    catch (err){
            window.alert(err.response.data.error);

        }
        sessionStorage.setItem("userType","admin");
    // console.log(jwt)
}

    useEffect(()=>{
        window.sessionStorage.setItem("userType","admin");
    },[])
    // if(this.state.login){
    //     return(    <Navigate to="/adminpage" jwt={this.state.jwt}/>)
    // } 
    // else{ 
    return(
        <>
        <div className="form-page">
            <form onSubmit={login}>
            <h1 style={{color:"white", fontFamily:"sans-serif"}}>Admin login</h1>
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
        <RouterLink style={{color:"white",textDecoration:"none"}} to="/agentlogin"><p>Are you an existing Agent? Click here.</p></RouterLink>
        </div>
        </>
    )
// }
}


export default Login