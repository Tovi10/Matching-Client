import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {

    const [current, setCurrent] = useState(window.location.pathname.split('/')[1]);
    return (
        <div className='Nav'>
            <div className="row d-dlex align-items-center">
                <div className="navbar-brand col-1">גיפטמאצ'</div>
                <nav className="nav d-dlex justify-content-end col-11">
                    <Link className={`nav-link ${current === 'home' ? 'navLinkActive' : ''}`} onClick={() => setCurrent('home')} to='/home'>דף הבית</Link>
                    <Link className={`nav-link ${current === 'about' ? 'navLinkActive' : ''}`} onClick={() => setCurrent('about')} to='/about'>אודות</Link>
                    <Link className={`nav-link ${current === 'platforma' ? 'navLinkActive' : ''}`} onClick={() => setCurrent('platforma')} to=''>פלטפורמה</Link>
                    <Link className={`nav-link ${current === 'all-campaigns' ? 'navLinkActive' : ''}`} onClick={() => setCurrent('all-campaigns')} to='/all-campaigns'>קמפיינים</Link>
                    <Link className={`nav-link ${current === 'create-campaign' ? 'navLinkActive' : ''}`} onClick={() => setCurrent('create-campaign')} to='/create-campaign'>צור קמפיין</Link>
                    <Link className={`nav-link ${current === '' ? 'navLinkActive' : ''}`} onClick={() => setCurrent('')} to=''>אזור אישי</Link>
                </nav>
            </div>
        </div>
    )
}
