import React, { useState } from 'react';
import { Button } from 'antd';
import CreateCard from './CreateCard';
import UpdateCard from './UpdateCard';
import DeleteCards from './DeleteCards';

import whatToDoImg from '../../assets/whatToDo.png';

export default function CardsManagment() {

    const [action, setAction] = useState(null);

    return (
        <div className='CardsManagment'>
            <img style={{ width: '35vw', margin: 'auto', display: 'block' }} src={whatToDoImg} />
            <Button onClick={() => setAction('create')}>יצירה</Button>
            <Button onClick={() => setAction('update')}>עריכה</Button>
            <Button onClick={() => setAction('delete')}>מחיקה</Button>
            {action === 'create' && <CreateCard />}
            {action === 'update' && <UpdateCard />}
            {action === 'delete' && <DeleteCards />}
        </div>
    )
}