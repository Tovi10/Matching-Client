import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../redux/actions';
export default function Thank() {

    const dispatch = useDispatch();
    useEffect(() => {
        window.top.postMessage('createDonation', 'https://matching-try.herokuapp.com/current-campaign/618a66d008342abb8852352e')
    }, [])
    return (
        <div className='Thank'>
            thankkkkkkkkkkkk!
        </div>
    )
}