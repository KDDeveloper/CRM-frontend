import logo from './logo.svg';
import Login from "./components/Login"
import CustomerForm from './components/CustomerForm';
import AdminPage from './components/AdminNavbar';
import CustomerRequestPage from './components/CustomerRequest';
import AdminAgentsPage from './components/AdminAgentsPage';
import AdminAgentForm from './components/AdminAgentForm';
import SingleCustomerRequest from './components/SingleCustomerRequest';
import DeleteEntry from "./components/DeleteBox"
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import './app.css'

function App() {
  return (
    <>
    <Router>
      
      <Routes>

        <Route exact path="/" element={<Navigate replace to="/login"/>}/>
        <Route exact path="/customerform" element={<CustomerForm/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/adminpage" element={<AdminPage />}>
          <Route path="customerRequest" element={<CustomerRequestPage/>}/>
          <Route path="singlecustomerrequest/:id" element={<SingleCustomerRequest/>}/>
          <Route path="delete/:deleteId" element={<DeleteEntry/>}/>
          <Route path="agents" element={<AdminAgentsPage/>}/>
          <Route path="addagent" element={<AdminAgentForm/>}/>
        </Route>
      </Routes>
    </Router>

    </>
  );
}

export default App;
