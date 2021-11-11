import React from 'react';
import { useSelector } from 'react-redux';
import UserProfile from '../campaigns/UserProfile';
import Login from '../login/Login';

export default function Personal() {


    const user = useSelector(state => state.userReducer.user);

    return (
        <div className='Personal'>
            {user ? <UserProfile /> : <Login />}
        </div>
    )
}