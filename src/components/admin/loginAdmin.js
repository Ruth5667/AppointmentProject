import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
// import { useRouter } from "next/router";
import { observer } from "mobx-react"
import dataMobx from '../dataStore/mobx'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const LoginAdmin = observer(()=>
{
   const[adminName,setAdminName] = useState("");
   const[password,setPassword] = useState("");

   const[loginFailed,setLoginFailed]=useState(false);
   const navigate  = useNavigate();

   useEffect(() => {
    if(loginFailed){
        setAdminName(null);
        setPassword("");
    }
}, [loginFailed])
 // const router = useRouter();

   function handleSubmit(){
    console.log("adminName: "+adminName);
    const data ={'name':adminName,'password':password};
    console.log("data: "+data);
fetch('http://localhost:8787/login',
{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),

})
.then(res=>{
    if(res.status===200){
        dataMobx.flag=true;
        navigate ('/AdminPage')
       
        }
else if(res.status===401){
    setLoginFailed(true); 
}
    console.log(res);
}).
catch(res=>{console.log("error "+res);})
.finally(console.log("finally"));

}
   return(<>
   <Box
//    component="form"
   sx={{
    '& > :not(style)': { m: 1, width: '25ch' },
  }}
      autoComplete="off"
     >  
    <TextField id="outlined-basic" name="adminName"label="NameAdmin"variant="outlined" type="text" onChange={(event)=>setAdminName(event.target.value)}/>
    <br/>
    <TextField name="password" id="outlined-basic"type="password"label="PasswordAdmin"variant="outlined" onChange={(event)=>setPassword(event.target.value)}/>
   <br/>
   
   {/* <input value="Login" type="button"/> */}
{/* <Stack direction="row" spacing={2}> */}
   <div style = {{display: "flex", justifyContent: "center",alignItems:"center",margin: "auto",alignItems: "center"}}>
   <Button  variant="contained" color="success" name="login" type="submit" endIcon={<SendIcon />}onClick={handleSubmit}>Login
   </Button>
   </div>
    {/* </Stack> */}
  </Box>
   {loginFailed&&
   <h2>UserName and password are invalid!!!</h2>}
   
  
  </>);







});
export default LoginAdmin;