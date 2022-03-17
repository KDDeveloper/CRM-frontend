import react, { useState, useEffect } from "react";
import {Grid,Box,AppBar, Toolbar, IconButton,SwipeableDrawer,Divider, Link, Avatar} from "@mui/material";
import {Menu as MenuIcon,ChevronLeft} from "@mui/icons-material";
import {makeStyles} from "@mui/styles"
import {Link as RouterLink, Outlet,useLocation, useNavigate} from "react-router-dom"
import axios from "axios";
import cookie from "js-cookie";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";


let adminNavOp = [
    {name:"Customer Requests", link:"/adminpage/customerRequest"},
    // {name:"Statistics", link:"/adminpage/statistics"},
    {name:"Agents", link:"/adminpage/agents"}
]
let agentNavOp = [
    {name:"Alloted request", link:"/adminpage/allotedRequest"},
    // {name:"Statistics", link:"/adminpage/statistics"},
]


const useStyles = makeStyles({
    link:{
        margin:20,

        color:"blue"
    },
    chevIcon:{
        marginLeft:160
    },
    avatar:{
        marginLeft:"auto"
    }
})
export default function AdminPage (props){

    let navigate = useNavigate();
    let [cookies,setCookie,removeCookie] = useCookies(["jwt"])
    let [agentCookies,setAgentCookie,removeAgentCookie] = useCookies(["agentToken"])
    let userType = window.sessionStorage.getItem("userType");
    // const {state} = useLocation();
    const adminLogin = useSelector(state=>state.adminLogin)

const [adminNavigationLinks,setAdminNavigationLinks] = useState(userType==="admin"?adminNavOp:agentNavOp);

const logout = async() =>{
    if(userType==="admin"){
      const data = await axios.get("https://kd-crm-backend.herokuapp.com/admin/logout",{withCredentials: true, credentials: 'include'})
      console.log(data)
      navigate("/login")
    }

    if(userType==="agent"){
    //   const data = await axios.get("https://kd-crm-backend.herokuapp.com/admin/logout",{withCredentials: true, credentials: 'include'})
    //   console.log(data);
        navigate("/agentlogin")
    }
}

useEffect(()=>{
    console.log(userType)
    if(userType==="admin"){

        
        
        setAdminNavigationLinks(adminNavOp)
    }

    console.log(adminNavigationLinks)
    
        
})
// console.log(navigationLinks);
    const styles = useStyles();
    const[open,setOpen]= useState(false);


    return(
        <>
            <Grid>
                <Box>
                    <AppBar>
                        <Toolbar>
                            <IconButton onClick={()=>setOpen(true)}>
                                <MenuIcon/>
                            </IconButton>
                            <Avatar className={styles.avatar}>S</Avatar>
                        </Toolbar>
                        <SwipeableDrawer open={open} onOpen={()=>setOpen(true)} onClose={()=>setOpen(false)}>
                            <div className={styles.chevIcon}>
                            <IconButton onClick={()=>setOpen(false)}>
                                <ChevronLeft />
                            </IconButton>
                            </div>
                            <Divider/>
                            {adminNavigationLinks.map((item)=>{return(
                              <RouterLink key={item.name} className={styles.link} to={item.link} style={{textDecoration:'none'}}><Link color="textPrimary" underline="none" variant="button">{item.name}</Link></RouterLink>
                            )})}
                            <Link color="textPrimary" underline="none" variant="button" style={{cursor:"pointer",display:"block",margin:"20px"}} onClick={logout}>Logout</Link>
                        </SwipeableDrawer>
                    </AppBar>
                </Box>
            </Grid>
            <Outlet/>
        </>
    )
}