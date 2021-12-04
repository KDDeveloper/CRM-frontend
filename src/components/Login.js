import react ,{useState}from "react";
import '../app.css'
import axios from "axios"
import {useNavigate,Navigate} from "react-router-dom"
function Login (props) {
    const [emailId,setEmailId]=useState("")
    const [password,setPassword]=useState("")
    // const [jwt,setJwt]=useState("")
    const navigate = useNavigate()

 const login = async(e)=>{
    e.preventDefault();

   try{ 
        const data = await axios.post("http://localhost:3000/admin/login",{
        emailId,
        password,
        },{withCredentials: true, credentials: 'include'})
        // console.log(emailId)
        // this.setState({login:true})
        const jwt = data.data.authToken
        console.log(data)
        if(data.status===200){
        navigate('/adminpage/customerRequest',{state:jwt})
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

        </div>
        </>
    )
// }
}


export default Login