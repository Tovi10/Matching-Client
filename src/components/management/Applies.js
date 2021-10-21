import React, { useEffect } from 'react';
import { Table, Button, Spin, } from 'antd';
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
            render: (text, apply) => <Button onClick={() => dispatch(actions.confirmApply(apply._id))}>אשר!</Button>,
            className: 'rtlColumn'
        },
        {
            title: 'תוכן הבקשה',
            dataIndex: 'text',
            width: 800,
            align: 'right',
            ellipsis: true,
            className: 'rtlColumn'
        },
        {
            title: 'סטטוס הבקשה',
            dataIndex: 'status',
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