import react, { useState, useEffect } from "react";
import {Grid,Box,AppBar, Toolbar, IconButton,SwipeableDrawer,Divider, Link, Avatar} from "@mui/material";
import {Menu as MenuIcon,ChevronLeft} from "@mui/icons-material";
import {makeStyles} from "@mui/styles"
import {Link as RouterLink, Outlet} from "react-router-dom"
import axios from "axios";
import cookie from "js-cookie";
const navigationLinks = [
    {name:"Customer Requests",link:"/adminpage/customerRequest"},
    {name:"Statistics", link:"/adminpage/statistics"},
    {name:"Agents", link:"/adminpage/agents"},
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
                            {navigationLinks.map((item)=>{return(
                              <RouterLink key={item.name} className={styles.link} to={item.link} style={{textDecoration:'none'}}><Link color="textPrimary" underline="none" variant="button">{item.name}</Link></RouterLink>
                            )})}
                        </SwipeableDrawer>
                    </AppBar>
                </Box>
            </Grid>
            <Outlet/>
        </>
    )
}