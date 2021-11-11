import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { notification } from 'antd';
import "antd/dist/antd.css";

export default function Notification(props) {

    const currentNotification = useSelector(state => state.generalReducer.currentNotification);

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
