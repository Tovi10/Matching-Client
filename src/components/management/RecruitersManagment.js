import React, { useState } from 'react';
import { Button } from 'antd';
import CreateRecruiter from './CreateRecruiter';
import UpdateRecruiter from './UpdateRecruiter';
import DeleteRecruiters from './DeleteRecruiters';

import whatToDoImg from '../../assets/whatToDo.png';

export default function RecruitersManagment() {

    const [action, setAction] = useState(null);

    return (
        <div className='RecruitersManagment'>
            <img style={{ width: '35vw', margin: 'auto', display: 'block' }} src={whatToDoImg} />
            <Button onClick={() => setAction('create')}>יצירה</Button>
            <Button onClick={() => setAction('update')}>עריכה</Button>
            <Button onClick={() => setAction('delete')}>מחיקה</Button>
            {action === 'create' && <CreateRecruiter />}
            {action === 'update' && <UpdateRecruiter />}
            {action === 'delete' && <DeleteRecruiters />}
        </div>
    )
}