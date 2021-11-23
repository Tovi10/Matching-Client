import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Form,
    Input,
    Button,
    Select,
    Spin,
} from 'antd';
import { DeleteTwoTone, UploadOutlined, } from '@ant-design/icons';
import { actions } from '../../redux/actions';
import { firebase } from '../../services/firebase.service';

export default function UpdateGift() {

    const dispatch = useDispatch();
    const allGifts = useSelector(state => state.giftReducer.allGifts);
    const currentNotification = useSelector(state => state.generalReducer.currentNotification);

    const [form] = Form.useForm();
    const [imageFile, setImageFile] = useState();
    const [imageURL, setImageURL] = useState();
    const [gifts, setGifts] = useState();
    const [spining, setSpining] = useState(false);

    useEffect(() => {
        setSpining(false)
        if (currentNotification === 'המתנה התעדכנה בהצלחה!') {
            form.resetFields();
            removeImage();
        }
    }, [currentNotification]);


    useEffect(() => {
        if (!allGifts)
            dispatch(actions.getAllGifts());
    }, []);

    useEffect(() => {
        if (allGifts)
            setGifts(allGifts.filter(g => !g.used));
    }, [allGifts]);


    const onFinish = async (values) => {
        setSpining(true);
        if (imageFile && imageFile[0].name) {
            // upload
            const storageRef = firebase.storage().ref();
            let fileRef = storageRef.child(`Gifts/${imageFile[0].name}`);
            await fileRef.put(imageFile[0]);
            const imageImgPath = await fileRef.getDownloadURL();
            dispatch(actions.updateGift({ ...values, image: imageImgPath }))
            return
        }
        if (!imageFile && values.image) {
            const fileRef = await firebase.storage().refFromURL(values.image);
            await fileRef.delete().then(function () {
                console.log("File Deleted")
            }).catch(function (error) {
                console.log("🚀 ~ file: UpdateGift.js ~ line 42 ~ error", error)
                dispatch(actions.setCurrentNotification('ארעה שגיאה בעדכון המתנה!'))
            });
            dispatch(actions.updateGift({ ...values, image: null }));
            return;
        }
        dispatch(actions.updateGift(values));
    };
    const choose = (giftId) => {
        const gift = allGifts.find(gift => gift._id === giftId);
        form.setFieldsValue(gift);
        setImageURL(gift.image);
        setImageFile(gift.image);
    }
    const uploadImage = (event) => {
        setImageFile(event.target.files);
        setImageURL(URL.createObjectURL(event.target.files[0]))
    }
    const removeImage = (key) => {
        if (imageFile) {
            setImageFile(null)
        }
        setImageURL(null);
    }


    return (
        <div className='UpdateGift mt-3'>
            <Spin size='large' spinning={spining}>
                <Form
                    wrapperCol={{
                        span: 24,
                    }}
                    form={form}
                    name="UpdateGift"
                    onFinish={onFinish}
                >
                    {/* gift */}
                    <Form.Item
                        name="_id"
                        rules={[
                            {
                                required: true,
                                message: `אנא בחר מתנה!`,
                            },
                        ]}
                    >
                        <Select
                        size='large'
                            allowClear
                            showSearch
                            onChange={choose}
                            style={{ textAlign: 'right' }}
                            dropdownStyle={{ textAlign: 'right' }}
                            notFoundContent={<>לא נמצאו מתנות</>}
                            placeholder={`בחר מתנה...`} >
                            {gifts && gifts.map(gift => {
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
                        name="image"
                        style={{ display: 'inline-block', width: 'calc(100% - 8px)', marginLeft: '8px' }}>
                        {!imageFile &&
                            <div className='btn mb-2 d-flex justify-content-center uploadLogoDiv'>
                                <input type='file' accept='image/*'
                                    onChange={e => uploadImage(e)} className='uploadHiddenInput' />
                                <UploadOutlined className='plusIcon' />
                                <div>בחר תמונות לקמפיין</div>
                            </div>}
                        <div className='d-flex align-items-center justify-content-around'>
                            {imageURL && <div className='wrapperImgs' >
                                <DeleteTwoTone twoToneColor="#FAE01A" className='deleteImgIcon' title={`מחק תמונה`} onClick={removeImage} />
                                <img alt='img' src={imageURL} style={{ width: '100%', height: '20vh', objectFit: 'contain' }} />
                            </div>}
                        </div>
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
                    {/* submit */}
                    <Form.Item className='submitFormItem'>
                    <Button size='large' type="primary" htmlType="submit" className='btnSubmit'>
                            עריכת מתנה
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </div >
    );
};