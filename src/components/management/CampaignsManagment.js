import React, { useState } from 'react';
import { Button } from 'antd';
import CreateCampaign from './CreateCampaign';
import UpdateCampaign from './UpdateCampaign';
import DeleteCampaigns from './DeleteCampaigns';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import whatToDoImg from '../../assets/whatToDo.png';

export default function CampaignsManagment() {

	const [action, setAction] = useState(null);

	return (
		<div classNameName='CampaignsManagment'>
			<img style={{ width: '35vw', margin: 'auto', display: 'block' }} src={whatToDoImg} />
			<div className='row'>
				<div className='col-4'></div>
				<div className='col-4'>
					<div className='row d-flex justify-content-around'>
						<Button title={'יצירה'} className='col-3 d-flex justify-content-center align-items-center managmentAction' onClick={() => setAction('create')}><PlusOutlined className='px-2'/>יצירה</Button>
						<Button title={'עריכה'} className='col-3 d-flex justify-content-center align-items-center managmentAction' onClick={() => setAction('update')}><EditOutlined className='px-2' />עריכה</Button>
						<Button title={'מחיקה'} className='col-3 d-flex justify-content-center align-items-center managmentAction' onClick={() => setAction('delete')}><DeleteOutlined className='px-2' />מחיקה</Button>
					</div>
				</div>
			</div>
			{action === 'create' && <CreateCampaign />}
			{action === 'update' && <UpdateCampaign />}
			{action === 'delete' && <DeleteCampaigns />}
		</div>

	)
}
