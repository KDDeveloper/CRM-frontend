import { useState } from "react";
import {Block, Cancel, Password} from "@mui/icons-material"
import { IconButton } from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import axios from "axios";

const validateEmail = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
const validatePassword = RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
export default function AdminAgentForm (props){

    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [gender, setGender] = useState('Male');
    // const [age, setAge] = useState('');
    // const [emailId, setEmailId] = useState('');
    // const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');

    const [formFill, setFormFill] = useState(true);
    const initialFormValues = {
        firstName:"",
        lastName:"",
        gender:"Male",
        age:"",
        emailId:"",
        password:"",
        confirmPassword:""
    }
    const [formValues,setFormValues]=useState(initialFormValues)
    
    
    const [firstNameError,setFirstNameError] = useState('')
    const [lastNameError, setLastNameError]= useState('')
    const [genderError, setGenderError]= useState('')
    const [ageError, setAgeError]= useState('')
    const [emailIdError,setEmailIdError]= useState('')
    const [passwordError,setPasswordError]= useState('')
    const [confirmPasswordError,setConfirmPasswordError]= useState('')




    const addAgent = async()=>{
        const {firstName, lastName, gender, age, emailId,password} = formValues
        try {
            const data = await axios.post("http://localhost:3000/agent/add",{
                firstName,
                lastName,
                gender,
                age,
                emailId,
                password
            })
            window.alert('New agent has been added');
            setFormValues({firstName:"",lastName:"", gender:"", age:"", emailId:"",password:""});
        } catch (err) {
            window.alert(err.response.data.error);
        }
    }

    const handleChange=({target:{name,value}})=>{
        setFormValues({...formValues, [name]:value});
        console.log(formValues);

        switch (name) {
            case "firstName":{
                 if(value<1){
                setFirstNameError("First name is required!")
                setFormFill(true)
                }
                else{
                    setFirstNameError("")
                    setFormFill(false)
                };        
        }
        break;

            case"lastName":{
                if(value===""){
                        setLastNameError("Last name is required!")
                    }
                     else{setLastNameError("")};
            }
            break;

            case "age":{
                if(value<18){
                        setAgeError("Age cannot be less than 18!")
                    }
                    else{setAgeError("")};
            }
            break;

            case "emailId":{
                const validatedEmail = validateEmail.test(value);

                if(!validatedEmail){
                    setEmailIdError("Please use a valid e-mail id!")
                }else{setEmailIdError("")};
            }
            break;

            case "password" :{
                const validatedPassword = validatePassword.test(value);
                if(!validatedPassword){
                    setPasswordError("The password must have 9 characters,1 letter and 1 number!");
                } else{setPasswordError("")}
            }
            break;
            case "confirmPassword" :{
                if(value!==formValues.password){
                        setConfirmPasswordError("The password does not match!");
                        console.log("password not confirmed",formValues.password,formValues.firstName)
                    }
                if(value===formValues.password){
                    setConfirmPasswordError("");
                    console.log("password confirmed")
                }
            }
            break;

            default:
                break;
        }

    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(firstNameError==="" && lastNameError==="" && ageError==="" && emailIdError==="" && passwordError==="" && confirmPasswordError===""){
            addAgent();
            // console.log("agent added!")
            // console.log(firstNameError,lastNameError,ageError,emailIdError,passwordError,confirmPasswordError)
        }
    }   
     return(
        <>
            <div className="agent-form">
                <form onSubmit={handleSubmit}>
                <RouterLink to="/adminpage/agents" style={{width:"30px",float:"left",marginLeft:"120px",cursor:"pointer"}}><IconButton stlye={{}}>
                        <Cancel/>
                    </IconButton></RouterLink>
                        <input placeholder="First name" name="firstName" type="text" value={formValues.firstName} onChange={handleChange}/>
                        <span>{firstNameError}</span>
                        
                        <input placeholder="Last name" name="lastName" type="text" value={formValues.lastName} onChange={handleChange}/>
                        <span>{lastNameError}</span>
                        <br/>
                        <div>
                        <label style={{display:"block"}}>Gender:</label>
                        <br/>
                        <label for="Male">Male</label>
                        <input name="gender" value="Male" type="radio" checked={formValues.gender==="Male"} onChange={handleChange}/>
                        <label for="Female">Female</label>
                        <input name="gender" value="Female" type="radio" checked={formValues.gender==="Female"} onChange={handleChange}/>
                        <label for="Other">Other</label>
                        <input name="gender" value="Other" type="radio" checked={formValues.gender==="Other"} onChange={handleChange}/>
                        <span>{genderError}</span>
                        </div>

                        <input placeholder="Age" name="age" value={formValues.age} type="text" onChange={handleChange}/>
                        <span>{ageError}</span>

                        <input placeholder="E-mail id" name="emailId" value={formValues.emailId} type="text" onChange={handleChange}/>
                        <span>{emailIdError}</span>

                        <input placeholder="Password" name="password" value={formValues.password} type="text" onChange={handleChange}/>
                        <span>{passwordError}</span>
                        
                        <input placeholder="Confirm password" name="confirmPassword" value={formValues.confirmPassword} type="text" onChange={handleChange}/>
                        <span>{confirmPasswordError}</span>

                        <button type="submit" className="agent-s-btn" disabled={formFill}>Add Agent</button>
                </form>
            </div>
        </>
    )
}