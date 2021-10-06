import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'antd';
import "antd/dist/antd.css";

export default function Notification(props) {

    const dispatch = useDispatch();
    const currentNotification = useSelector(state => state.generalReducer.currentNotification);


    const undoNotification = () => {
        notification.close(baseNotification.key);
        alert('undoNotification');
    }

    const baseNotification = currentNotification ? {
        key: 'notification...',
        message: currentNotification,
        placement: 'bottomLeft',
        duration: 3,
    } : '';

    useEffect(() => {
        if (currentNotification)
            notification.open(baseNotification);
    }, [currentNotification])

    return (
        <></>
    );
};
