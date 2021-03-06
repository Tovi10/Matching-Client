import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { actions } from '../../redux/actions';
import { firebase } from '../../services/firebase.service';

export default function Login() {

    const dispatch = useDispatch();

    const [isSignUp, setIsSignUp] = useState(false);
    const [isForgetPassword, setIsForgetPassword] = useState(false);

    const signIn = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log("馃殌 ~ file: Login.js ~ line 19 ~ .then ~ result", result)
                dispatch(actions.setFirebaseUser(result.user));
                dispatch(actions.getUserByUid(result.user.uid));
            })
            .catch((error) => {
                console.log("馃殌 ~ file: Login.js ~ line 24 ~ signIn ~ error", error)
                if (error.code === 'auth/user-not-found') {
                    dispatch(actions.setCurrentNotification('诪砖转诪砖 诇讗 拽讬讬诐!'))
                }
                if (error.code === 'auth/wrong-password') {
                    dispatch(actions.setCurrentNotification('住讬住诪讗 诇讗 转拽讬谞讛!'))
                }
                else {
                    dispatch(actions.setCurrentNotification(error.code))
                }
            });
    }

    const signUp = (email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                console.log("馃殌 ~ file: Login.js ~ line 35 ~ .then ~ result", result)
                dispatch(actions.setFirebaseUser(result.user));
                dispatch(actions.createUser(result.user));
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    dispatch(actions.setCurrentNotification('讻转讜讘转 诪讬讬诇 讘砖讬诪讜砖!'))
                }
                else
                    dispatch(actions.setCurrentNotification(error.code))
                console.log("馃殌 ~ file: Login.js ~ line 27 ~ signUp ~ error", error)
            });
    }

    const signWithGoogle = () => {
        let provider = new firebase.auth.GoogleAuthProvider();
        // provider.addScope('https://www.googleapis.com/auth/contacts');
        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                console.log("馃殌 ~ file: Login.js ~ line 42 ~ result", result);
                dispatch(actions.setFirebaseUser(result.user));
                if (result.additionalUserInfo.isNewUser) {
                    dispatch(actions.createUser(result.user));
                } else {
                    dispatch(actions.getUserByUid(result.user.uid));
                }
            }).catch(function (error) {
                dispatch(actions.setCurrentNotification(error.code))
                console.log("馃殌 ~ file: Login.js ~ line 45 ~ error", error)
            });
    }

    const forgetPassword = (email) => {
        firebase.auth().sendPasswordResetEmail(email).then((res) => {
            console.log("馃殌 ~ file: Login.js ~ line 59 ~ firebase.auth ~ res", res)
        }).catch((error) => {
            dispatch(actions.setCurrentNotification(error.code))
            console.log("馃殌 ~ file: Login.js ~ line 64 ~ forgetPassword ~ error", error)
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
            <Form onFinish={onFinish}>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: '讛讻谞住 诪讬讬诇!' }]}
                >
                    <Input prefix={<MailOutlined />} placeholder="诪讬讬诇" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: !isForgetPassword, message: '讛讻谞住 住讬住诪讗!' }]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="住讬住诪讗"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={() => { setIsForgetPassword(true); setIsSignUp(false) }}>砖讻讞转讬 住讬住诪讗</Button>
                    {` 讗讜 `}
                    <Button type="primary" htmlType="submit">讛转讞讘专</Button>
                    {` 讗讜 `}
                    <Button type='primary' htmlType='submit' onClick={() => { setIsSignUp(true); setIsForgetPassword(false) }}>讛专砖诐</Button>
                    {` 讗讜 `}
                    <Button type='primary' onClick={signWithGoogle}>GOOGLE</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
