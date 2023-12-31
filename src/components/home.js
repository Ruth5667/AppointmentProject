import BusinessDetails from './admin/BusinessDetails'
import Service from './admin/Service'
import Button from '@mui/material/Button';
import MobxData from './dataStore/mobx'
import { observer } from "mobx-react"
const Home = observer(() => {
return(<>
<BusinessDetails/>
{!MobxData.flag&&<Button id="buttonS"disabled>אנא בחר משירותי העסק</Button>}
<Service/>
</>)
});export default Home;