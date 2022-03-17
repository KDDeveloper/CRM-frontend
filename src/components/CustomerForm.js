import react from "react";
import '../App.css'
class CustomerForm extends react.Component{
    constructor(props){
    super(props)
    this.state={
        firstName:'',
        lastName:'',
        mobileNumber:'',
        emailId:''
    }
}

handleChange=({target:{name,value}})=>{
    this.setState({[name]:value});
}
render(){
    return(
        <>
        <div className="form-page">
            <form>
            <div>
            <label></label>
            <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder="First name"></input>
            </div>
            <div>
            <label></label>
            <input type="text" name="lastName" value={this.state.lastName} placeholder="Last name" onChange={this.handleChange}></input>
            </div>
            <div>
            {/* <label></label> */}
            <input type="text" name="mobileNumber" value={this.state.mobileNumber} placeholder="Mobile number" onChange={this.handleChange}></input>
            </div>
            <div>
            <label></label>
            <input type="text" name="emailId" value={this.state.emailId} placeholder="Email Id" onChange={this.handleChange}></input>
            </div>
            <button>Contact me</button>
            </form>
        </div>
        </>
    )
}
}

export default CustomerForm