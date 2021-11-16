import React, { useEffect, useRef, useState } from 'react';
import { Form, Select, Button, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';
import moment from 'moment';
import axios from 'axios';
import { Steps } from 'antd';
import { UserOutlined, SolutionOutlined, FileTextOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import Login from '../login/Login'


import { SERVER_URL } from "../../constants"
const { Step } = Steps;



export default function Donate(props) {

    const { card } = props;

    const dispatch = useDispatch();

    const user = useSelector(state => state.userReducer.user);
    const campaign = useSelector(state => state.campaignReducer.campaign);
    const resetDonate = useSelector(state => state.generalReducer.resetDonate);

    const [iframeUrl, setIframeUrl] = useState(null);

    const [form] = Form.useForm();


    useEffect(() => {
        if (resetDonate) {
            form.resetFields();
            setIframeUrl(null)
            dispatch(actions.setResetDonate(false))
        }
    }, [resetDonate])

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        axios.post(`${SERVER_URL}/api/donation/clearingCredit`, {
            description: card.text,
            email: user.email,
            fullName: user.name,
            paymentsNum: values.paymentsNum,
            phone: user.phone,
            // sum: card.sum,
            sum:1,
        }).then(result => {
            setIframeUrl(result.data.url);
            // window.open(result.data.url, "_blank")
            console.log("🚀 ~ file: Donate.js ~ line 22 ~ onFinish ~ result", result);
            dispatch(actions.setDonationData({ ...values, campaignId: campaign._id, user: user._id, card: card._id, date: moment(new Date()).format('DD/MM/YYYY a h:mm:ss ') + "" }));
        }).catch(error => {
            console.log("🚀 ~ file: Donate.js ~ line 23 ~ onFinish ~ error", error)
        })
    }

    return (
        <div className='Donate' style={{ height: 'inherit' }}>
            <Steps size='small' style={{ direction: 'ltr' }} className='mb-3'>
                <Step status="wait" title="!תודה" icon={<SmileOutlined />} />
                <Step status={iframeUrl ? 'process' : 'wait'} title="תשלום" icon={<UserOutlined />} />
                <Step status={(user && !iframeUrl) ? 'process' : (!user ? 'wait' : 'finish')} title="הכנס פרטים" icon={(user && !iframeUrl) ? <LoadingOutlined /> : <FileTextOutlined />} />
                <Step status={user ? 'finish' : 'process'} title="הרשמה" icon={<UserOutlined />} />
            </Steps>
            {user ?
                !iframeUrl ?
                <div className='mt-2' style={{height:'100%',paddingTop:'10%'}}>
                    <Form onFinish={onFinish}
                    form={form}
                        labelCol={{
                            span: 10,
                        }}
                        wrapperCol={{
                            span: 14,
                        }}
                        layout="horizontal"
                        initialValues={{ paymentsNum: 1 }}>
                        <Form.Item
                            name="paymentsNum"
                            label='בחר מס תשלומים בין 1 ל6'>
                            <InputNumber min={1} max={6} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item name="recruiter" label={`בחר מגייס`}>
                            <Select
                                allowClear
                                showSearch
                                style={{ textAlign: 'right' }}
                                dropdownStyle={{ textAlign: 'right' }}
                                notFoundContent={<>לא נמצאו מגייסים</>}
                                // placeholder={`בחר מגייס...`}
                                virtual={false}
                                dropdownClassName='companiesSelectDropdown'>
                                {campaign && campaign.recruiters && campaign.recruiters.map(item => (
                                    <Select.Option key={item._id}>{item.designName}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">המשך</Button>
                        </Form.Item>
                    </Form>
                    </div>
                    :
                    <iframe src={iframeUrl} style={{ width: '100%', height: '80%' }} />
                : <Login />}
        </div >
    )
}