import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { observer } from "mobx-react"
import MobxData from '../dataStore/mobx'
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const Service = observer(() => {
    let nav = useNavigate();
    const [servicesData, setServicesData] = useState({});
    const [addButtonClicked, setAddButtonClicked] = useState(false);
    useEffect(() => {
        getServices();
    }, [])
    async function getServices() {
        let data = await fetch('http://localhost:8787/services')
        let datajson = await data.json()
        setServicesData(datajson)
    }
    function handleNewAppointmentClick(item) {
        MobxData.setServiceType(item.name);
        nav('/newAppointment')
    }
    function homePage() {
        !MobxData.isAdmin && nav('/')
        MobxData.isAdmin && nav('/adminPage')
    }
    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "auto", alignItems: "center" }}>
                <Button variant="contained" color="success" name="home" endIcon={<HomeIcon />} onClick={homePage}>HomePage</Button></div>
            <div> {servicesData?.length > 0 && servicesData.map((item) =>
                <>  {!MobxData.isAdmin && <div><Radio
                    value="radioA"
                    inputProps={{
                        'aria-label': 'Radio A',
                    }}
                    onClick={() => handleNewAppointmentClick(item)} />
                </div>}
                    <ServiceItem name={item.name}
                        description={item.description} />
                </>
            )}</div>
            {addButtonClicked && nav('/newService')}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "auto", alignItems: "center" }}>
                {MobxData.isAdmin && <div><Fab color="green" aria-label="add"
                    onClick={() => setAddButtonClicked(true)}>+</Fab></div>}</div></>)
});

export function ServiceItem(props) {
    return (<div>
        <Stack direction="row" spacing={2}></Stack>
        <Item>name: {props.name}<br />
            description: {props.description}</Item>
    </div>)
}
export default Service;