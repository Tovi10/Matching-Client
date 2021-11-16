import React, { useEffect } from 'react';

export default function Thank() {

    useEffect(() => {
        window.top.postMessage('createDonation', 'https://matching-try.herokuapp.com/current-campaign/618a66d008342abb8852352e')
        // window.top.postMessage('resetDonation', 'https://matching-try.herokuapp.com/current-campaign/618a66d008342abb8852352e')
    }, [])
    return (
        <div className='Thank clrWhite'  style={{fontSize:'150px'}}>
            thankkkkkkkkkkkk!
        </div>
    )
}