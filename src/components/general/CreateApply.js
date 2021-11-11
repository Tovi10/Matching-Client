import React from 'react';
import {
    Form,
    Input,
    Button,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';
import Login from '../login/Login';

export default function CreateApply() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer.user);

    const [form] = Form.useForm();


    const onFinish = (values) => {
        console.log("🚀 ~ file: CreateApply.js ~ line 22 ~ onFinish ~ values", values)
        dispatch(actions.createApply({ ...values, user: user._id }));
    };

    return (
        <div className='p-auto CreateApply'>
            <h1>הגשת בקשה ליצירת קמפיין</h1>
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
                        <Input.TextArea placeholder={`פרט על הקמפיין שברצונך ליצור...`} />
                    </Form.Item>
                    {/* submit */}
                    <Form.Item className='submitFormItem'>
                        <Button type="primary" htmlType="submit">send</Button>
                    </Form.Item>
                </Form> : <Login />}
        </div >
    );
};