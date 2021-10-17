import React from 'react';
import { Form, Input, Button, notification, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';

export default function Donate(props) {
    const { card } = props;
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer.user);
    const campaign = useSelector(state => state.campaignReducer.campaign);


    const onFinish = (values) => {
        notification.open({
            message: 'תרומה חדשה!',
            description: 'תרומה חדשה',
        });
        console.log('Received values of form: ', values);
        dispatch(actions.createDonation({ ...values, campaignId: campaign._id, user: user._id, card: card._id, date: Date.now() }));
        props.close();
    }
    return (
        <div className='Donate'>
            <Form onFinish={onFinish}>
                <div>{`תרום ${card.sum} וקבל ${card.gift ? card.gift.name : 'אין שם למתנה'}`}</div>
                {/* <Form.Item
                    name="credutCard"
                    rules={[{ required: true, message: 'הכנס מספר אשראי!' }]}
                >
                    <Input type='text' placeholder='מספר אשראי' />
                </Form.Item> */}
                <Form.Item>
                    <Button type="primary" htmlType="submit">תרום</Button>
                </Form.Item>
            </Form>

        </div>
    )
}