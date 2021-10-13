import React, { useEffect } from 'react';
import {
    Form,
    Input,
    Button,
    Select,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';

export default function CreateCard() {

    const dispatch = useDispatch();
    const allCampaigns = useSelector(state => state.campaignReducer.allCampaigns);
    const allGifts = useSelector(state => state.giftReducer.allGifts);
    const general = useSelector(state => state.generalReducer);

    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(actions.getAllCampaigns());
        dispatch(actions.getAllGifts());
    }, []);


    useEffect(() => {
        if (general.currentNotification === 'הכרטיס התווסף בהצלחה!') {
            form.resetFields();
        }
    }, [general.currentNotification])

    const onFinish = (values) => {
        console.log("🚀 ~ file: CreateCard.js ~ line 20 ~ onFinish ~ values", values);
        const campaignId = allCampaigns.find(c => c.campaignName === values.campaign)._id;
        const giftId = allGifts.find(g => g.name === values.gift)._id;
        dispatch(actions.createCard({ card: { ...values, gift: giftId }, campaignId }));
    };

    return (
        <div className='p-auto CreateCard'>
            <h1>יצירת כרטיס</h1>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 20,
                }}
                form={form}
                name="CreateCard"
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
                        options={allCampaigns && allCampaigns.map(campaign => {
                            return { value: campaign.campaignName, label: campaign.campaignName }
                        })}
                        style={{ textAlign: 'right' }}
                        dropdownStyle={{ textAlign: 'right' }}
                        notFoundContent={<>לא נמצאו נתונים</>}
                        placeholder={`בחר קמפיין...`} >
                    </Select>
                </Form.Item>
                {/* gift */}
                <Form.Item
                    name="gift"
                    label={`מתנה`}
                    rules={[
                        {
                            required: true,
                            message: `אנא בחר מתנה!`,
                        },
                    ]}
                >
                    <Select
                        allowClear
                        showSearch
                        options={allGifts && allGifts.map(gift => {
                            return { value: gift.name, label: gift.name }
                        })}
                        style={{ textAlign: 'right' }}
                        dropdownStyle={{ textAlign: 'right' }}
                        notFoundContent={<>לא נמצאו נתונים</>}
                        placeholder={`בחר מתנה...`} >
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
                {/* text */}
                <Form.Item
                    name="text"
                    label={`שם הכרטיס`}
                >
                    <Input placeholder={`הכנס כאן את שם הכרטיס...`} />
                </Form.Item>
                {/* submit */}
                <Form.Item className='submitFormItem'>
                    <Button type="primary" htmlType="submit">
                        יצירת כרטיס
                    </Button>
                </Form.Item>
            </Form>
        </div >
    );
};