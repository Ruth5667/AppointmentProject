import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginAdmin from './components/admin/loginAdmin';
import Home from './components/home';
import AdminPage from './components/admin/adminPage';
import Service from './components/admin/Service';
import UsersAppointment from './components/admin/usersAppointment';
import NewService from './components/admin/NewService';
import NewAppointment from './components/user/NewAppointment';
function App() {
  return (

   <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='adminPage' element={<AdminPage />} />
          <Route path='service' element={<Service />}></Route>
          <Route path='appointments' element={<UsersAppointment />}></Route>
          <Route path='login' element={<LoginAdmin />} />
          <Route path='newService' element={<NewService />} />
          <Route path='newAppointment' element={<NewAppointment />} />
          
          {/* <Route path='BusinessDetails' element={<BusinessDetails/>}></Route> */}

          {/* <Route path='' element={}/> */}
          {/* <Route path='*' element={<NotFoundView />} /> */}
        </Routes>
      </BrowserRouter>
      
    </div>
    
  )
};
export default App;
