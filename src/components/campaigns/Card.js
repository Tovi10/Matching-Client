import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'antd';
import { GiftOutlined } from '@ant-design/icons';
import { actions } from '../../redux/actions';
import Login from '../login/Login';
import Donate from './Donate';

export default function Card(props) {

    const { card } = props;
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer.user);

    const [openModal, setOpenModal] = useState(false);
    return (
        <div className='Card row'>
            <div className="card col-12 mb-2" style={{ width: "18rem" }} onClick={() => setOpenModal(true)}>
                {card && <div className="card-body">
                    <div className='d-flex align-items-center justify-content-center '>
                        {/* <GiftOutlined /> */}
                        <h3>{`${card.sum} ש"ח`}</h3>
                    </div>
                    <b className="card-text">{card.text}</b>
                    {card.gift && <>
                        <p>קבלו במתנה {card.gift.name}</p>
                        <Link to={`/gift-details/${card.gift}`} onClick={() => dispatch(actions.getGiftById(card.gift))}>לפרטים על המתנה</Link></>}
                </div>}
            </div>
            <Modal footer={false} title='תרום כאן!' visible={openModal} onCancel={() => setOpenModal(false)}>
                {user ? <Donate card={card} close={() => setOpenModal(false)} /> : <Login />}
            </Modal>
        </div >
    )
}