import { useEffect, useState, createContext, useContext } from "react";
import UsersAppointment from "./usersAppointment";
import { useNavigate } from "react-router";
import { observer } from "mobx-react"
import BusinessDetails from "./BusinessDetailsToSet";
import Button from '@mui/material/Button';
import MobxData from '../dataStore/mobx';
// import BusinessDetails from './BusinessDetailsToSet'
const AdminPage = observer(() => {
    const [clickApp, setClickApp] = useState(false);
    const [clickServ, setClickServ] = useState(false);
    let nav = useNavigate();
    return (<>
       <BusinessDetails />
        {/* {!MobxData.flag&&<BasicCard/>} */}
        {clickApp && nav('/appointments')}
        {clickServ && nav('/service')}
        <br/>
         <div style = {{display: "flex", justifyContent: "center",alignItems:"center",margin: "auto",alignItems: "center"}}>
         <Button  variant="contained" name="Appointments"
        onClick={() => setClickApp(true)}>Appointments</Button>
        <Button variant="contained" name="Services"
        onClick={() => setClickServ(true)}>Services</Button>
        </div> 
    </>)
});
export default AdminPage;

