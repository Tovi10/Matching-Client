import React from 'react';
import {
    Form,
    Input,
} from 'antd';
import { Modal } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';
import Login from '../login/Login';

import xImg from '../../assets/x.png';
import wantNewCampaignImg from '../../assets/wantNewCampaign.png'

export default function CreateApply() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer.user);
    const showModal = useSelector(state => state.applyReducer.showModal);

    const handleClose = () => {
        dispatch(actions.setShowModal(false));
        form.resetFields();
    }
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("🚀 ~ file: CreateApply.js ~ line 22 ~ onFinish ~ values", values);
        form.resetFields();
        dispatch(actions.createApply({ ...values, user: user._id }));
        handleClose();
    };

    return (
        <div className="CreateApply">
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Body>
                    <div className='p-auto wrapApplyModal'>
                        <img className="xCloseImg" src={xImg} onClick={handleClose} />
                        <div className="backgroundAll">
                            <img style={{ width: "18vw", marginTop: "9vh" }} src={wantNewCampaignImg} />
                            {user ? <p className="applyNewCampaign">הגשת בקשה לקמפיין חדש</p> : <p className="applyNewCampaign m-5">הרשם כדי להגיש בקשה</p>}
                            {user ?
                                <Form
                                    wrapperCol={{
                                        span: 24,
                                    }}
                                    form={form}
                                    name="CreateApply"
                                    onFinish={onFinish}
                                >
                                    <Form.Item
                                        name="text"
                                        rules={[
                                            {
                                                required: true,
                                                message: `פרט על הקמפיין שברצונך ליצור...`,
                                            },
                                        ]}
                                    >
                                        <Input.TextArea className="inputText" placeholder={`פרט על הקמפיין שברצונך ליצור...`} />
                                    </Form.Item>
                                    <Form.Item className='submitFormItem'>
                                        <button className="btnSend" type="primary" htmlType="submit">שלח</button>
                                    </Form.Item>
                                </Form> : <Login />}
                        </div>
                    </div >
                </Modal.Body>
            </Modal>
        </div>
    );
}

