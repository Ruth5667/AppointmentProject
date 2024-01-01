// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import MobxData from '../dataStore/mobx'
// import { observer } from "mobx-react"

// const BasicCard = observer(() => {
//   const buisnessData = MobxData.getBuisnessData;
//    return(<>
//    <Box 
//    component="span"
//          sx={{ paddingLeft:'1%',display: 'inline-block', mx: '25px', transform: 'scale(1)' }}
//        >
//     {buisnessData.name && <Card sx={{ minWidth: 275 }}>
//       <CardContent>
//         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//           {<img src={buisnessData?.logo} alt="Business Logo"/>}
//         </Typography>
//      <div style = {{display: "flex", justifyContent: "center",alignItems:"center",margin: "auto",alignItems: "center"}}>
//         <Typography variant="h5" component="div">
//           {buisnessData?.name}<br />By: {buisnessData?.owner}
//         </Typography>
//         </div>
//         <Typography sx={{ mb: 1.5 }} color="text.secondary">
//           {buisnessData?.address}<br />{buisnessData?.phone}
//         </Typography>
//         <Typography variant="body2">
//           {buisnessData?.description}.
//         </Typography>
//       </CardContent>
//       {/* <CardActions>
//           <Button size="small">Learn More</Button>
//       </CardActions> */}
//     </Card>}
//     </Box> </>);
// });
// export default BasicCard;
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MobxData from '../dataStore/mobx';
import { observer } from 'mobx-react';

const BasicCard = observer(() => {
  const businessData = MobxData.getBuisnessData;

  return (
    <Box
      component="span"
      sx={{
        paddingLeft: '1%',
        display: 'inline-block',
        mx: '25px',
        transform: 'scale(1)',
        maxWidth: 400,
        margin: 'auto',
      }}
    >
      {businessData.name && (
        <Card>
          <CardContent>
            <Typography variant="h6" component="div" sx={{ textAlign: 'center', mb: 2 }}>
              <img src={businessData?.logo} alt="Business Logo" style={{ maxWidth: '100%', height: 'auto' }} />
            </Typography>
            <Typography variant="h5" component="div" sx={{ textAlign: 'center', mb: 1 }}>
              {businessData?.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: 'center', mb: 1 }}>
              By: {businessData?.owner}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 1 }}>
              {businessData?.address}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 1 }}>
              {businessData?.phone}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 2 }}>
              {businessData?.description}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
});

export default BasicCard;
