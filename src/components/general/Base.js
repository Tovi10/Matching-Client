import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { actions } from '../../redux/actions';
import Routes from './Routes';
import Nav from './Nav';
import Notification from './Notification';

import '../../style/custom-antd.css'
import '../../styles/general.css';
import '../../styles/campaign.css';
import '../../styles/allCampaigns.css';
import '../../styles/liveCampaigns.css';
import '../../styles/nav.css';
import '../../styles/about.css';
import '../../styles/stamp.css';
import '../../styles/createRecruiter.css';
import '../../styles/recruiterArea.css';

export default function Base() {

    const dispatch = useDispatch()
    useEffect(() => {
        const cookie = document.cookie.split('giftMatchUserUid=');
        if (cookie.length === 2 && cookie[1]) {
            dispatch(actions.getUserByUid(cookie[1]))
        }
    }, [])
    return (
        <Router>
            <div className='Base container'>
                <Nav />
                <Routes />
                <Notification />
            </div>
        </Router>
    )
}