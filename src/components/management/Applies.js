import React, { useEffect } from 'react';
import { Table, Button, Spin, Tag, Tooltip, Avatar, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';

export default function Applies() {

    const dispatch = useDispatch();
    const applies = useSelector(state => state.applyReducer.applies);

    useEffect(() => {
        if (!applies)
            dispatch(actions.getApplies())
    }, [])

    const columns = [
        {
            title: '',
            dataIndex: '',
            render: (text, apply) =>
                !apply.status ?
                    <Button onClick={() => dispatch(actions.confirmApply(apply._id))}>אשר!</Button> :
                    <Tag color='green' className='notSelected pointer'>הסתיים</Tag>,
            className: 'rtlColumn',
            align: 'left',
        },
        {
            title: 'תוכן',
            dataIndex: 'text',
            width: '80%',
            align: 'right',
            ellipsis: true,
            className: 'rtlColumn'
        },
        // {
        //     title: 'סטטוס',
        //     dataIndex: 'status',
        //     render: (status, apply) => <Tag color={status ? 'blue' : 'green'} className='notSelected pointer'>{status ? '!אושר' : '.בטיפול'}</Tag>,
        //     align: 'center',
        // },
        {
            title: 'משתמש',
            dataIndex: 'user',
            render: (user, apply) =>
                <Tooltip className='pointer' title={user.name}>
                    <Avatar>{user.name[0]}</Avatar>
                </Tooltip>,
            align: 'center',
        },
    ];
    return (
        <div className='Applies'>
            <Spin size='large' spinning={!applies}>
                <Table dataSource={applies} columns={columns}
                    rowKey={apply => apply._id}
                    pagination={{ position: ['bottomLeft', 'none'] }}
                    style={{ direction: 'ltr' }} />
            </Spin>
        </div>
    )
}