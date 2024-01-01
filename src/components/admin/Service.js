import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import MobxData from '../dataStore/mobx';
import Paper from '@mui/material/Paper';
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
    display: 'inline-block',
    margin: '5px',
    width: '200px', 
    boxSizing: 'border-box',
    cursor: 'pointer',

}));
const Service = observer(() => {
    const nav = useNavigate();
    const [servicesData, setServicesData] = useState({});
    const [addButtonClicked, setAddButtonClicked] = useState(false);

    useEffect(() => {
        getServices();
    }, []);

    async function getServices() {
        try {
            const response = await fetch('http://localhost:8787/services');
            const datajson = await response.json();
            setServicesData(datajson);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    }

    function handleNewAppointmentClick(item) {
        MobxData.setServiceType(item.name);
        nav('/newAppointment');
    }

    function homePage() {
        !MobxData.isAdmin && nav('/');
        MobxData.isAdmin && nav('/adminPage');
    }

    return (
        <>
            <div>
                {servicesData?.length > 0 &&
                    servicesData.map((item) => (

                        <Item key={item.name} className={(!MobxData.isAdmin) ? 'a' : 'b'}

                            onClick={() => !MobxData.isAdmin && handleNewAppointmentClick(item)}>
                            <ServiceItem name={item.name} description={item.description} />
                        </Item>
                    ))}
            </div>
            {addButtonClicked && nav('/newService')}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
                <Button variant="contained" color="success" name="home" endIcon={<HomeIcon />} onClick={homePage}>
                    HomePage
                </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
                {MobxData.isAdmin && (
                    <div>
                        <Fab color="green" aria-label="add" onClick={() => setAddButtonClicked(true)}>
                            +
                        </Fab>
                    </div>
                )}
            </div>
        </>
    );
});

export function ServiceItem(props) {
    return (
        <div>
            <strong>Name:</strong> {props.name}
            <br />
            <strong>Description:</strong> {props.description}
        </div>
    );
}

export default Service;
// 2 סוגי עיצוב
// העיצוב השני:
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { observer } from 'mobx-react';
// import MobxData from '../dataStore/mobx';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import Button from '@mui/material/Button';
// import HomeIcon from '@mui/icons-material/Home';

// const Service = observer(() => {
//   const nav = useNavigate();
//   const [servicesData, setServicesData] = useState({});
//   const [selectedService, setSelectedService] = useState('');

//   useEffect(() => {
//     getServices();
//   }, []);

//   async function getServices() {
//     try {
//       const response = await fetch('http://localhost:8787/services');
//       const datajson = await response.json();
//       setServicesData(datajson);
//     } catch (error) {
//       console.error('Error fetching services:', error);
//     }
//   }

//   function handleServiceChange(event) {
//     setSelectedService(event.target.value);
//   }

//   function handleNewAppointmentClick() {
//     const selectedServiceData = servicesData.find((item) => item.name === selectedService);
//     if (selectedServiceData) {
//       MobxData.setServiceType(selectedServiceData.name);
//       nav('/newAppointment');
//     }
//   }

//   function homePage() {
//     !MobxData.isAdmin && nav('/');
//     MobxData.isAdmin && nav('/adminPage');
//   }

//   return (
//     <>
//       <div>
//         <Select
//           value={selectedService}
//           onChange={handleServiceChange}
//           displayEmpty
//           sx={{ width: '200px' }} // Set the width as per your requirement
//         >
//           <MenuItem value="" disabled>
//             Select a service
//           </MenuItem>
//           {servicesData?.length > 0 &&
//             servicesData.map((item) => (
//               <MenuItem key={item.name} value={item.name}>
//                 {item.name}
//               </MenuItem>
//             ))}
//         </Select>
//       </div>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleNewAppointmentClick}
//         sx={{ width: '200px', marginTop: '10px' }} // Set the width as per your requirement
//       >
//         Go to New Appointment
//       </Button>
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
//         <Button
//           variant="contained"
//           color="success"
//           name="home"
//           endIcon={<HomeIcon />}
//           onClick={homePage}
//           sx={{ width: '200px', marginTop: '10px' }} // Set the width as per your requirement
//         >
//           HomePage
//         </Button>
//       </div>
//     </>
//   );
// });

// export default Service;

