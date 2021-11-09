import React, { useEffect, useRef, useState } from 'react';
import {
    Form,
    Input,
    Button,
    Select,
    Spin,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';

export default function UpdateRecruiter() {

    const dispatch = useDispatch();
    const allCampaigns = useSelector(state => state.campaignReducer.allCampaigns);
    const admin = useSelector(state => state.userReducer.admin);
    const user = useSelector(state => state.userReducer.user);
    const currentNotification = useSelector(state => state.generalReducer.currentNotification);


    const [form] = Form.useForm();
    const [campaign, setCampaign] = useState(null);
    const [spining, setSpining] = useState(false);

    useEffect(() => {
        if (!allCampaigns)
            dispatch(actions.getAllCampaigns());
    }, []);

    useEffect(() => {
        setSpining(false)
        if (currentNotification === 'המגייס התעדכן בהצלחה!' && campaign) {
            form.resetFields();
            setCampaign(null);
        }
    }, [currentNotification])

    const onFinish = (values) => {
        console.log("🚀 ~ file: UpdateRecruiter.js ~ line 20 ~ onFinish ~ values", values);
        setSpining(true);
        dispatch(actions.updateRecruiter(values));
    };

    const chooseCampaign = (campaignId) => {
        const campaignObj = allCampaigns.find(c => c._id === campaignId);
        console.log("🚀 ~ file: UpdateRecruiter.js ~ line 35 ~ chooseCampaign ~ campaignObj", campaignObj)
        setCampaign(campaignObj);
    }
    const chooseRecruiter = (recruiterId) => {
        const recruiterObj = campaign.recruiters.find(recruiter => recruiter._id === recruiterId);
        console.log("🚀 ~ file: UpdateRecruiter.js ~ line 40 ~ chooseRecruiter ~ recruiterObj", recruiterObj)
        form.setFieldsValue(recruiterObj);
    }

    return (
        <div className='p-auto UpdateRecruiter'>
            <h1>עריכת מגייס</h1>
            <Spin size='large' spinning={spining}>
                <Form
                    wrapperCol={{
                        span: 24,
                    }}
                    form={form}
                    onFinish={onFinish}
                >
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
                            onChange={chooseCampaign}
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
                    {/* recruiter */}
                    <Form.Item
                        name="recruiter"
                        rules={[
                            {
                                required: true,
                                message: `אנא בחר מגייס!`,
                            },
                        ]}
                    >
                        <Select
                            allowClear
                            showSearch
                            style={{ textAlign: 'right' }}
                            dropdownStyle={{ textAlign: 'right' }}
                            onChange={chooseRecruiter}
                            notFoundContent={<>לא נמצאו מגייסים</>}
                            placeholder={`בחר מגיס...`} >
                            {campaign && campaign.recruiters.length && campaign.recruiters.map(recruiter => {
                                return (
                                    !recruiter.sumRaised && <Select.Option key={recruiter._id}>{recruiter.designName}</Select.Option>)
                            })}
                        </Select>
                    </Form.Item>
                    {/* sum */}
                    <Form.Item
                        name="sum"
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
                        name="designName"
                        rules={[{ required: true, message: 'הכנס שם!' }]}

                    >
                        <Input placeholder={`הכנס כאן את שם המגייס לתצוגה...`} />
                    </Form.Item>
                    {/* emil */}
                    {/* <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'הכנס מייל!' }]}
                >
                    <Input type='email' placeholder="מייל" />
                </Form.Item> */}
                    {/* submit */}
                    <Form.Item className='submitFormItem'>
                        <Button type="primary" htmlType="submit">
                            עריכת מגייס
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </div >
    );
};