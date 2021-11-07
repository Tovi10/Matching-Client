import React, { useState } from 'react';
import { Button } from 'antd';
import CreateCard from './CreateCard';
import UpdateCard from './UpdateCard';
import DeleteCards from './DeleteCards';

export default function CardsManagment() {
    
    const [action, setAction] = useState(null);

    return (
        <div className='CardsManagment'>
            <h1>מה ברצונך לעשות?</h1>
            <Button onClick={() => setAction('create')}>יצירה</Button>
            <Button onClick={() => setAction('update')}>עריכה</Button>
            <Button onClick={() => setAction('delete')}>מחיקה</Button>
            {action === 'create' && <CreateCard />}
            {action === 'update' && <UpdateCard/>}
            {action === 'delete' && <DeleteCards/>}
        </div>
    )
}