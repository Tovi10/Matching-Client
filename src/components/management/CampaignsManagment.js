import React, { useState } from 'react';
import { Button } from 'antd';
import CreateCampaign from './CreateCampaign';
import UpdateCampaign from './UpdateCampaign';
import DeleteCampaigns from './DeleteCampaigns';

import whatToDoImg from '../../assets/whatToDo.png';

export default function CampaignsManagment() {

	const [action, setAction] = useState(null);

	return (
		<div classNameName='CampaignsManagment'>
			<img style={{ width: '35vw', margin: 'auto', display: 'block' }} src={whatToDoImg} />
			<div className='row'>
				<Button className='col' onClick={() => setAction('create')}>יצירה</Button>
				<Button className='col' onClick={() => setAction('update')}>עריכה</Button>
				<Button className='col' onClick={() => setAction('delete')}>מחיקה</Button>
			</div>
			{action === 'create' && <CreateCampaign />}
			{action === 'update' && <UpdateCampaign />}
			{action === 'delete' && <DeleteCampaigns />}
		</div>

	)
}
