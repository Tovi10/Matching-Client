import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';


export default function Failure() {
    // const campaignId = useSelector(state => state.campaignReducer.campaign._id)
    useEffect(() => {
        console.log(window.location.pathname);
        // console.log("🚀 ~ file: Failure.js ~ line 7 ~ Failure ~ campaignId FROM IFRAME", campaignId)
        window.top.postMessage('resetDonation', 'https://matching-try.herokuapp.com/current-campaign/618a66d008342abb8852352e')
    }, [])
    return (
        <div className='Failure clrWhite' style={{fontSize:'150px'}}>
            failure!
        </div>
    )
}