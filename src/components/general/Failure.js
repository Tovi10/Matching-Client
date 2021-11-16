import React from 'react';

import failurImg from '../../assets/donationError.png';

export default function Failure() {
    return (
        <div className='Failure'>
            <img style={{ width: "100vw" }} src={failurImg} />
        </div>
    )
}