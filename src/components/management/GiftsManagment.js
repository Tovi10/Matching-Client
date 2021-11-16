import React, { useState } from 'react';
import { Button } from 'antd';
import CreateGift from './CreateGift';
import UpdateGift from './UpdateGift';
import DeleteGifts from './DeleteGifts';

import whatToDoImg from '../../assets/whatToDo.png';

export default function GiftsManagment() {

    const [action, setAction] = useState(null);

    return (
        <div className='GiftsManagment'>
            <img style={{ width: '35vw', margin: 'auto', display: 'block' }} src={whatToDoImg} />
            <Button onClick={() => setAction('create')}>יצירה</Button>
            <Button onClick={() => setAction('update')}>עריכה</Button>
            <Button onClick={() => setAction('delete')}>מחיקה</Button>
            {action === 'create' && <CreateGift />}
            {action === 'update' && <UpdateGift />}
            {action === 'delete' && <DeleteGifts />}
        </div>
    )
}