import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Form,
    Input,
    Button,
    Checkbox,
    Spin,
} from 'antd';
import { firebase } from '../../services/firebase.service';
import { DeleteTwoTone, UploadOutlined, } from '@ant-design/icons';

import { actions } from '../../redux/actions';

export default function CreateGift() {

    const dispatch = useDispatch();
    const general = useSelector(state => state.generalReducer);
    const gift = useSelector(state => state.giftReducer.gift);

    const [form] = Form.useForm();
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [coupon, setCoupon] = useState(false);
    const [spining, setSpining] = useState(false);

    const inputImageRef = useRef(null);

    useEffect(() => {
        if (general.giftId) {
            uploadImageToStorage(general.giftId)
        }
    }, [general.giftId]);

    useEffect(() => {
        setSpining(false)
        if (general.currentNotification === 'המתנה התווספה בהצלחה!') {
            setImage(null);
            setCoupon(false);
            form.resetFields();
        }
    }, [general.currentNotification]);

    const onFinish = (values) => {
        console.log("🚀 ~ file: CreateGift.js ~ line 20 ~ onFinish ~ values", values);
        setSpining(true);
        dispatch(actions.createGift(values));
    };
    const uploadImageToStorage = async (giftId) => {
        if (!image) {
            dispatch(actions.setCurrentNotification('המתנה התווספה בהצלחה'))
        }
        else {
            const storageRef = firebase.storage().ref();
            let fileRef = storageRef.child(`Gifts/${Object.entries(image)[0][1].name}`);
            await fileRef.put(Object.entries(image)[0][1]);
            const imageImgPath = await fileRef.getDownloadURL();
            // edit gift in server with the image
            const updateGift = { ...gift, image: imageImgPath, create: true }
            dispatch(actions.updateGift(updateGift));
            dispatch(actions.setGiftId(null));
        }
    }


    return (
        <div className='CreateGift mt-3'>
            <Spin size='large' spinning={spining}>
                <Form
                    wrapperCol={{
                        span: 24,
                    }}
                    form={form}
                    name="CreateGift"
                    onFinish={onFinish}
                >
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
                        <Input size='large' placeholder={`הכנס כאן את שם המתנה...`} />
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
                        <Input size='large' placeholder={`הכנס כאן את תאור המתנה...`} />
                    </Form.Item>
                    {/* image */}
                    <Form.Item
                        name='image'
                        style={{ display: 'inline-block', width: 'calc(100% - 8px)', marginLeft: '8px' }}
                    >
                        {image ?
                            <div className='wrapperImgs'>
                                <DeleteTwoTone twoToneColor="#FAE01A" className='deleteImgIcon' title={`מחק לוגו`} onClick={() => setImage(null)} />
                                <img alt='img' src={imageURL} style={{ width: '100%', height: '15vh', objectFit: 'contain' }} />
                            </div> :
                            <div className='btn d-flex justify-content-center uploadLogoDiv'>
                                <input type='file' accept='image/*' ref={inputImageRef} className='uploadHiddenInput'
                                    onChange={event => {
                                        setImage(inputImageRef.current.files);
                                        setImageURL(URL.createObjectURL(event.target.files[0]))
                                    }} />
                                <UploadOutlined className='plusIcon' />
                                <div>בחר תמונה</div>
                            </div>}
                    </Form.Item>
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
                        <Input size='large' type='number' placeholder={`הכנס כאן את מחיר המתנה...`} />
                    </Form.Item>
                    {/* amount */}
                    <Form.Item name="amount">
                        <Input size='large' type='number' placeholder={`הכנס כאן את כמות המתנה...`} />
                    </Form.Item>
                    <Form.Item>
                        <Checkbox className='clrWhite' checked={coupon} onChange={() => setCoupon(!coupon)}>שובר</Checkbox>
                    </Form.Item>
                    {coupon &&
                        <Form.Item
                            name='from'
                            rules={[
                                {
                                    required: true,
                                    message: `הכנס מייל!`,
                                },
                                {
                                    type: 'email',
                                    message: `הכנס מייל!`,
                                },
                            ]}>
                            <Input size='large' placeholder='הכנס מייל אליו ישלחו פרטי מקבלי השוברים' />
                        </Form.Item>}
                    {/* submit */}
                    <Form.Item className='submitFormItem'>
                        <Button size='large' type="primary" htmlType="submit" className='btnSubmit'>
                            יצירת מתנה
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </div >
    );
};