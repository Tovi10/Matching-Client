import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LiveCampaigns from '../campaigns/LiveCampaigns';

import { actions } from '../../redux/actions';

import yourDonationWorthMoreImg from '../../assets/yourDonationWorthMore.png'

export default function BaseHome() {

    const dispatch = useDispatch();
    const allCampaigns = useSelector(state => state.campaignReducer.allCampaigns);

    useEffect(() => {
        dispatch(actions.getAllCampaigns());
        document.body.className = "backgroundHomeImage";
        document.getElementsByClassName('App')[0].classList.remove("APP1");
        return () => {
            document.body.classList.remove("backgroundHomeImage");
            document.getElementsByClassName("App")[0].classList.add("APP1");
        };
    }, []);

    return (
        <div className='BaseHome'>
            <img className="donationWorthImg" src={yourDonationWorthMoreImg} />
            <p className="homeText ">סתם משפט שאני רוצה לשים מתחת למשפט הזה כדי שיהיה יפה.</p>
            {allCampaigns ? <LiveCampaigns /> : ""}
        </div>
    )
}