import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { actions } from '../../redux/actions';

export default function Card(props) {

    const { card } = props;
    const dispatch = useDispatch();

    return (
        <div className='Card row'>
            <div className="card col-12 mb-2" style={{ width: "18rem" }}>
                {card && <div className="card-body">
                    <h3>{`${card.sum} ש"ח`}</h3>
                    <b className="card-text">{card.text}</b>
                    {card.gift && <>
                        <p>קבלו במתנה {card.gift.name}</p>
                        <Link to={`/gift-details/${card.gift}`} onClick={() => dispatch(actions.getGiftById(card.gift))}>לפרטים על המתנה</Link></>}
                </div>}
            </div>
        </div >
    )
}