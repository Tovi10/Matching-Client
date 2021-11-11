import React, { useState } from 'react';
import { Button } from 'antd';
import CreateCampaign from './CreateCampaign';
import UpdateCampaign from './UpdateCampaign';
import DeleteCampaigns from './DeleteCampaigns';

export default function CampaignsManagment() {

    const [action,setAction]=useState(null);
    
    return (
        <div className='CampaignsManagment'>
            <h1>מה ברצונך לעשות?</h1>
            <Button onClick={()=>setAction('create')}>יצירה</Button>
            <Button onClick={()=>setAction('update')}>עריכה</Button>
            <Button onClick={()=>setAction('delete')}>מחיקה</Button>
            {action==='create'&&<CreateCampaign/>}
            {action==='update'&&<UpdateCampaign/>}
            {action==='delete'&&<DeleteCampaigns/>}
        </div>
    )
}