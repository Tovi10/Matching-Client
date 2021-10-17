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
    const [isForgetPassword, setIsForgetPassword] = useState(false);

    const signIn = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log("🚀 ~ file: Login.js ~ line 19 ~ .then ~ result", result)
                dispatch(actions.setFirebaseUser(result.user));
                dispatch(actions.getUserByUid(result.user.uid));
            })
            .catch((error) => {
                if (error.code === 'auth/user-not-found') {
                    // signUp(email, password);
                }
                dispatch(actions.setCurrentNotification(error.code))
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
                dispatch(actions.setCurrentNotification(error.code))
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
                dispatch(actions.setCurrentNotification(error.code))
                console.log("🚀 ~ file: Login.js ~ line 45 ~ error", error)
            });
    }

    const forgetPassword = (email) => {
        firebase.auth().sendPasswordResetEmail(email).then((res) => {
            console.log("🚀 ~ file: Login.js ~ line 59 ~ firebase.auth ~ res", res)
        }).catch((error) => {
            dispatch(actions.setCurrentNotification(error.code))
            console.log("🚀 ~ file: Login.js ~ line 64 ~ forgetPassword ~ error", error)
        });

    }
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        if (isForgetPassword) {
            forgetPassword(values.email);
        }
        else {
            if (isSignUp) {
                signUp(values.email, values.password);
            } else {
                signIn(values.email, values.password);
            }
        }

    };

    return (
        <div className='Login' style={{ textAlign: 'center' }}>
            <Button onClick={e=>{
                debugger
                const cookie = document.cookie.split('giftMatchUserUid=');
                // if (cookie.length === 2&&cookie[1]) {
                    firebase.auth().signInWithCustomToken('bF4GS5wTMreGza4sTc0VeteXy0C2').then(res=>{
                    console.log("🚀 ~ file: Login.js ~ line 91 ~ firebase.auth ~ res", res)

                    }).catch(err=>{
                    console.log("🚀 ~ file: Login.js ~ line 94 ~ firebase.auth ~ err", err)
                        
                    })
                // }
            }}>hi hihi </Button>
            <Form onFinish={onFinish}>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'הכנס מייל!' }]}
                >
                    <Input prefix={<MailOutlined />} placeholder="מייל" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: !isForgetPassword, message: 'הכנס סיסמא!' }]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="סיסמא"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={() => setIsForgetPassword(true)}>שכחתי סיסמא</Button>
                    {` או `}
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
