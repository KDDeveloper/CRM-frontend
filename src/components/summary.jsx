import { Link as RouterLink } from "react-router-dom"
import { Button } from "@mui/material"
const Summary = ()=>{
    return(
        <>
            <div className="summary-page-container">
                <h1>Summary</h1>
                <p>This project is a full stack project that has used:</p>
                <ul>
                    <li>React</li>
                    <li>Node.js</li>
                    <li>Express</li>
                    <li>Mongo db</li>
                </ul>
                <br/>
                <h2>About project:</h2>
                <br/>
                <p>This project is a basic CRM system with login and JWT authentication where the admin can alot customer requests to agents and agents can access those requests that are alloted to them and also CRUD functionality.</p>
                <br/>
                <p><strong>Key features:</strong></p>
                <br/>
                <ul>
                    <li>Admin can view all the customer requests and their status at one go.</li>
                    <li>Admin can create new agents or delete exsisting agents.</li>
                    <li>Admins can assign or unassign the customer request or lead to their agents.</li>
                    <li>Agents can change the status of the customer requests alloted to them.</li>
                </ul>
                <br />
                <br />

                <p><strong>Admin login credentials:</strong></p>
                <br/>
                <p>Email-id: sk@g.in</p>
                <br/>
                <p>Password: guvi12345</p>
                <br />
                <br />

                <p><strong>Agent login credentials:</strong></p>
                <br/>
                <p>Email-id: ek@gmail.com</p>
                <br/>
                <p>Password: guvi12345</p>

                <div className="summary-btns">
                    <div className="summary-btn">
                        <Button variant="contained">
                        <RouterLink to="/customerform" target="_blank" style={{textDecoration:"none",color:"white"}}>Customer request form</RouterLink>  
                        </Button>
                    </div>    
                    <div className="summary-btn">
                        <Button variant="contained">
                            <RouterLink to="/login"  target="_blank" style={{textDecoration:"none",color:"white"}}>Admin login</RouterLink>  
                        </Button>    
                    </div>    
                    <div className="summary-btn">
                        <Button variant="contained">
                            <RouterLink to="/agentlogin"  target="_blank" style={{textDecoration:"none",color:"white"}}>Agent login</RouterLink>  
                        </Button>    
                    </div>    
                </div>           
            </div>
        </>
    )
}

export default Summary