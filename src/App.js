import {useState} from "react";
import Login from "./components/Login";
import CustomerForm from './components/CustomerForm';
import AdminPage from './components/AdminNavbar';
import AgentLogin from './components/AgentLogin';
import CustomerRequestPage from './components/CustomerRequest';
import AdminAgentsPage from './components/AdminAgentsPage';
import AdminAgentForm from './components/AdminAgentForm';
import SingleCustomerRequest from './components/SingleCustomerRequest';
import Statistics from './components/Statistics';
import DeleteEntry from "./components/DeleteBox"
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import AgentAllotedRequest from "./components/agentAllotedRequest";
import './App.css';
import Summary from "./components/summary";

function App() {

  const [agentId, setAgentId] = useState()
  const [userType, setUserType] = useState()

  return (
    <>
    <Router>

      <Routes>

        <Route exact path="/" element={<Navigate replace to="/summary"/>}/>
        <Route exact path="/summary" element={<Summary/>}/>
        <Route exact path="/customerform" element={<CustomerForm/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/agentlogin" element={<AgentLogin setAgentId={setAgentId}/>}/>
        <Route exact path="/adminpage" element={<AdminPage />}>
          <Route path="customerRequest" element={<CustomerRequestPage/>}/>
          <Route path="allotedRequest" element={<AgentAllotedRequest agentId={agentId}/>}/>
          <Route path="singlecustomerrequest/:id" element={<SingleCustomerRequest/>}/>
          <Route path="delete/:deleteId" element={<DeleteEntry/>}/>
          <Route path="statistics" element={<Statistics/>}/>
          <Route path="agents" element={<AdminAgentsPage/>}/>
          <Route path="addagent" element={<AdminAgentForm/>}/>
        </Route>
      </Routes>

    </Router>

    </>
  );
}

export default App;
