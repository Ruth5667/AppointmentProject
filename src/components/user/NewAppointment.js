import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import MobxData from '../dataStore/mobx';
import { Button, Typography, Container } from '@mui/material';
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
  marginLeft: '1%',
  // backgroundColor:'pink'
};
const NewAppointment = observer(() => {
  const nav = useNavigate();
  const { register, handleSubmit } = useForm();
  const [invalidDate, setInvalidDate] = useState(true);
  const [valid, setValid] = useState(false);
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const currentDate = new Date().toISOString().split('T')[0];
  useEffect(() => {
    if (valid) {
      window.alert('The Appointment added successfully!');
      setTimeout(() => {
        nav('/');
      }, 1000);
    }
  }, [valid, nav]);

  useEffect(() => {
    if (!valid && !invalidDate) {
      window.alert('The date is already taken, please enter another date');
    }
  }, [valid, invalidDate]);

  return (
    <>
      <Container maxWidth="sm" style={{ marginTop: '50px'}}></Container>
      <div style={{backgroundColor:'green'}}>
        <Button onClick={handleOpen}></Button>
        <Modal
        style={{backgroundColor:'pink'}}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{color:'black', marginLeft: '11%' }}>
              ADD A NEW APPOINTMENT IN: <br/><Typography sx={{marginLeft: '28%',fontSize:'large' }}>{MobxData.serviceType}</Typography>
            </Typography>
            <Typography id="modal-modal-description" sx={{ marginLeft: '20%', mt: 2 }}>
              <form
                onSubmit={handleSubmit((dataAppo) => {
                  dataAppo.serviceType = MobxData.serviceType;
                  fetch('http://localhost:8787/appointment', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataAppo),
                  })
                    .then((res) => {
                      if (res.status === 200) {
                        setValid(true);
                      } else if (res.status === 400) {
                        setInvalidDate(false);
                      }
                    })
                    .catch((err) => console.log(invalidDate));
                })}
              >
                <TextField
                  sx={{ m: 1, width: '25ch' }}
                  variant="filled"
                  id="filled-start-adornment"
                  label="id"
                  {...register('id')}
                  placeholder="id"
                />
                <TextField
                  sx={{ m: 1, width: '25ch' }}
                  variant="filled"
                  id="filled-start-adornment"
                  label="clientName"
                  {...register('clientName')}
                  placeholder="clientName"
                />
                <TextField
                  sx={{ m: 1, width: '25ch' }}
                  variant="filled"
                  id="filled-start-adornment"
                  label="clientPhone"
                  {...register('clientPhone')}
                  placeholder="clientPhone"
                />
                <TextField
                  sx={{ m: 1, width: '25ch' }}
                  variant="filled"
                  id="filled-start-adornment"
                  label="clientEmail"
                  type="email"
                  {...register('clientEmail')}
                  placeholder="clientEmail"
                />
                <TextField
                  sx={{ m: 1, width: '25ch' }}
                  variant="filled"
                  type="date"
                  inputProps={{ min: currentDate }}
                  {...register('dateTime')}
                  id={!invalidDate ? 'blur' : 'dateTime'}
                />
                <br />
                <Button
                  sx={{ marginLeft: '22%', mt: 2 }}
                  type="submit"
                  variant="outlined"
                  color="error"
                  endIcon={<SendIcon />}
                >
                  SEND
                </Button>
              </form>
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
});

export default NewAppointment;
