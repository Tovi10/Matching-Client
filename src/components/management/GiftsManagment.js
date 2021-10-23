import React, { useState } from 'react';
import { Button } from 'antd';
import CreateGift from './CreateGift';
import UpdateGift from './UpdateGift';

export default function GiftsManagment() {
    
    const [action, setAction] = useState(null);

    return (
        <div className='GiftsManagment'>
            <h1>מה ברצונך לעשות?</h1>
            <Button onClick={() => setAction('create')}>יצירה</Button>
            <Button onClick={() => setAction('update')}>עריכה</Button>
            <Button onClick={() => setAction('delete')}>מחיקה</Button>
            {action === 'create' && <CreateGift />}
            {action === 'update' && <UpdateGift/>}
            {action === 'delete' && 'soon delete...'}
        </div>
    )
}