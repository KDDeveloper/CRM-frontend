import { Grid, Table, TableContainer, TableHead,TableCell, TableRow, TableBody,Button } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const AgentAllotedRequest = () =>{
    const status= [{value:"Select status",disabled:true,selected:true},{value:"Assigned"},{value:"In-process"},{value:"Processed"}]
    const navigate = useNavigate()
    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials:true
        }
        let agentId = localStorage.getItem("agentId")
        const [allotedReq, setAllotedReq] = useState([]);
        const [reqStatus, setreqStatus] = useState("");
        const [reqStatusProcessed, setReqStatusProcessed] = useState(0);
        const [reqId, setreqId] = useState("");

        const updateCompletedRequests = async() =>{
            let data = await axios.patch(`https://kd-crm-backend.herokuapp.com/agent/agentcompletedreq/${agentId}`,{
                completedAssignment: reqStatusProcessed,
                    },config);
                console.log(data);
        }

    const getAllotedReq = async()=>{
        try{
            let {data} = await axios.get(`https://kd-crm-backend.herokuapp.com/agent/allotedRequest/${agentId}`,config);
            setAllotedReq(data);

            data.map(el=>{
                if(el.status==="Processed"){
                    setReqStatusProcessed(reqStatusProcessed=>reqStatusProcessed+1);
                    
                    
                }
            })
        }
    
            
        
        catch(err){
            window.alert("Token expired. Please login again")
            navigate('/agentlogin');
        }
    }

        
    const handleChange = ({target:{key,name,value}})=>{
        setreqStatus(value)
        console.log(key)
        setreqId(name)
        console.log(reqStatus, reqId)
        // const {data} = await axios.get(`https://kd-crm-backend.herokuapp.com/agent//${name}`)
        

   }

    const changeStatus = async(e)=>{
        e.preventDefault();
        try{
        if(reqStatus!==""){
        let data = await axios.patch(`https://kd-crm-backend.herokuapp.com/agent/changeStatus/${reqId}`,{
            reqStatus,
        },config);

        console.log("status updated");
       
        window.location.reload(false);
        } else{
            window.alert("Please select a status first.");
        }
    }
    catch(err){
        console.log(err)
    }
}

    useEffect(()=>{
        getAllotedReq();
        console.log(allotedReq);
        console.log(reqStatusProcessed);
        
    },[])

    useEffect(()=>{
        updateCompletedRequests();
        console.log(reqStatusProcessed)
    },[reqStatusProcessed])
    
    return(
        <>
        <Grid style={{marginTop:100}}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableCell>Name</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Mobile number</TableCell>
                        <TableCell>Email-id</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Change Status</TableCell>
                    </TableHead>
                    <TableBody>
                    {allotedReq.map((el)=>{
                        return(
                                <TableRow key={el._id}>
                                    <TableCell>{el.customerFirstName} {el.customerLastName}</TableCell>
                                    <TableCell>{el.gender}</TableCell>
                                    <TableCell>{el.age}</TableCell>
                                    <TableCell>{el.mobileNumber}</TableCell>
                                    <TableCell>{el.emailId}</TableCell>
                                    <TableCell>{el.status}</TableCell>
                                   
                                    <TableCell>
                                        <form onSubmit={changeStatus}>
                                            <select name={el._id} placeholder="Status" onChange={handleChange}>
                                                {status.map(op=>{
                                                    return(<option key={op.value} disabled={op.disabled} selected={op.selected} value={op.value}>{op.value}</option>)
                                                })}    
                                                
                                            </select>
                                            <Button  variant="contained" sx={{marginLeft:"20px"}} type="submit">Change status</Button>    
                                        </form>
                                    </TableCell>
                            </TableRow>
                        )
                    })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
        </>
    )
}

export default AgentAllotedRequest