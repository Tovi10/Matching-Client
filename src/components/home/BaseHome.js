import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LiveCampaigns from '../campaigns/LiveCampaigns';

import { actions } from '../../redux/actions';

export default function BaseHome() {

    const dispatch = useDispatch();
    const allCampaigns = useSelector(state => state.campaignReducer.allCampaigns);

    useEffect(() => {
        dispatch(actions.getAllCampaigns());
    }, []);

    return (
        <div className='BaseHome'>
            {allCampaigns ? <LiveCampaigns /> : ""}
        </div>
    )
}