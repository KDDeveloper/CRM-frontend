import { useNavigate, useLocation,Link as RouterLink } from "react-router-dom"
import axios from "axios";
import { useEffect,useState } from "react";
import {Grid,Box,AppBar, Toolbar, IconButton,SwipeableDrawer,Divider, Link, Avatar,Typography, Button} from "@mui/material";
import {Table,TableContainer,TableBody,TableHead,TableCell,TableRow,Checkbox,} from "@mui/material";
import {PersonAdd,Menu} from "@mui/icons-material";

import "../app.css";


export default function CustomerRequestPage () {
    
   
    const [customerRequestList,setCustomerRequestList] = useState([]);
    const navigate = useNavigate()

    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials:true
        }
    
   const getCustomerReq = async() => {
       try{ 
           const {data}= await axios.get("http://localhost:3000/customerRequestByAdmin",config)
        setCustomerRequestList(data)
        // console.log(data.status)
    }
        catch(err){
            // if(err);
            window.alert("Token expired. Please login again")
            navigate('/login');
        }
        console.log(customerRequestList)
    }

    useEffect(() => {
        getCustomerReq();
        

    }, [])

    return(
    
    <>
        <div style={{marginTop:"100px"}}>
        <Grid style={{marginTop:"100px"}}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableCell>Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Mobile number</TableCell>
                            <TableCell>Email-id</TableCell>
                            <TableCell>Assigned to</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell></TableCell>
                        </TableHead>
                        <TableBody>
                            {customerRequestList.map(agent=>{ return(
                                <TableRow key={agent._id}>
                                    <TableCell>{agent.customerFirstName} {agent.customerLastName}</TableCell>
                                    <TableCell>{agent.gender}</TableCell>
                                    <TableCell>{agent.age}</TableCell>
                                    <TableCell>{agent.mobileNumber}</TableCell>
                                    <TableCell>{agent.emailId}</TableCell>
                                    <TableCell>{agent.assignedTo}</TableCell>
                                    <TableCell>{agent.status}</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell><RouterLink to={`/adminpage/singlecustomerrequest/${agent._id}`} style={{textDecoration:"none"}} ><Button variant="outlined">View more</Button></RouterLink></TableCell>
                                    {/* <TableCell><Button>View more</Button></TableCell>  */}
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </div>
    </>
)
}