import CreateTicket from './components/createTicket';
import './App.css';
import Login from './components/login';
import { Routes, Route, Navigate } from "react-router-dom";
import ViewAllTickets from './components/viewAllTickets';
import Home from './components/Home';
import EditTicket from './components/editTicket';

function App() {
  const myStorage = window.localStorage
  let user = myStorage.getItem('user')
  return (
    <div >
      <Routes>

       <Route path='/' element={user ? <Home/> : <Navigate to = '/login'/>}/>
       <Route path='/login' element={user ? <Navigate to = '/'/> : <Login/>}/>
       <Route path='/create-ticket' element={user ? <CreateTicket/> : <Navigate to = '/login'/>}/>
       <Route path='/view-all-tickets' element={user ? <ViewAllTickets/> : <Navigate to = '/login'/>}/>
       <Route path='/edit-tickets/:id' element={user ? <EditTicket/> : <Navigate to = '/login'/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
