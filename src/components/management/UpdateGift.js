import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Form,
    Input,
    Button,
    Select,
} from 'antd';
import { PlusOutlined, DeleteTwoTone } from '@ant-design/icons';
import { actions } from '../../redux/actions';

export default function UpdateGift() {

    const dispatch = useDispatch();
    const allGifts = useSelector(state => state.giftReducer.allGifts);

    const [form] = Form.useForm();

    useEffect(() => {
        if (!allGifts)
            dispatch(actions.getAllGifts());
    }, []);
    const onFinish = (values) => {
        console.log("🚀 ~ file: UpdateGift.js ~ line 20 ~ onFinish ~ values", values);
        dispatch(actions.updateGift(values));
    };
    const choose=(giftId)=>{
        const gift=allGifts.find(gift=>gift._id===giftId);
        console.log("🚀 ~ file: UpdateGift.js ~ line 29 ~ choose ~ gift", gift)
        form.setFieldsValue(gift);
    }


    return (
        <div className='p-auto UpdateGift'>
            <h1>עריכת מתנה</h1>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 20,
                }}
                form={form}
                name="UpdateGift"
                onFinish={onFinish}
            >
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
                        // options={allGifts && allGifts.map(gift => {
                        //     return { value: gift.name, label: gift.name }
                        // })}
                        onChange={choose}
                        style={{ textAlign: 'right' }}
                        dropdownStyle={{ textAlign: 'right' }}
                        notFoundContent={<>לא נמצאו מתנות</>}
                        placeholder={`בחר מתנה...`} >
                        {allGifts && allGifts.map(gift => {
                            return (<Select.Option key={gift._id}>{gift.name}</Select.Option>)
                        })}
                    </Select>
                </Form.Item>
                {/* name */}
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: `הכנס שם למתנה!`,
                        },
                    ]}
                >
                    <Input placeholder={`הכנס כאן את שם המתנה...`} />
                </Form.Item>
                {/* advertising */}
                <Form.Item
                    name="advertising"
                    rules={[
                        {
                            max: 50,
                            message: `הכנס תאור למתנה עד 50 תווים!`,
                        },
                    ]}
                >
                    <Input placeholder={`הכנס כאן את תאור המתנה...`} />
                </Form.Item>
                {/* image */}
                {/* <Form.Item
                    name='image'
                >
                    {image ?
                        <div>
                            <DeleteTwoTone title={`מחק תמונה`} onClick={() => setImage(null)} />
                            <span>{Object.entries(image)[0][1].name}</span>
                        </div> :
                        <div className='btn btn-primary d-flex justify-content-center uploadimageDiv'>
                            <input type='file' ref={inputImageRef} className='uploadHiddenInput'
                                onChange={() => setImage(inputImageRef.current.files)} />
                            <PlusOutlined className='plusIcon' />
                            <div>בחר קובץ</div>
                        </div>}
                </Form.Item> */}
                {/* price */}
                <Form.Item
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: `הכנס מחיר למתנה!`,
                        },
                    ]}
                >
                    <Input type='number' placeholder={`הכנס כאן את מחיר המתנה...`} />
                </Form.Item>
                {/* amount */}
                <Form.Item
                    name="amount"
                >
                    <Input type='number' placeholder={`הכנס כאן את כמות המתנה...`} />
                </Form.Item>
                {/* submit */}
                <Form.Item className='submitFormItem'>
                    <Button type="primary" htmlType="submit">
                        עריכת מתנה
                    </Button>
                </Form.Item>
            </Form>
        </div >
    );
};