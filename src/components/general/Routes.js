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
import RecruiterArea from '../general/RecruiterArea';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Thank from './Thank';
import Failure from './Failure';
import CampaignsManagment from '../management/CampaignsManagment';
import GiftsManagment from '../management/GiftsManagment';
import RecruitersManagment from '../management/RecruitersManagment';
import Applies from '../management/Applies';
import CardsManagment from '../management/CardsManagment';


export default function Routes() {

    const admin = useSelector(state => state.userReducer.admin);
    const user = useSelector(state => state.userReducer.user);

    return (
        <div className='Routes'>
            <Switch>
                <Route exact path="/" component={BaseHome} />
                <Route path="/home" component={BaseHome} />
                <Route path="/about" component={About} />
                <Route path="/gift-details/:currentGift" component={GiftDetails} />
                <Route path="/new-campaign" component={CampaignDetails} />
                <Route path="/all-campaigns" component={BaseCampaigns} />
                <Route path="/personal" component={Personal} />
                <Route path="/current-campaign/:currentCampaign" component={Campaign} />
                <Route path="/recruiters/:recruiterId" component={RecruiterArea} />
                <Route path="/thank" component={Thank} />
                <Route path="/failure" component={Failure} />
                {(admin || (user && user.allowed)) && <Route path="/management" component={BaseManagement} />}
                {(admin || (user && user.allowed)) && <Route path="/management/campaigns" component={CampaignsManagment} />}
                {(admin || (user && user.allowed)) && <Route path="/management/gifts" component={GiftsManagment} />}
                {(admin || (user && user.allowed)) && <Route path="/management/recruiters" component={RecruitersManagment} />}
                {(admin || (user && user.allowed)) && <Route path="/management/cards" component={CardsManagment} />}
                {(admin || (user && user.allowed)) && <Route path="/management/applies" component={Applies} />}
                <Route path="*" component={NotFound} />
            </Switch >
        </div >
    )
}

