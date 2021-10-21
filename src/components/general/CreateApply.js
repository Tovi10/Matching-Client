import React, { useEffect } from 'react';
import {
    Form,
    Input,
    Button,
    DatePicker,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';
import TextArea from 'rc-textarea';
import Login from '../login/Login';
import moment from 'moment';

export default function CreateApply() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer.user);

    const [form] = Form.useForm();


    const onFinish = (values) => {
        console.log("🚀 ~ file: CreateApply.js ~ line 22 ~ onFinish ~ values", values)
        dispatch(actions.createApply({ ...values, user: user._id }));
        form.setFieldsValue({
            duration: [moment('2015/01/01', 'DD/MM/YYYY'), moment('2015/01/01', 'DD/MM/YYYY')]
        });

    };

    return (
        <div className='p-auto CreateApply'>
            <h1>הגשת בקשה ליצירת קמפיין</h1>
            {user ?
                <Form

                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    form={form}
                    name="CreateApply"
                    onFinish={onFinish}
                >
                    {/* text */}
                    <Form.Item
                        name="text"
                        label={`שם הקמפיין`}
                    >
                        <Input.TextArea placeholder={`הכנס כאן את שם הקמפיין...`} />
                    </Form.Item>
                    {/* submit */}
                    <Form.Item className='submitFormItem'>
                        <Button type="primary" htmlType="submit">send</Button>
                    </Form.Item>
                </Form> : <Login />}
        </div >
    );
};