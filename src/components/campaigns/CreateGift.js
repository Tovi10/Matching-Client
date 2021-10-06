import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Form,
    Input,
    Button,
} from 'antd';
import { PlusOutlined, DeleteTwoTone } from '@ant-design/icons';
import { firebase } from '../../services/firebase.service';

import { actions } from '../../redux/actions';

export default function CreateGift() {

    const dispatch = useDispatch();
    const general = useSelector(state => state.generalReducer);
    const gift = useSelector(state => state.giftReducer.gift);

    const [form] = Form.useForm();
    const [image, setImage] = useState(null);

    const inputImageRef = useRef(null);

    useEffect(() => {
        if (general.giftId) { 
            uploadImageToStorage(general.giftId)
        }
    }, [general.giftId]);

    useEffect(() => {
        if (general.currentNotification === 'המתנה התווספה בהצלחה!') {
            setImage(null);
            form.resetFields();
        }
    }, [general.currentNotification]);
    
    const onFinish = (values) => {
        console.log("🚀 ~ file: CreateGift.js ~ line 20 ~ onFinish ~ values", values);
        dispatch(actions.createGift(values));
    };
    const uploadImageToStorage = async (giftId) => {
        if (!image) return;
        const storageRef = firebase.storage().ref();
        let fileRef = storageRef.child(`Gifts/${giftId}/${Object.entries(image)[0][1].name}`);
        await fileRef.put(Object.entries(image)[0][1]);
        const imageImgPath = await fileRef.getDownloadURL();
        // edit gift in server with the image
        const updateGift = { ...gift, image: imageImgPath }
        dispatch(actions.updateGift(updateGift));
        dispatch(actions.setGiftId(null));
    }

    return (
        <div className='p-auto CreateGift'>
            <h1>יצירת מתנה</h1>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 20,
                }}
                form={form}
                name="CreateGift"
                onFinish={onFinish}
            >
                {/* name */}
                <Form.Item
                    name="name"
                    label={`שם המתנה`}
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
                    label={`תאור המתנה`}
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
                <Form.Item
                    name='image'
                    label={`תמונה`}
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
                </Form.Item>
                {/* price */}
                <Form.Item
                    name="price"
                    label={`מחיר המתנה`}
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
                    label={`כמות המתנה`}
                >
                    <Input type='number' placeholder={`הכנס כאן את כמות המתנה...`} />
                </Form.Item>
                {/* submit */}
                <Form.Item className='submitFormItem'>
                    <Button type="primary" htmlType="submit">
                        יצירת מתנה
                    </Button>
                </Form.Item>
            </Form>
        </div >
    );
};