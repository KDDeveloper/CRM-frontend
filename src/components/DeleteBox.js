import React from "react";
import {setState} from "react"
import { Link,useParams,useLocation,useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material"; 
import axios from "axios";
import { ArrowBack } from "@mui/icons-material";


const config = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials:true
    }

const DeleteEntry = (props)=>{
    const {deleteId}=useParams();
    const location = useLocation();
    const navigate = useNavigate()
    const {itemName} = location.state
    const deletePost= async (postId) => {
        try{
           let data = await axios.delete(`http://localhost:3000/customerRequestByAdmin/${deleteId}`,config);
            console.log(data)

            if(data.status===200){
                navigate('/adminpage/customerRequest')
                }
        }
        catch(err){
            console.error("Error deleting data from server",err)
        }
        
        console.log(postId, 'Deleted')
    }


    return(
        <>
        <div className="delete-page" style={{marginTop:"60px"}}>
        
            <div className="delete-box">
                <Link to={`/adminpage/singlecustomerrequest/${deleteId}`} style={{position:"absolute", right:"90%",top:"5%"}}>
                    <IconButton>
                        <ArrowBack/>
                    </IconButton>
                </Link>
                <h2>
                    Are you sure you want to delete this {itemName} ?
                </h2>
                <div className="del-btns">
                    <Link to={`/adminpage/singlecustomerrequest/${deleteId}`} style={{textDecoration:"none"}}> <Button variant="outlined" id="btn1">Cancel</Button> </Link>
                     <Link to="/adminpage/costumerRequest" onClick={()=>deletePost(deleteId)} style={{textDecoration:"none"}}><Button color="error" variant="contained" id="btn2">Delete</Button></Link>
                </div>          
            </div>
        </div>
        </>
    )
}

export default DeleteEntry