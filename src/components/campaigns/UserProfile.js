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
                    rules={[{ required: true, message: 'הכנס מייל!' }]}
                >
                    <Input placeholder="מייל" />
                </Form.Item>
                <Form.Item
                    name="phone"
                    rules={[{ required: true, message: 'הכנס טלפון!' }]}
                >
                    <Input placeholder="טלפון" />
                </Form.Item>
                <Form.Item
                    name="address"
                    rules={[{ required: true, message: 'הכנס כתובת!' }]}
                >
                    <Input placeholder="כתובת" />
                </Form.Item>
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'הכנס שם!' }]}
                >
                    <Input placeholder="שם" />
                </Form.Item>
                <Form.Item>
                    <div className='d-flex justify-content-between'>
                        {props.close && <Button type="primary" onClick={() => props.close()}>בטל</Button>}
                        <Button type="primary" htmlType="submit">עדכן</Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}