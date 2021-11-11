import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Button,
    Select,
    Spin,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';

export default function UpdateCard() {

    const dispatch = useDispatch();
    const allCampaigns = useSelector(state => state.campaignReducer.allCampaigns);
    const allGifts = useSelector(state => state.giftReducer.allGifts);
    const user = useSelector(state => state.userReducer.user);
    const admin = useSelector(state => state.userReducer.admin);
    const currentNotification = useSelector(state => state.generalReducer.currentNotification);

    const [form] = Form.useForm();

    const [cards, setCards] = useState(null);
    const [spining, setSpining] = useState(false);

    useEffect(() => {
        if (!allCampaigns)
            dispatch(actions.getAllCampaigns());
        if (!allGifts)
            dispatch(actions.getAllGifts());
    }, []);

    useEffect(() => {
        setSpining(false)
        if (currentNotification === 'הכרטיס התעדכן בהצלחה!' && cards) {
            form.resetFields();
            setCards(null);
        }
    }, [currentNotification])

    const onFinish = (values) => {
        console.log("🚀 ~ file: UpdateCard.js ~ line 30 ~ onFinish ~ values", values);
        const giftId = allGifts.find(gift => gift.name === values.gift)._id;
        dispatch(actions.updateCard({ ...values, _id: values.card,gift:giftId,uid:user.uid }))
        setSpining(true)
    };
    const chooseCampaign = (campaignId) => {
        const cardsObj = allCampaigns.find(c => c._id === campaignId).cards;
        console.log("🚀 ~ file: UpdateCard.js ~ line 36 ~ choose ~ cardsObj", cardsObj)
        setCards(cardsObj)
    }

    const chooseCard = (cardId) => {
        const cardObj = cards.find(c => c._id === cardId);
        form.setFieldsValue({ ...cardObj, gift: cardObj.gift.name });
    }


    return (
        <div className='p-auto UpdateCard'>
            <h1>עריכת כרטיס</h1>
            <Spin size='large' spinning={spining}>
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
                        notFoundContent={<>לא נמצאו כרטיסים או שכולם בשימוש</>}
                        placeholder={`בחר כרטיס...`} >
                        {cards && cards.length && cards.map(item => (
                           !item.used&& <Select.Option key={item._id}>{item.text}</Select.Option>
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
                        style={{ textAlign: 'right' }}
                        dropdownStyle={{ textAlign: 'right' }}
                        notFoundContent={<>לא נמצאו נתונים</>}
                        placeholder={`בחר מתנה...`} >
                        {allGifts && allGifts.length && allGifts.map(gift => (
                            <Select.Option key={gift.name}>{gift.name}</Select.Option>
                        ))}
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
            </Spin>
        </div >
    );
};