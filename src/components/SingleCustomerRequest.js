import axios from "axios";
import { useState,useEffect } from "react";
import {useParams, useNavigate,Link as RouterLink} from "react-router-dom";
import {Grid,Box, IconButton,Typography, Button} from "@mui/material";
import { ArrowBack,Delete } from "@mui/icons-material";

export default function SingleCustomerRequest (props) {
    const {id} = useParams();
    const navigate = useNavigate()
    const [customerRequest,setCustomerRequest] = useState([]);
    const [agents,setAgents] = useState([]);
    const [assignedTo, setAssignedTo] = useState('');
    const [assigned, setAssigned] = useState(true);
    const [agentId, setAgentId] = useState('');
    

    const config = {
        headers: {
            Accept: 'application/json; charset=utf-8',
            'Content-Type': 'application/json',
          },
          withCredentials:true
        }

   const getCustomerRequest = async()=>{
       try{
           const {data} = await axios.get(`http://localhost:3000/customerRequestByAdmin/${id}`,config)
        setCustomerRequest([data]);
        setAgentId(data.agentId)
        if(data.assignedTo!==""){
            setAssigned(false);
            
        // console.log(agentId)
           
        }
       }
       catch(error){
        window.alert("Token expired. Please login again")
        navigate('/login');
       }

   }
   console.log(agentId)
   console.log(customerRequest)

   const getAgents = async() =>{
      try{ const {data} = await axios.get("http://localhost:3000/agent/all",config);
       setAgents(data);
        }
    catch(error){

    }
   }

   console.log(agents);

   const handleChange = async({target:{name,value}})=>{


        const {data} = await axios.get(`http://localhost:3000/agent/personal/${value}`)
        setAgentId(data._id);
        setAssignedTo(`${data.firstName} ${data.lastName}`)

   }

   const addCustomerReqtoAgentArray = async()=>{

    console.log(agentId, id)
    try{
        const agent = await axios.patch(`http://localhost:3000/customerRequestByAdmin/agentassigned/${agentId}`,{
            id,
        },config)
    }
    catch(error){

    }
   }

   const removeCustomerReqtoAgentArray = async()=>{
    console.log(typeof id)
    try{
        
    }
    catch(error){

    }
   }

    const updateCustomerAssignment = async()=>{
        try{
            
             
            const data = await axios.patch(`http://localhost:3000/customerRequestByAdmin/assign/${id}`,{
                assignedTo,
                status:"assigned",
                agentId
            },config);

           
            
            console.log(customerRequest)
        }
        catch(error){}

        
       

       
    }

    const unassignAgent = async() => {
        // e.preventDefault()
        console.log(id, agentId)
        try{
            
             
            const data = await axios.patch(`http://localhost:3000/customerRequestByAdmin/unassign/${id}`,{
                // assignedTo,
                status:"New lead"
                // agentId,
            },config);

            const agent = await axios.delete(`http://localhost:3000/customerRequestByAdmin/agentunassigned/${agentId}`,{
               data:{id: id},
            },{
                headers: {
                    Accept: 'application/json; charset=utf-8',
                    'Content-Type': 'application/json',
                  },
                  withCredentials:true
                })
            window.location.reload(false);
        }
        catch(error){
            // window.alert("there was an error unassigning request. contact the developer")
        }
        
       
    }

   const assignAgent = (e) => {
        // e.preventDefault();
        updateCustomerAssignment();
        addCustomerReqtoAgentArray();

   }

   useEffect(() => {
       getCustomerRequest();
        getAgents();
        
        
   }, [])

   useEffect(()=>{},[assignAgent]);
    return(
        <>
        <Grid style={{marginTop:"100px",height:"100%"}}>
       <RouterLink to="/adminpage/customerRequest"> <IconButton>
            <ArrowBack/>
        </IconButton></RouterLink>
        <Box style={{boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",padding:'20px',margin:'50px',display:'flex',flexDirection:"column", justifyContent:"space-around",height:"50vh"}}>
        {customerRequest.map((request)=>{
            
            return(
            
                <>
                    <Typography>Name: {request.customerFirstName} {request.customerLastName}</Typography>
                    
                    <Typography>Age: {request.age}</Typography>

                    <Typography>Gender: {request.gender}</Typography>

                    <Typography>Mobile number: {request.mobileNumber}</Typography>

                    <Typography>Description: {request.description}</Typography>

                    <Typography>Status: {request.status}</Typography>
                    
                    <Typography>Assigned to: {request.assignedTo}</Typography>

                    <RouterLink to={`/adminpage/delete/${request._id}`} state={{itemName:'request'}} style={{textDecoration:"none"}}><Button variant="contained" color="error" startIcon={<Delete/>}>Delete</Button></RouterLink>
                </>
            )
        })}

        <form onSubmit={assignAgent}>
            <select onChange={handleChange}>
                { agents.map(agent=>{
                    return(
                        <option key={agent._id} value={agent._id}>{agent.firstName} {agent.lastName}</option>
                    )
                })
                    

                
                }
            </select>
            <Button type="submit" disabled={!assigned} size="small" style={{marginLeft:"10px"}} variant="contained">Assign</Button>            
            <Button onClick={unassignAgent} size="small" style={{marginLeft:"10px"}} variant="contained" disabled={assigned}>Unassign</Button>
            {/* style={{color:"white", background:"#1976D2", height:'30px', width:'60px', border:"none",borderRadius:"5px", marginLeft:"20px"}}            */}
        </form>
        </Box>
        </Grid>
        </>
    )
}