import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import failurImg from '../../assets/donationError.png';

export default function Failure() {

    useEffect(() => {
        window.top.postMessage('resetDonation', window.parent.location.href);
        document.body.className = "backgroundFailureImage";
        document.getElementsByClassName('App')[0].classList.remove("APP1");
        return () => {
            document.body.classList.remove("backgroundFailureImage");
            document.getElementsByClassName("App")[0].classList.add("APP1");
        };
    }, [])
   
    return (<></>)

}