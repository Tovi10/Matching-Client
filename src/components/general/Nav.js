import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Popover, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import UserProfile from '../campaigns/UserProfile';
import Login from '../login/Login';

export default function Nav() {

    const user = useSelector(state => state.userReducer.user);
    const admin = useSelector(state => state.userReducer.admin);

    const [current, setCurrent] = useState(window.location.pathname.split('/')[1]);
    const [showPopover, setShowPopover] = useState(false);

    const handleVisibleChange = () => {
        setShowPopover(!showPopover);
    }
    return (
        <div className='Nav'>
            <div className="row d-dlex align-items-center">
                <div className="navbar-brand col-1">גיפטמאצ'</div>
                {/* <nav className="nav d-dlex justify-content-end col-10"> */}
                <nav className="linksMenu nav d-dlex justify-content-end col-10">
                    <Link className={`nav-link ${(current === 'home' || current === '') ? 'navLinkActive' : ''}`} onClick={() => setCurrent('home')} to='/home'>דף הבית</Link>
                    <Link className={`nav-link ${current === 'about' ? 'navLinkActive' : ''}`} onClick={() => setCurrent('about')} to='/about'>אודות</Link>
                    <Link className={`nav-link ${current === 'all-campaigns' ? 'navLinkActive' : ''}`} onClick={() => setCurrent('all-campaigns')} to='/all-campaigns'>קמפיינים</Link>
                    {(admin || (user && user.allowed)) && <Link className={`nav-link ${current === 'management' ? 'navLinkActive' : ''}`} onClick={() => setCurrent('management')} to='/management'>ניהול</Link>}
                    <Link className={`nav-link ${current === 'personal' ? 'navLinkActive' : ''}`} onClick={() => setCurrent('personal')} to='/personal'>אזור אישי</Link>
                </nav>
                <Popover content={user ? <UserProfile close={handleVisibleChange} /> : <Login />} title="!פרופיל שלי" trigger="click" placement='topRight' visible={showPopover}
                    onVisibleChange={handleVisibleChange}>
                    {(user ?
                        (user.photoURL ?
                            <Tooltip className='pointer' title={user.name || user.email}>
                                <Avatar src={user.photoURL} />
                            </Tooltip> :
                            (user.name ?
                                <Tooltip className='pointer' title={user.name}>
                                    <Avatar>{user.name[0]}</Avatar>
                                </Tooltip> :
                                <Tooltip className='pointer' title={user.email}>
                                    <Avatar>{user.email[0]}</Avatar>
                                </Tooltip>)) :
                        <Tooltip className='pointer' title='לחץ כדי להתחבר.'>
                            <Avatar icon={<UserOutlined />} />
                        </Tooltip>)}
                </Popover>
            </div>
        </div>
    )
}
