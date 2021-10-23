import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Button,
    Select,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';

export default function UpdateCard() {

    const dispatch = useDispatch();
    const allCampaigns = useSelector(state => state.campaignReducer.allCampaigns);
    const allGifts = useSelector(state => state.giftReducer.allGifts);
    const user = useSelector(state => state.userReducer.user);
    const admin = useSelector(state => state.userReducer.admin);
    const [form] = Form.useForm();

    const [cards, setCards] = useState(null);

    useEffect(() => {
        if (!allCampaigns)
            dispatch(actions.getAllCampaigns());
        if (!allGifts)
            dispatch(actions.getAllGifts());
    }, []);



    const onFinish = (values) => {
        console.log("🚀 ~ file: UpdateCard.js ~ line 30 ~ onFinish ~ values", values);
        
    };
    const chooseCampaign = (campaignId) => {
        const cardsObj = allCampaigns.find(c => c._id === campaignId).cards;
        console.log("🚀 ~ file: UpdateCard.js ~ line 36 ~ choose ~ cardsObj", cardsObj)
        setCards(cardsObj)
    }

    const chooseCard = (cardId) => {
        const cardObj = cards.find(c => c._id === cardId);
        form.setFieldsValue({ ...cardObj, gift: cardObj.text });
    }
  

    return (
        <div className='p-auto UpdateCard'>
            <h1>עריכת כרטיס</h1>
            <Form
                wrapperCol={{
                    span: 20,
                }}
                form={form}
                name="updateCard"
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
                {/* card */}
                <Form.Item
                    name="card"
                    rules={[
                        {
                            required: true,
                            message: `אנא בחר כרטיס!`,
                        },
                    ]}
                >
                    <Select
                        allowClear
                        showSearch
                        // options={cards && cards.map(card => {
                        //     return { value: card.text, label: card.text }
                        // })}
                        onChange={chooseCard}
                        style={{ textAlign: 'right' }}
                        dropdownStyle={{ textAlign: 'right' }}
                        notFoundContent={<>לא נמצאו נתונים</>}
                        placeholder={`בחר כרטיס...`} >
                        {cards && cards.length && cards.map(item => (
                            <Select.Option key={item._id}>{item.text}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                {/* gift */}
                <Form.Item
                    name="gift"
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
                <Form.Item name="text">
                    <Input placeholder={`הכנס כאן את שם הכרטיס...`} />
                </Form.Item>
                {/* submit */}
                <Form.Item className='submitFormItem'>
                    <Button type="primary" htmlType="submit">
                        עריכת כרטיס
                    </Button>
                </Form.Item>
            </Form>
        </div >
    );
};