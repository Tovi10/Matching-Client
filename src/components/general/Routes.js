import { Route, Switch } from 'react-router-dom';

import CreateCampaign from '../campaigns/CreateCampaign';
import BaseCampaigns from '../campaigns/BaseCampaigns';
import BaseHome from '../home/BaseHome';
import NotFound from './NotFound';
import Campaign from '../campaigns/Campaign';
import GiftDetails from '../campaigns/GiftDetails';
import CreateCard from '../campaigns/CreateCard';
import CreateGift from '../campaigns/CreateGift';
import CampaignDetails from '../campaigns/CampaignDetails';
import About from '../home/About';


export default function Routes() {

    return (
        <div className='Routes'>
            <Switch>
                <Route path="/home" component={BaseHome} />
                <Route path="/about" component={About} />
                <Route path="/gift-details/:currentGift" component={GiftDetails} />
                <Route path="/create-campaign" component={CreateCampaign} />
                <Route path="/new-campaign" component={CampaignDetails} />
                <Route path="/all-campaigns" component={BaseCampaigns} />
                <Route path="/current-campaign/:currentCampaign" component={Campaign} />
                <Route path="/create-card" component={CreateCard} />
                <Route path="/create-gift" component={CreateGift} />
                <Route path="/" component={BaseHome} />
                <Route component={NotFound} />
            </Switch>
        </div>
    )
}

