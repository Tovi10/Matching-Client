import React, { useEffect } from 'react';

import thankImg from '../../assets/donationSuccess.png'

export default function Thank() {

    useEffect(() => {
        window.top.postMessage('createDonation', 'https://matching-try.herokuapp.com/current-campaign/618a66d008342abb8852352e')
    }, []);

    return (
        <div className='Thank'>
            <img style={{ width: "100vw", position: 'absolute', top: '0%', right: '0%' }} src={thankImg} />
        </div>
    )
}