import { Route, Switch } from 'react-router-dom';
import BaseCampaigns from '../campaigns/BaseCampaigns';
import BaseHome from '../home/BaseHome';
import NotFound from './NotFound';
import Campaign from '../campaigns/Campaign';
import GiftDetails from '../campaigns/GiftDetails';
import About from '../home/About';
import Personal from '../home/Personal';
import CampaignDetails from '../management/CampaignDetails';
import BaseManagement from '../management/BaseManagement';
import { useSelector } from 'react-redux';


export default function Routes() {

    const admin=useSelector(state=>state.userReducer.admin);
    const user=useSelector(state=>state.userReducer.user);
    return (
        <div className='Routes'>
            <Switch>
                <Route path="/home" component={BaseHome} />
                <Route path="/about" component={About} />
                <Route path="/gift-details/:currentGift" component={GiftDetails} />
                <Route path="/new-campaign" component={CampaignDetails} />
                <Route path="/all-campaigns" component={BaseCampaigns} />
                <Route path="/current-campaign/:currentCampaign" component={Campaign} />
                <Route path="/personal" component={Personal} />
                {(admin || (user&&user.allowed)) &&<Route path="/management" component={BaseManagement} />}
                <Route path="" component={BaseHome} />
                <Route component={NotFound} />
            </Switch>
        </div>
    )
}

