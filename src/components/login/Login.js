import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { actions } from '../../redux/actions';
import { firebase } from '../../services/firebase.service';

export default function Login() {

    const user = useSelector(state => state.userReducer.user);
    const dispatch = useDispatch();

    const [isSignUp, setIsSignUp] = useState(false);

    const signIn = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log("🚀 ~ file: Login.js ~ line 19 ~ .then ~ result", result)
                dispatch(actions.setFirebaseUser(result.user));
                dispatch(actions.getUserByUid(result.user.uid));
            })
            .catch((error) => {
                if (error.code === 'auth/user-not-found') {
                    signUp(email, password);
                }
                console.log("🚀 ~ file: Login.js ~ line 12 ~ signIn ~ error", error)

            });
    }

    const signUp = (email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                console.log("🚀 ~ file: Login.js ~ line 35 ~ .then ~ result", result)
                dispatch(actions.setFirebaseUser(result.user));
                dispatch(actions.getUserByUid(result.user.uid));
            })
            .catch((error) => {
                console.log("🚀 ~ file: Login.js ~ line 27 ~ signUp ~ error", error)
            });
    }

    const signWithGoogle = () => {
        let provider = new firebase.auth.GoogleAuthProvider();
        // provider.addScope('https://www.googleapis.com/auth/contacts');
        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                let token = result.credential.accessToken;
                console.log("🚀 ~ file: Login.js ~ line 42 ~ result", result);
                dispatch(actions.setFirebaseUser(result.user));
                dispatch(actions.getUserByUid(result.user.uid));
            }).catch(function (error) {
                console.log("🚀 ~ file: Login.js ~ line 45 ~ error", error)
            });
    }
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        if (isSignUp) {
            signUp(values.email, values.password);
        } else {
            signIn(values.email, values.password);
        }

    };

    return (
        <div className='Login' style={{textAlign:'center'}}>
            <Form onFinish={onFinish}>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'הכנס מייל!' }]}
                >
                    <Input prefix={<MailOutlined />} placeholder="מייל" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'הכנס סיסמא!' }]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="סיסמא"
                    />
                </Form.Item>
                <Form.Item>
                    <div className="pointer">שכחתי סיסמא</div>
                    <Button type="primary" htmlType="submit">התחבר</Button>
                    {` או `}
                    <Button type='primary' htmlType='submit' onClick={() => setIsSignUp(true)}>הרשם</Button>
                    {` או `}
                    <Button type='primary' onClick={signWithGoogle}>GOOGLE</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
