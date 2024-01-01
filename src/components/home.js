import BusinessDetails from './admin/BusinessDetailsToSet'
import Service from './admin/Service'
import Button from '@mui/material/Button';
import MobxData from './dataStore/mobx'
import { observer } from "mobx-react"
import BasicCard from './user/BuisnessDetails'
const Home = observer(() => {
    return (<>
        <BasicCard />
        <div>
            {!MobxData.isAdmin && <Button id="buttonS" disabled>אנא בחר משירותי העסק</Button>}
        </div>
        <Service />
    </>)
}); export default Home;