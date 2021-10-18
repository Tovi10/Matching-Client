import React, { useEffect } from 'react';
import {
    Form,
    Input,
    Button,
    Select,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';

export default function CreateRecruiter() {

    const dispatch = useDispatch();
    const allCampaigns = useSelector(state => state.campaignReducer.allCampaigns);
    const userCampaigns = useSelector(state => state.userReducer.user.campaigns);
    const admin = useSelector(state => state.userReducer.admin);

    const [form] = Form.useForm();

    useEffect(() => {
        if (!allCampaigns)
            dispatch(actions.getAllCampaigns());
    }, []);



    const onFinish = (values) => {
        console.log("🚀 ~ file: CreateRecruiter.js ~ line 20 ~ onFinish ~ values", values);
        const campaignId = allCampaigns.find(c => c.campaignName === values.campaign)._id;
        dispatch(actions.createRecruiter({ ...values, campaign: campaignId }))
    };

    return (
        <div className='p-auto CreateRecruiter'>
            <h1>יצירת מגייס</h1>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 20,
                }}
                form={form}
                // name="CreateRecruiter"
                onFinish={onFinish}
            >
                {/* campaign */}
                <Form.Item
                    name="campaign"
                    label={`קמפיין`}
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
                        options={admin ? (
                            allCampaigns && allCampaigns.map(campaign => {
                                return { value: campaign.campaignName, label: campaign.campaignName }
                            })) :
                            userCampaigns && userCampaigns.map(campaign => {
                                return { value: campaign.campaignName, label: campaign.campaignName }
                            })}
                        style={{ textAlign: 'right' }}
                        dropdownStyle={{ textAlign: 'right' }}
                        notFoundContent={<>לא נמצאו נתונים</>}
                        placeholder={`בחר קמפיין...`} >
                    </Select>
                </Form.Item>
                {/* sum */}
                <Form.Item
                    name="sum"
                    label={`סכום התרומה`}
                    rules={[
                        {
                            required: true,
                            message: `הכנס סכום תרומה!`,
                        },
                    ]}
                >
                    <Input type='number' placeholder={`הכנס כאן את סכום התרומה...`} />
                </Form.Item>
                {/* name */}
                <Form.Item
                    name="name"
                    label={`שם המגייס`}
                    rules={[{ required: true, message: 'הכנס שם!' }]}

                >
                    <Input placeholder={`הכנס כאן את שם המגייס...`} />
                </Form.Item>
                {/* emil */}
                <Form.Item
                    name="email"
                    label={`כתובת אימייל`}
                    rules={[{ required: true, message: 'הכנס מייל!' }]}
                >
                    <Input type='email' placeholder="מייל" />
                </Form.Item>
                {/* submit */}
                <Form.Item className='submitFormItem'>
                    <Button type="primary" htmlType="submit">
                        יצירת מגייס
                    </Button>
                </Form.Item>
            </Form>
        </div >
    );
};