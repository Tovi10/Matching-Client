import React, { useState } from 'react';
import { Button } from 'antd';
import CreateRecruiter from './CreateRecruiter';
import UpdateRecruiter from './UpdateRecruiter';

export default function RecruitersManagment() {
    
    const [action, setAction] = useState(null);

    return (
        <div className='RecruitersManagment'>
            <h1>מה ברצונך לעשות?</h1>
            <Button onClick={() => setAction('create')}>יצירה</Button>
            <Button onClick={() => setAction('update')}>עריכה</Button>
            <Button onClick={() => setAction('delete')}>מחיקה</Button>
            {action === 'create' && <CreateRecruiter />}
            {action === 'update' && <UpdateRecruiter/>}
            {action === 'delete' && 'soon delete...'}
        </div>
    )
}