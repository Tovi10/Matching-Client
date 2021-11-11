import React from 'react';
import { useSelector } from 'react-redux';

export default function GiftDetails(props) {

    const currentGift = useSelector(state => state.giftReducer.currentGift);

    return (
        <div className="GiftDetails">
            <div className="row">
                <div className="col-2"></div>
                <div className="card mb-3 col-8 giftCard">
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img className="card-img" src={currentGift ? currentGift.image: ""} alt="..." />
                            {/* <img style={{ width: '100%', height: '100%', objectFit: 'contain' }} className="card-img" src='https://s3.eu-central-1.amazonaws.com/prod-prog-site-s3/data/siropu/am/user/161276d2ed5a57.gif' alt="..." /> */}
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{`רוצים לדעת עוד על ${currentGift ? currentGift.name : ""}?`}</h5>
                                <p className="card-text">{currentGift ? currentGift.advertising : ""}</p>
                                <p className="card-text"><small className="text-muted">{`מחיר בחנויות ${currentGift ? currentGift.price : ""} ₪`}</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );

}