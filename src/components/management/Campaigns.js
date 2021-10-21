import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';
import {
    Form,
    Input,
    Button,
    DatePicker,
    Select,
} from 'antd';
import moment from 'moment';
export default function Campaigns() {

    const dispatch = useDispatch();
    const allCampaigns = useSelector(state => state.campaignReducer.allCampaigns);
    const user = useSelector(state => state.userReducer.user);
    const admin = useSelector(state => state.userReducer.admin);

    const [form] = Form.useForm();
    const [campaign, setCampaign] = useState(null);

    useEffect(() => {
        if (!allCampaigns && admin)
            dispatch(actions.getAllCampaigns())
    }, [])

    const onFinish = (values) => {
        console.log("🚀 ~ file: Campaigns.js ~ line 31 ~ onFinish ~ values", values);
        dispatch(actions.updateCampaign({ ...campaign, ...values }));
    };

    const choose = (campaignId) => {
        const campaignObj = allCampaigns.find(c => c._id === campaignId);
        console.log("🚀 ~ file: Campaigns.js ~ line 34 ~ choose ~ campaignObj", campaignObj)
        setCampaign(campaignObj)
        form.setFieldsValue({
            ...campaignObj,
            // duration: [moment('01/01/1999', 'DD/MM/YYYY'), moment('01/03/1999', 'DD/MM/YYYY')]
            duration: [moment(campaignObj.duration[0], 'DD/MM/YYYY'), moment(campaignObj.duration[1], 'DD/MM/YYYY')]
        });
    }

    return (
        <div className='Campaigns'>
            <Select
                size='large'
                allowClear
                showSearch
                style={{ textAlign: 'right' }}
                dropdownStyle={{ textAlign: 'right' }}
                onChange={choose}
                notFoundContent={<>לא נמצאו נתונים</>}
                placeholder={`בחר חברה...`}
                virtual={false}
                dropdownClassName='companiesSelectDropdown'>
                {admin ? (allCampaigns && allCampaigns.map(item => (
                    <Select.Option key={item._id}>{item.campaignName}</Select.Option>
                ))) : (user.campaigns && user.campaigns.mpa(item => (
                    <Select.Option key={item._id}>{item.campaignName}</Select.Option>
                )))}
            </Select>
            <Form
                className='p-3 customForm'
                wrapperCol={{
                    span: 24,
                }}
                form={form}
                name="campaign"
                onFinish={onFinish}
            >
                {/* campaignName */}
                <Form.Item
                    name="campaignName"
                    rules={[
                        {
                            required: true,
                            message: `אנא הכנס שם קמפיין!`,
                        },
                    ]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                >
                    <Input size='large'
                        placeholder={`הכנס כאן את השם לקמפיין שלך...`} />
                </Form.Item>
                {/* goal */}
                <Form.Item
                    name="goal"
                    rules={[
                        {
                            required: true,
                            message: `אנא הכנס יעד לקמפיין!`,
                        },
                    ]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                >
                    <Input size='large'
                        type='number' className='formItemInput' placeholder={`הכנס כאן את היעד לקמפיין שלך...`} />
                </Form.Item>
                {/* purposeOfCollecting */}
                <Form.Item
                    name="purposeOfCollecting"
                    rules={[
                        {
                            required: true,
                            message: `הכנס מטרה לקמפיין!`,
                        },
                        {
                            max: 300,
                            message: `הכנס מטרה לקמפיין עד 300 תווים!`,
                        },
                        {
                            min: 50,
                            message: `הכנס מטרה לקמפיין מינימום 50 תווים!`,
                        },
                    ]}
                    style={{ display: 'inline-block', width: 'calc(100% - 8px)', marginLeft: '8px' }}                                >
                    <Input.TextArea size='large' rows={4} placeholder={`פרט כאן על המטרה של הקמפיין שלך...`} />
                </Form.Item>
                {/* duration */}
                <Form.Item
                    name="duration"
                    rules={[
                        {
                            required: true,
                            message: `בחר תאריך התחלה וסיום לקמפיין!`,
                        },
                    ]}
                    style={{ display: 'inline-block', width: 'calc(100% - 8px)', marginLeft: '8px' }}
                >
                    <DatePicker.RangePicker
                        format='DD/MM/YYYY'
                        placeholder={['תאריך התחלה', 'תאריך סיום']}
                        direction='rtl'
                        showNow={true}
                        size='large'
                        className='formItemInput' />
                </Form.Item>
                {/* images */}
                {/* submit */}
                <Form.Item
                    style={{ display: 'inline-block', width: 'calc(100% - 8px)', marginLeft: '8px' }}
                    className='submitFormItem'>
                    <Button size='large' type="primary" htmlType="submit" className='btnSubmit'>
                        SAVE                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}