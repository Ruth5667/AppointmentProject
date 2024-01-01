import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
export default function UsersAppointment() {
    let nav = useNavigate()
    const [appointmentsData, setAppointmentsData] = useState({});
    useEffect(() => {
        getApointment();
    }, [])
    function sortByDateTime(array) {
        return array.sort(function (a, b) {
            return new Date(b.dateTime) - new Date(a.dateTime);
        });
    }
    function addColorAttribute(datajson) {
        datajson.map((e) => {
            let date = new Date(e.dateTime);
            if (sameDay(date)) e.scheduler = 'TODAY';
            else if (sameWeek(date)) e.scheduler = 'THISWEEK';
            else e.scheduler = 'FUTER'});
    }
    function sameDay(date) {

        return date.getDay() === new Date().getDay() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear();
    }
    function sameWeek(date) {

        return date.getDay() - new Date().getDay() <= 7 && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear();
    }
    async function getApointment() {
        let data = await fetch('http://localhost:8787/appointments')
        let datajson = await data.json()
        console.log(datajson, "before")
        datajson = sortByDateTime(datajson);
        addColorAttribute(datajson)
        setAppointmentsData(datajson)
    }
    return (
        <> <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "auto", alignItems: "center" }}>
            <Button variant="contained" color="success" name="login" type="submit" endIcon={<HomeIcon />} onClick={() => nav('/adminPage')}>HomePage</Button></div>
            <div> {appointmentsData?.length > 0 && appointmentsData.map((i) =>
                <Appointment serviceType={i.serviceType} clientName={i.clientName}
                dateTime={i.dateTime} scheduler={i.scheduler} />)}</div></>)
}
export function Appointment(props) {
    return (<div className={props.scheduler === "TODAY" ? "TODAY" : props.scheduler === "THISWEEK" ? "THISWEEK" :"GREEN"}>
        <p>serviceType: {props.serviceType}</p>
        <p>dateTime: {props.dateTime}</p>
        <p>clientName: {props.clientName}</p>
    </div>)
}
