import React, { useEffect } from 'react';

import thankImg from '../../assets/donationSuccess.png'

export default function Thank() {

    useEffect(() => {
         
        window.top.postMessage('createDonation', window.parent.location.href)
        document.body.className = "backgroundThankImage";
        document.getElementsByClassName('App')[0].classList.remove("APP1");
        return () => {
            document.body.classList.remove("backgroundThankImage");
            document.getElementsByClassName("App")[0].classList.add("APP1");
        };
    }, [])

    return (<></>)
}