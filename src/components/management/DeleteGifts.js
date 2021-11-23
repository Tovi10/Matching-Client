import React, { useEffect, useState } from 'react';
import { Table, Button, Spin, Popconfirm, Form, Select, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';
import { firebase } from '../../services/firebase.service';
import moment from 'moment';

export default function DeleteGifts() {

    const dispatch = useDispatch();
    const allGifts = useSelector(state => state.giftReducer.allGifts);
    const currentNotification = useSelector(state => state.generalReducer.currentNotification);

    const [gifts, setGifts] = useState(null);


    useEffect(() => {
        if (!allGifts)
            dispatch(actions.getAllGifts())
    }, [])


    useEffect(() => {
        if (allGifts)
            setGifts(allGifts.filter(g => !g.used));
    }, [allGifts])

    
    useEffect(() => {
        // setSpining(false)
        if (currentNotification === 'המתנה נמחקה בהצלחה!' && gifts) {
           alert('מתנה נמחקה')
        }
    }, [currentNotification])


    const confirm = async (gift) => {
        dispatch(actions.deleteGift(gift));
    }

    const columns = [
        {
            title: '',
            dataIndex: '',
            render: (gift) =>
                <Popconfirm
                    title="האם אתה בטוח שאתה רוצה למחוק?"
                    onConfirm={() => confirm(gift)}
                    okText="כן"
                    cancelText="לא"
                    style={{ direction: 'ltr' }}
                    icon={null}
                >
                    <Button >מחק!</Button>
                </Popconfirm>,
            className: 'rtlColumn',
            align: 'left',
        }, {
            title: 'כמות',
            dataIndex: 'amount',
            align: 'right',
            className: 'rtlColumn'
        }, {
            title: 'מחיר',
            dataIndex: 'price',
            align: 'right',
            className: 'rtlColumn'
        }, {
            title: 'תמונה',
            dataIndex: 'image',
            render: (image) => <img src={image} width='100' />,
            align: 'right',
        }, {
            title: 'שם מתנה',
            dataIndex: 'name',
            align: 'right',
            className: 'rtlColumn'
        },


    ];
    return (
        <div className='DeleteGifts mt-3'>
            <h6 className='clrWhite'>כאן מוצגים רק הכרטיסים שעוד לא השתמשו בהם</h6>
            <Spin size='large' spinning={!gifts}>
                <Table dataSource={gifts} columns={columns}
                    rowKey={gift => gift._id}
                    pagination={{ position: ['bottomLeft', 'none'] }}
                    locale={{
                        emptyText: 'לא נמצאו מתנות',
                    }}
                    style={{ direction: 'ltr' }} />
            </Spin>
        </div>
    )
}