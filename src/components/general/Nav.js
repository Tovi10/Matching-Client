import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Avatar, Popover, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import UserProfile from '../campaigns/UserProfile';
import Login from '../login/Login';

import logo from '../../assets/logoWhite.png'
import profileInNav from '../../assets/profileInNav.svg'
import allCampaigns from '../../assets/allCampaigns.svg'

export default function Nav() {

    const user = useSelector(state => state.userReducer.user);
    const admin = useSelector(state => state.userReducer.admin);

    const [showPopover, setShowPopover] = useState(false);

    const handleVisibleChange = () => {
        setShowPopover(!showPopover);
    }
    return (
        <div className='Nav'>
            <div className="row d-dlex align-items-center">
                <div className="navbar-brand col-2">
                    <img src={logo} width='100%' />
                </div>
                <nav className="linksMenu nav d-dlex justify-content-end col-9">
                    <NavLink activeClassName='navLinkActive' className='nav-link' to='/home'>דף הבית</NavLink>
                    <NavLink activeClassName='navLinkActive' className='nav-link' to='/about'>אודות</NavLink>
                    <NavLink activeClassName='navLinkActive' className='nav-link' to='/all-campaigns'>קמפיינים</NavLink>
                    {(admin || (user && user.allowed)) && <NavLink activeClassName='navLinkActive' className='nav-link' to='/management'>ניהול</NavLink>}
                    <NavLink activeClassName='navLinkActive' className='nav-link' to='/personal'>אזור אישי</NavLink>
                    <Popover content={user ? <UserProfile close={handleVisibleChange} /> : <Login />} title="!פרופיל שלי" trigger="click" visible={showPopover}
                        onVisibleChange={handleVisibleChange}>
                        <div className='d-flex justify-content-center align-items-center  pointer profileInNav'>
                            {user ?
                                (user.name ?
                                    <Tooltip title={user.name}>
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <svg className="pAbsolute" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 600 600"><path d="M449.5 177.2C485.4 225.8 500.5 287.5 483.9 334.8 467.4 382 419.3 414.9 370.7 433 322.1 451.1 273.1 454.4 221.4 438.8 169.8 423.3 115.5 388.9 103.6 343.1 91.8 297.3 122.4 240 162.2 190.6 202 141.2 251 99.6 303.9 96.5 356.8 93.4 413.6 128.7 449.5 177.2Z" fill="#FAE01A" /></svg>
                                            {/* <img src={profileInNav} /> */}
                                            <div className='profileLetter'>{user.name[0]}</div>
                                        </div>
                                    </Tooltip> :
                                    <Tooltip title={user.email}>
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <svg className="pAbsolute" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 600 600"><path d="M449.5 177.2C485.4 225.8 500.5 287.5 483.9 334.8 467.4 382 419.3 414.9 370.7 433 322.1 451.1 273.1 454.4 221.4 438.8 169.8 423.3 115.5 388.9 103.6 343.1 91.8 297.3 122.4 240 162.2 190.6 202 141.2 251 99.6 303.9 96.5 356.8 93.4 413.6 128.7 449.5 177.2Z" fill="#FAE01A" /></svg>
                                            <div className='profileLetter'>{user.email[0]}</div>
                                        </div>
                                    </Tooltip>) :
                                <Tooltip title='לחץ כדי להתחבר.'>
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <svg className="pAbsolute" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 600 600"><path d="M449.5 177.2C485.4 225.8 500.5 287.5 483.9 334.8 467.4 382 419.3 414.9 370.7 433 322.1 451.1 273.1 454.4 221.4 438.8 169.8 423.3 115.5 388.9 103.6 343.1 91.8 297.3 122.4 240 162.2 190.6 202 141.2 251 99.6 303.9 96.5 356.8 93.4 413.6 128.7 449.5 177.2Z" fill="#FAE01A" /></svg>
                                        <div className='profileLetter'>?</div>
                                    </div>
                                </Tooltip>
                            }
                        </div>
                    </Popover>
                </nav>

            </div>
        </div>
    )
}
