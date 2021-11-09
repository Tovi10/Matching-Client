import React, { useEffect, useState } from 'react';
import { Table, Button, Spin, Popconfirm, Form, Select, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';
import { firebase } from '../../services/firebase.service';
import moment from 'moment';

export default function DeleteCards() {

    const dispatch = useDispatch();
    const allCampaigns = useSelector(state => state.campaignReducer.allCampaigns);
    const user = useSelector(state => state.userReducer.user);
    const admin = useSelector(state => state.userReducer.admin);

    const [form] = Form.useForm();

    const [cards, setCards] = useState();


    useEffect(() => {
        if (!allCampaigns & admin)
            dispatch(actions.getAllCampaigns())
    }, [])

    useEffect(() => {

        if (allCampaigns&&form.getFieldValue('campaign')) {
            const campaign = allCampaigns.find(c => c._id === form.getFieldValue('campaign'));
            setCards(campaign.cards.filter(c => !c.used));
        }
    }, [allCampaigns])


    const choose = (campaignId) => {
        const campaign = allCampaigns.find(c => c._id === campaignId);
        console.log("🚀 ~ file: DeleteCards.js ~ line 41 ~ choose ~ campaign", campaign)
        setCards(campaign.cards.filter(c => !c.used));
    }
    const confirm = async (cardId) => {
        console.log("🚀 ~ file: DeleteCards.js ~ line 45 ~ confirm ~ cardId", cardId)
        const card = cards.find(c => c._id === cardId);
        // delete card from server
        dispatch(actions.deleteCard(card));
    }

    const columns = [
        {
            title: '',
            dataIndex: '',
            render: (card) =>
                <Popconfirm
                    title="האם אתה בטוח שאתה רוצה למחוק?"
                    onConfirm={() => confirm(card._id)}
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
            title: 'שם מתנה',
            dataIndex: 'gift',
            render: (text) => (text.name),
            align: 'right',
        }, {
            title: 'מחיר',
            dataIndex: 'sum',
            align: 'right',
            className: 'rtlColumn'
        }, {
            title: 'טקסט',
            dataIndex: 'text',
            align: 'right',
            className: 'rtlColumn'
        },


    ];
    return (
        <div className='DeleteCards'>
            <h6>כאן מוצגים רק הכרטיסים שעוד לא השתמשו בהם</h6>
            <Form
                wrapperCol={{
                    span: 20,
                }}
                form={form}>
                {/* campaign */}
                <Form.Item
                    name="campaign"
                    rules={[
                        {
                            required: true,
                            message: `אנא בחר קמפיין!`,
                        },
                    ]}
                >
                    <Select
                        allowClear
                        showSearch
                        onChange={choose}
                        style={{ textAlign: 'right' }}
                        dropdownStyle={{ textAlign: 'right' }}
                        notFoundContent={<>לא נמצאו נתונים</>}
                        placeholder={`בחר קמפיין...`} >
                        {admin ? (allCampaigns && allCampaigns.map(item => (
                            <Select.Option key={item._id}>{item.campaignName}</Select.Option>
                        ))) : (user.campaigns && user.campaigns.map(item => (
                            <Select.Option key={item._id}>{item.campaignName}</Select.Option>
                        )))}
                    </Select>
                </Form.Item>
            </Form>
            <Spin size='large' spinning={!cards}>
                <Table dataSource={cards} columns={columns}
                    rowKey={campaign => campaign._id}
                    pagination={{ position: ['bottomLeft', 'none'] }}
                    style={{ direction: 'ltr' }} />
            </Spin>
        </div>
    )
}