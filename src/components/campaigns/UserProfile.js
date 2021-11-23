import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { actions } from '../../redux/actions';

export default function UserProfile(props) {

    const user = useSelector(state => state.userReducer.user);
    const dispatch = useDispatch();


    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        dispatch(actions.updateUser({ ...user, ...values }));
        if (props.close)
            props.close();
    }

    return (
        <div className='UserProfile' style={{ textAlign: 'center' }}>
            <Form onFinish={onFinish} initialValues={user}>
                <Form.Item
                    name="email"
                // rules={[{ required: true, message: 'הכנס מייל!' }]}
                >
                    <Input placeholder="מייל" disabled={true} />
                </Form.Item>
                <Form.Item
                    name="phone"
                    rules={[{ required: true, message: 'הכנס טלפון!' }, {
                        max: 10,
                        message: `הכנס טלפון עד 10 תווים!`,
                    }]}
                >
                    <Input placeholder="טלפון" />
                </Form.Item>
                <Form.Item
                    name="address"
                    rules={[
                        { required: true, message: 'הכנס כתובת!' }, {
                            max: 50,
                            message: `הכנס כתובת עד 50 תווים!`,
                        }]}
                >
                    <Input placeholder="כתובת" />
                </Form.Item>
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'הכנס שם!' }, {
                        max: 20,
                        message: `הכנס שם עד 20 תווים!`,
                    }]}
                >
                    <Input placeholder="שם" />
                </Form.Item>
                <Form.Item>
                    <div className='d-flex justify-content-between'>
                        {props.close && <Button type="primary" onClick={() => props.close()}>סגור</Button>}
                        <Button type="primary" htmlType="submit">עדכן</Button>
                        <Button type="primary" onClick={() => dispatch(actions.signOut())}>התנתק</Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}