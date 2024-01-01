import { useForm } from "react-hook-form";
import {  useState } from "react";
import {useNavigate} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

export default function NewService(){
    let nav =useNavigate()
    const { register, handleSubmit } = useForm();
    const [massege, setmassege] = useState("");
    const [good, setGood] = useState(false);
  
    return(
        <>
          <form onSubmit={handleSubmit((dataServ) => {
                       fetch('http://localhost:8787/service',
                               {
                                   method: "POST",
                                   headers: {
                                       "Content-Type": "application/json",
                                   },
                                   body: JSON.stringify(dataServ),
                   
                               })
                      .then(res => {
                        const r=res.dataServ;
                        console.log(r)
                        setmassege(r) 
                        setGood(true)
                      }).catch(err=>
                        setmassege(err.response.data)
                        )
                    }
          
            )}>
                     
         
          
       
                <TextField  sx={{ m: 1, width: '25ch' }}
               variant="filled"
               id="filled-start-adornment"
                 label="id"  autoComplete="current-password"{...register("id")} placeholder="id" />
                <br />
                <TextField sx={{ m: 1, width: '25ch' }}
               variant="filled"
               id="filled-start-adornment" 
                label="name"   autoComplete="current-password"{...register("name")} placeholder="name" />
                <br />
                <TextField sx={{ m: 1, width: '25ch' }}
               variant="filled"
               id="filled-start-adornment" label="description" {...register("description")} placeholder="description" />
                <br />
                <TextField sx={{ m: 1, width: '25ch' }}
                variant="filled"
                id="filled-start-adornment"
                label="price" {...register("price")} placeholder="price" />
                <br />
                <TextField sx={{ m: 1, width: '25ch' }}
                variant="filled"
                 id="filled-start-adornment"
                 label="duration"{...register("duration")} placeholder="duration" />
                <br />
                <Button type="submit" variant="outlined" color="error"endIcon={<SendIcon />}> SEND</Button>

            </form>
            {good&&nav('/service')}
            <p>{massege}</p>
        
        
        
        </>
    )
}





