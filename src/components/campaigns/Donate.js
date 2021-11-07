import React from 'react';
import { Form, Select, Button, notification, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';
import moment from 'moment';
import axios from 'axios';

import { SERVER_URL } from "../../constants"

export default function Donate(props) {
    const { card } = props;
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer.user);
    const campaign = useSelector(state => state.campaignReducer.campaign);

    const onFinish = (values) => {
        // notification.open({
        //     message: 'תרומה חדשה!',
        //     description: 'תרומה חדשה',
        // });
        console.log('Received values of form: ', values);
        axios.post(`${SERVER_URL}/api/donation/clearingCredit`)
            .then(result => {
                window.open(result.data.url, "_blank")
                console.log("🚀 ~ file: Donate.js ~ line 22 ~ onFinish ~ result", result)
            })
            .catch(error => {
                console.log("🚀 ~ file: Donate.js ~ line 23 ~ onFinish ~ error", error)

            })
        dispatch(actions.createDonation({ ...values, campaignId: campaign._id, user: user._id, card: card._id, date: moment(new Date()).format('DD/MM/YYYY a h:mm:ss ') + "" }));
        props.close();
    }

    return (
        <div className='Donate'>
            <Form onFinish={onFinish}>
                <p>{`תרום ${card.sum} וקבל ${card.gift ? card.gift.name : 'אין שם למתנה'}`}</p>
                <Form.Item
                    name="recruiter"
                    // rules={createCompany ? [] : [
                    //     {
                    //         required: true,
                    //         message: `אנא בחר חברה!`,
                    //     },
                    // ]}
                    style={{ display: 'inline-block', width: 'calc(90% - 8px)' }}
                >
                    <Select
                        size='large'
                        allowClear
                        showSearch
                        style={{ textAlign: 'right' }}
                        dropdownStyle={{ textAlign: 'right' }}
                        // onChange={() => { setCreateCompany(false) }}
                        notFoundContent={<>לא נמצאו נתונים</>}
                        placeholder={`בחר מגייס...`}
                        virtual={false}
                        dropdownClassName='companiesSelectDropdown'>
                        {campaign && campaign.recruiters && campaign.recruiters.map(item => (
                            <Select.Option key={item._id}>{item.designName}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

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