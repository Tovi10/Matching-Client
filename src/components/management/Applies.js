import React, { useEffect } from 'react';
import { Table } from 'antd';
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
            title: '_id',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Text',
            dataIndex: 'text',
            key: 'text',
        },
    ];
    return (
        <div className='Applies'>
          {applies?<Table dataSource={applies} columns={columns} />:'no applies'}
        </div>
    )
}