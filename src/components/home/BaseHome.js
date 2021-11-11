import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LiveCampaigns from '../campaigns/LiveCampaigns';

import { actions } from '../../redux/actions';

import img from '../../assets/backgroundHomePage.png'

export default function BaseHome() {

    const dispatch = useDispatch();
    const allCampaigns = useSelector(state => state.campaignReducer.allCampaigns);

    useEffect(() => {
        dispatch(actions.getAllCampaigns());
        document.body.className = "backgroundHomeImage";
        document.getElementsByClassName('App')[0].classList.remove("APP1");
        // document.body.style.backgroundImage = "url('../assets/backgroundHomePage.png')";
        // // document.body.style.WebkitBackgroundSize = "cover";
        // document.body.style.backgroundRepeat = "no-repeat";
        // document.body.style.bbackgroundSize = "cover";
        return () => {
            document.body.classList.remove("backgroundHomeImage");
            document.getElementsByClassName("App")[0].classList.add("APP1");
        };
    }, []);

    return (
        <div className='BaseHome'>
            <p className="homeText">
                unsatiable it on moment up elsewhere
                <br />ecstatic easily near half mrs On garden Ham in humoured mean mrs found him
                <br />plan indeed Likewise speaking shortly wished forming had all
                <br />mile she weeks law few on continual be deal On Home part to get right
                <br />Dear it an Total questions how mr yesterday money these at temper are have
                <br />horrible he get besides too feeling nay not Polite of she her
                <br />Not are put on as had wholly or Visited compliment those in yet ye or curiosity songs
                <br />where wondered Melancholy trifling So melancholy seems remaining
                <br />up bed am forming dependent Could announcing laughing and you
            </p>
            {allCampaigns ? <LiveCampaigns /> : ""}
        </div>
    )
}