import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './Routes';
import Footer from './Footer';
import Nav from './Nav';
import Notification from './Notification';

import '../../style/custom-antd.css'
import '../../styles/general.css';
import '../../styles/campaign.css';
import '../../styles/allCampaigns.css';
import '../../styles/liveCampaigns.css';
import '../../styles/nav.css';

export default function Base() {
    return (
        <Router>
            <div className='Base container'>
                <Nav />
                <Routes />
                {/* <Footer /> */}
                <Notification />
            </div>
        </Router>
    )
}