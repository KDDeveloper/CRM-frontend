import { combineReducers } from "redux";

export const adminLoginAction = ()=>{
    return {type:"admin"}
}

export const agentLoginAction = ()=>{
    return {type:"agent"}
}

export const agentLoggedInReducer = (state=false,action)=>{
    switch (action.type) {
        case "agent":
            return !state
            
            break;
    
        default:
            return state
            break;
    }
}

export const adminLoggedInReducer = (state=false,action)=>{
    switch (action.type) {
        case "admin":
            return !state
            
            break;
    
        default:
            return state
            break;
    }
}

export let loginReducers  = combineReducers({
    adminLogin:adminLoggedInReducer,
    agentLogin: agentLoggedInReducer
});