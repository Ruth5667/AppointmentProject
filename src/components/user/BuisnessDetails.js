import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MobxData from '../dataStore/mobx'
import { observer } from "mobx-react"

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
const BasicCard = observer(()=>{
const buisnessData = MobxData.getBuisnessData;
debugger
  return (<>
    {buisnessData.name&&<Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
               {<img src={buisnessData?.logo} alt="Business Logo" />}
        </Typography>
        <Typography variant="h5" component="div">
        {buisnessData?.name}{buisnessData?.address}{buisnessData?.description}{buisnessData?.owner}{buisnessData?.phone}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>}
    </> );
});
export default BasicCard;