import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/action';
import { firebase } from '../../services/firebase.service';

export default function Login() {

    const emailRef = useRef(null), passwordRef = useRef(null);
    const user = useSelector(state => state.userReducer.user);
    const dispatch = useDispatch();

    const signIn = () => {
        firebase.auth().signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
            .then((user) => {
                console.log("🚀 ~ file: Login.js ~ line 10 ~ .then ~ user", user);
                dispatch(actions.getUser())
            })
            .catch((error) => {
                if (error.code === 'auth/user-not-found') {
                    signUp();
                }
                console.log("🚀 ~ file: Login.js ~ line 12 ~ signIn ~ error", error)

            });
    }

    const signUp = () => {
        firebase.auth().createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
            .then((user) => {
                console.log("🚀 ~ file: Login.js ~ line 24 ~ .then ~ user", user)
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
                console.log("🚀 ~ file: Login.js ~ line 42 ~ result", result)
            }).catch(function (error) {
                console.log("🚀 ~ file: Login.js ~ line 45 ~ error", error)
            });
    }

    return (
        <div className='Login'>
            <span>Login</span>
            <span>enter email:</span>
            <input type='email' ref={emailRef} />
            <span>enter password:</span>
            <input type='password' ref={passwordRef} />
            <input type='button' value='login password' onClick={signIn} />
            <input type='button' value='signup password' onClick={signUp} />
            <input type='button' value='sign with google' onClick={signWithGoogle} />
        </div>
    )
}
