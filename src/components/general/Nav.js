import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Popover, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import UserProfile from '../campaigns/UserProfile';
import Login from '../login/Login';

export default function Nav() {

    const firebaseUser = useSelector(state => state.userReducer.firebaseUser);
    const user = useSelector(state => state.userReducer.user);

    const [current, setCurrent] = useState(window.location.pathname.split('/')[1]);
    const [showPopover, setShowPopover] = useState(false);

    const handleVisibleChange = () => {
        setShowPopover(!showPopover);
    }
    return (
        <div className='Nav'>
            <div className="row d-dlex align-items-center">
                <div className="navbar-brand col-1">
                    <Popover content={user ? <UserProfile close={handleVisibleChange} /> : <Login />} title="!פרופיל שלי" trigger="click" placement='topRight' visible={showPopover}
                        onVisibleChange={handleVisibleChange}>
                        {(firebaseUser && firebaseUser.photoURL) ?
                            <Tooltip className='pointer' title={firebaseUser.displayName}>
                                <Avatar src={firebaseUser.photoURL} />
                            </Tooltip> :
                            (user && user.name) ?
                                <Tooltip className='pointer' title={user.name}>
                                    <Avatar>{user.name[0]}</Avatar>
                                </Tooltip> :
                                <Tooltip className='pointer' title='לחץ כדי להתחבר.'>
                                    <Avatar icon={<UserOutlined />} />
                                </Tooltip>}
                    </Popover>
                    {` גיפטמאצ' `}
                </div>
                <nav className="nav d-dlex justify-content-end col-11">
                    <Link className={`nav-link ${(current === 'home'||current === '') ? 'navLinkActive' : ''}`} onClick={() => setCurrent('home')} to='/home'>דף הבית</Link>
                    <Link className={`nav-link ${current === 'about' ? 'navLinkActive' : ''}`} onClick={() => setCurrent('about')} to='/about'>אודות</Link>
                    <Link className={`nav-link ${current === 'all-campaigns' ? 'navLinkActive' : ''}`} onClick={() => setCurrent('all-campaigns')} to='/all-campaigns'>קמפיינים</Link>
                    <Link className={`nav-link ${current === 'create-campaign' ? 'navLinkActive' : ''}`} onClick={() => setCurrent('create-campaign')} to='/create-campaign'>צור קמפיין</Link>
                    <Link className={`nav-link ${current === 'personal' ? 'navLinkActive' : ''}`} onClick={() => setCurrent('personal')} to='personal'>אזור אישי</Link>
                </nav>
            </div>
        </div>
    )
}
