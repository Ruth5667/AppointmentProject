import { useEffect, useState } from "react";
import { observer } from "mobx-react"
import MobxData from '../dataStore/mobx'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CreateIcon from '@mui/icons-material/Create';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import { useNavigate } from "react-router-dom";


const BusinessDetails = observer(()=>
 {
    const [businessData, setBusinessData] = useState({});
    // const ServisesContext = createContext(null);
    // const [edit, setEdit] = useState(false);
    const [name, setName] = useState("");
    const [owner, setOwner] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAdress] = useState("");
    const [description, setDescription] = useState("");
    const [logo, setLogo] = useState("")
    let nav=useNavigate();
    useEffect(() => {
        getBuisnessData()
    }, [])
    async function getBuisnessData() {
        let data = await fetch('http://localhost:8787/businessData')
        let datajson = await data.json()
        setBusinessData(datajson)
        setDescription(datajson.description)
        setName(datajson.name)
        setAdress(datajson.address)
        setPhone(datajson.phone)
        setOwner(datajson.owner)
        setLogo(datajson.logo)
    }
    function handleClick() {
        MobxData.setEdit(true);
        !MobxData.edit&&nav('updatedatails')

    }
    function handleSave() {
        let data = { name, logo, phone, address, description, owner }
        fetch('http://localhost:8787/businessData',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),

            })
            .then(res => {
                MobxData.setEdit(false);
                MobxData.setBusinessData(data);
            }).
            catch(res => { console.log("error " + res); })
            .finally(console.log("finally"));
    }
    // const buisnessData = MobxData.getBuisnessData;

    return (

        name &&
        <div>
            {!MobxData.edit && <img src={logo} alt="Business Logo" />}
            <Box
             sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
                  autoComplete="off"
                 > 
        {MobxData.edit && (
          <TextField
            id="outlined-basic"
            type="text"
            name="logo"
            variant="outlined"
            label="Logo"
            value={logo}
            onChange={(event) => setLogo(event.target.value)}
          />
        )}
        <br />
        <TextField
          type="text"
          id="outlined-basic"
          name="businessName"
          label="Business Name"
          variant="outlined"
          value={name}
          onChange={(event) => setName(event.target.value)}
        //   readOnly={!edit}
        />

        <TextField
          type="text"
          id="outlined-basic"
          name="owner"
          label="Business Owner"
          variant="outlined"
          value={owner}
          onChange={(event) => setOwner(event.target.value)}
        //   readOnly={!edit}
        />
        <br />
        <TextField
          type="text"
          value={address}
          id="outlined-basic"
          name="address"
          label="Address"
          variant="outlined"
          onChange={(event) => setAdress(event.target.value)}
        //   readOnly={!edit}
        />
        <TextField
          type="text"
          value={phone}
          id="outlined-basic"
          name="phone"
          label="Phone"
          variant="outlined"
          onChange={(event) => setPhone(event.target.value)}
        //   readOnly={!edit}
        />
        <br />
        <TextField
          type="text"
          value={description}
          id="outlined-basic"
          name="description"
          label="Additional Details"
          variant="outlined"
          onChange={(event) => setDescription(event.target.value)}
        //   readOnly={!MobxData.edit}
        />
   <div style = {{display: "flex", justifyContent: "center",alignItems:"center",margin: "auto",alignItems: "center"}}>
            {MobxData.isAdmin &&!MobxData.edit && <Button style={{width:'180px'}} variant="contained" color="success" name="edit" type="submit" endIcon={<CreateIcon />}
             onClick={handleClick}>edit </Button>}
             </div>
   <div style = {{display: "flex", justifyContent: "center",alignItems:"center",margin: "auto",alignItems: "center"}}>

            {MobxData.edit && <Button variant="contained" color="success" name="save" type="submit" endIcon={<SaveAsOutlinedIcon />}
            onClick={handleSave}>save</Button>}
            </div>
            </Box>
        </div>)
});
export default BusinessDetails;