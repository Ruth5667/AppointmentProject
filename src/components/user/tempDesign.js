
import { observable, makeObservable, action } from 'mobx';
class GlobalState {

    isLogin = false;
    business = {
        id: "123",
        name: "ori",
        address: "ben",
        phone: "05424",
        owner: "1",
        logo: "",
        description: "good",
    }
    services = [

        {
            id: "12",
            name: "פגישת ייעוץ פרונטלית",
            description: "פגישת ייעוץ פרטנית בקליניקה",
            price: 500,
            duration: 60,

        },
        {
            id: "12",
            name: "פגישת ייעוץ פרונטלית",
            description: "פגישת ייעוץ פרטנית בקליניקה",
            price: 500,
            duration: 60,

        },
        {
            id: "12",
            name: "פגישת ייעוץ פרונטלית",
            description: "פגישת ייעוץ פרטנית בקליניקה",
            price: 500,
            duration: 60,

        }];
    appointments = [
        {
            id: "758",
            serviceType: "123",
            dateTime: "2024-01-03T10:00:00.000Z",//מבנה של תאריך ושעה סטנדרטי בjs
            clientName: "אבי כהן",
            clientPhone: "050-1234567",
            clientEmail: "m@m.com",
        },
        {
            id: "758",
            serviceType: "123",
            dateTime: "2023-12-24T10:00:00.000Z",//מבנה של תאריך ושעה סטנדרטי בjs
            clientName: "אבי כהן",
            clientPhone: "050-1234567",
            clientEmail: "m@m.com",
        },
        {
            id: "758",
            serviceType: "123",
            dateTime: "2221-06-20T10:00:00.000Z",//מבנה של תאריך ושעה סטנדרטי בjs
            clientName: "אבי כהן",
            clientPhone: "050-1234567",
            clientEmail: "m@m.com",
        }];
    setIsLogin = (val) => { this.isLogin = val }
    initBusiness = async () => {
        const response = await fetch("http://localhost:8787/businessData");
        const data = await response.json();
        console.log(this.business);
        console.log(this.business.id);

    }
    initServices = async () => {
        const response = await fetch("http://localhost:8787/services");
        const data = await response.json();
        this.setServices(data)
        console.log(this.services);
        console.log(this.services.id);
    }
    setServices(val) {
        this.service = val;
    }
    setBusiness(val) {
        this.business = val;
    }
    constructor() {
        makeObservable(this, {
            isLogin: observable,
            setIsLogin: action,
            business: observable,
            initBusiness: action,
            setBusiness: action,
            edit: observable,
            sentToEdit: action,
            isAdmin: observable,
            setIsAdmin: action,
            services: observable,
            addService: action,
            addAppointment: action,
            appointments: observable
        })
    }
    edit = false;
    sentToEdit = (val) => {
        this.edit = val;
    }

    addService = (val) => {
        this.services.push(val);
    }
    addAppointment = (val) => {
        this.appointments.push(val);
    }
    isAdmin = false;
    setIsAdmin = (val) => {
        this.isAdmin = val;
    }


}
export default new GlobalState();


import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { observer } from "mobx-react"
import MobxData from '../dataStore/mobx'
import { useEffect } from "react";
import {  Button, Typography, Container } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    marginLeft:'13%',
  };

// import ThemeContext from './admin/Service'
const  NewAppointment=observer(()=> {
    // const theme = useContext(ThemeContext);
    let nav = useNavigate()
    const { register, handleSubmit } = useForm();
    const [invalidDate, setInvalidDate] = useState(true);
    const [valid, setValid] = useState(false);
    const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    useEffect(() => {
       if (valid){
        window.alert("The Appointment added successfully!")
        // prompt("The Appointment added successfully!")
        setTimeout(() => {
            nav('/')
        }, 1000);}
    }, [valid])

    useEffect(() => {
        if (!valid&&!invalidDate){ 
        // Popup.alert("The date is already taken, please enter another date")
        window.alert("The date is already taken, please enter another date")
        }
     }, [valid,invalidDate])

    return (<>
     <Container maxWidth="sm" style={{ marginTop: '50px' }}></Container>
     <div>
      <Button onClick={handleOpen}></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
         ADD A NEW APPOINTMENT IN: {MobxData.serviceType}
          </Typography><Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <form onSubmit={handleSubmit((dataAppo) => {
            fetch('http://localhost:8787/appointment',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataAppo),
                
                })
                .then(res => {
                    if(res.status===200){
                        setValid(true)
                    }
                    else if(res.status===400){
                        setInvalidDate(false)
                }  
                }).catch(err =>
                   console.log(invalidDate) 
                )
        })}> 
       
            <TextField
            sx={{ m: 1, width: '25ch' }}
            variant="filled"
          id="filled-start-adornment"
          label="id"
        //   autoComplete="current-password"
          {...register("id")}
          placeholder="id"
        />
        <TextField
         sx={{ m: 1, width: '25ch' }}
         variant="filled"
         id="filled-start-adornment"
          label="clientName"
        //   autoComplete="current-password"
          {...register("clientName")}
          placeholder="clientName"
        />
          <TextField
          sx={{ m: 1, width: '25ch' }}
          variant="filled"
          id="filled-start-adornment"
          label="clientPhone"
        //   autoComplete="current-password"
          {...register("clientPhone")}
          placeholder="clientPhone"
        />
            
            <TextField
          sx={{ m: 1, width: '25ch' }}
          variant="filled"
          id="filled-start-adornment"
          label="clientEmail"
          type="email"
        //   autoComplete="current-password"
          {...register("clientEmail")}
          placeholder="clientEmail"
        />
            {/* <label>dateTime</label>
            <input {...register("dateTime")} placeholder="dateTime" id={!invalidDate?"blur":"dateTime"}/>
            <br /> */}
            <TextField
           sx={{ m: 1, width: '25ch' }}
           variant="filled"
        //    id="filled-start-adornment"
          type="date"
        //   autoComplete="current-password"
          {...register("dateTime")}
        //   placeholder="dateTime"
        id={!invalidDate?"blur":"dateTime"}
        />
        <br/>
             <Button type="submit" variant="outlined" color="error"endIcon={<SendIcon />}> SEND</Button>
         </form></Typography>
         </Box>
         </Modal>
         </div> 
       
        
    
    
       
        {/* {!invalidDate&&!valid&&<Popup.alert("The date is already taken, please enter another date")/>} */}
    </>);
});
export default NewAppointment;
