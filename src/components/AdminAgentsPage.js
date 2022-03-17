import {useEffect,useState} from "react";
import {Grid,Box,AppBar, Toolbar, IconButton,SwipeableDrawer,Divider, Link, Avatar,Typography, Button} from "@mui/material";
import {Table,TableContainer,TableBody,TableHead,TableCell,TableRow,Checkbox,} from "@mui/material";
import {PersonAdd,Menu} from "@mui/icons-material"
import {Link as RouterLink, useNavigate} from "react-router-dom"
import axios from "axios";


export default function AdminAgentsPage (props){

        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
          props;

        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        const [agentList, setAgentList] = useState([]);
        const [agentAssignedRequest, setAgentAssignedRequest] = useState([]);

        const navigate = useNavigate()
        const config = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              withCredentials:true
            }
        const getAllAgents = async()=>{
           try{
               const {data} =  await axios.get('http://localhost:3000/agent/all',config);
                setAgentList(data);

                agentList.map((el)=>{
                    setAgentAssignedRequest(agentAssignedRequest=>[...agentAssignedRequest,el.assignedRequest])
                })


                
                
           }
            catch(err){
               window.alert("token Expired! Please login again");
               navigate("/login")
           }
          
          
        }

        

        useEffect(()=>{
            getAllAgents();
            console.log(agentList,"12345");
            
            console.log(agentAssignedRequest)
        },[])

    return(
        <>
            <Grid style={{marginTop:"100px"}}>
               <RouterLink to="/adminpage/addagent"> <IconButton style={{margin:"10px 10px", float:"right",border:"1px solid #1976D2",borderRadius:"10px",backgroundColor:"#1976D2",color:"white"}}>
                    <PersonAdd style={{margin:"10px 10px"}}/>
                    <Typography>
                        Add Agent
                    </Typography>
                </IconButton></RouterLink>
                <TableContainer>
                    <Table>
                        <TableHead>
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                            'aria-label': 'select all agents',
                            }}
                        />
                            <TableCell>Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Email-id</TableCell>
                            <TableCell>Assigned requests</TableCell>
                            <TableCell>Completed Assignments</TableCell>
                        </TableHead>
                        <TableBody>
                            {agentList.map(agent=>{ return(
                                <TableRow key={agent._id}>
                                    <Checkbox/>
                                    <TableCell>{agent.firstName} {agent.lastName}</TableCell>
                                    <TableCell>{agent.gender}</TableCell>
                                    <TableCell>{agent.age}</TableCell>
                                    <TableCell>{agent.emailId}</TableCell>
                                    <TableCell>{agent.assignedRequest.length}</TableCell>
                                    <TableCell>{agent.completedAssignment}</TableCell>
                                    {/* <TableCell><Button>View more</Button></TableCell>  */}
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </>
    )
}