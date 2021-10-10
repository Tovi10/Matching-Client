import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-carousel-minimal';
import { Spin, Tooltip } from 'antd';
import { ShareAltOutlined, MailOutlined, CopyOutlined, CopyFilled } from '@ant-design/icons';
import { numberWithCommas } from '../../services/service';
import { SpinnerCircularFixed } from 'spinners-react';

import { actions } from '../../redux/actions';

import Card from './Card';


export default function Campaign(props) {

    const campaign = useSelector(state => state.campaignReducer.campaign);
    const dispatch = useDispatch();
    const [showSpin, setShowSpin] = useState(true);
    const [copy, setCopy] = useState(true);

    useEffect(() => {
        if (!campaign) {
            dispatch(actions.getCampaignById(window.location.pathname.split('/')[2]));
        }
        setTimeout(() => {
            setShowSpin(false)
        }, 2000);
    }, [])

    return (
        <div className='Campaign container-fluid'>
            {campaign ?
                <div>
                    <div className='row'>
                        <h2>{campaign ? campaign.campaignName : campaign}</h2>
                    </div>
                    <div className='row'>
                        <div className="col-9">
                            <div className="row container" style={{ height: '50vh' }}>
                                <div className='d-flex justify-content-center'>
                                    <div className='col-8 d-flex align-items-center justify-content-center'>
                                        {/* <Spin style={{ display: showSpin ? 'block' : 'none' }} /> */}
                                        <SpinnerCircularFixed style={{ display: showSpin ? 'block' : 'none' }} size={73} thickness={100} speed={100} color="#252583" secondaryColor="#5ddf5d" />
                                        {(campaign && campaign.images && campaign.images.length) ?
                                            <img style={{ width: '100%', height: '50vh', objectFit: 'contain', display: showSpin ? 'none' : 'block' }} className='rounded' src={campaign.images[0]} /> :
                                            <div style={{ display: showSpin ? 'none' : 'block' }}>no img!</div>}
                                    </div>
                                    <div className="col-4 d-flex align-items-center">
                                        <div className="blockquote-wrapper">
                                            <div className="blockquote">
                                                <h4 className="text-break p-1 purposeOfCollectingTxt">{campaign ? campaign.purposeOfCollecting : "purposeOfCollecting!!!"}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row mt-5 d-flex justify-content-center'>
                                <div className='row'>
                                    <div className="progress col-10 campaignProgress">
                                        <div
                                            className="progress-bar bg-secondary"
                                            role="progressbar"
                                            aria-valuenow={Math.round(100 / campaign.goal * campaign.goalRaised)}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            style={{ width: `${Math.round(100 / campaign.goal * campaign.goalRaised)}%` }}></div>
                                    </div>
                                    <div className="col-2">
                                        {Math.round(100 / campaign.goal * campaign.goalRaised)}%
                                    </div>
                                </div>
                                <div className='row'>
                                    <p>מתוך סכום של {numberWithCommas(campaign.goal)} ש"ח</p>
                                    {campaign.donors.length ? <h4>מס' התורמים עד כה הינו {campaign.donors.length}</h4> : <h4>היה אתה התורם הראשון!</h4>}
                                    <div className='col-4'></div>
                                    <div className='col-4 d-flex justify-content-around p-2 Share'>
                                        <div>
                                            שתף באמצעות:
                                            {/* <ShareAltOutlined /> */}
                                        </div>
                                        <Tooltip title={copy ? 'העתקת קישור' : 'הקישור הועתק'} onClick={() => {
                                            setCopy(false);
                                            navigator.clipboard.writeText(`http://localhost:3000/current-campaign/${campaign._id}`);
                                            // navigator.clipboard.writeText(`https://matching-try.herokuapp.com/current-campaign/${campaign._id}`);
                                        }}>
                                            <div className='shareIcon'>
                                                {copy ? <CopyOutlined /> : <CopyFilled />}
                                            </div>
                                        </Tooltip>
                                        <Tooltip title='מייל'>
                                            <div className='shareIcon'>
                                                {/* <MailOutlined onClick={() => window.open(`https://mail.google.com/mail/u/0/?fs=1&su=1&body=http://localhost:3000/current-campaign/${campaign._id}&tf=cm`, '_blank')} /> */}
                                                <MailOutlined onClick={() => window.open(`https://mail.google.com/mail/u/0/?fs=1&su=1&body=https://matching-try.herokuapp.com/current-campaign/${campaign._id}&tf=cm`, '_blank')} />
                                            </div>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 campaignCards">
                            {campaign.cards.length ? campaign.cards.map(card =>
                                <Card key={card._id} card={card} />
                            ) : "no cards yet..."
                            }
                        </div>
                    </div>
                    <div className='row'>
                    </div>
                </div> : 'אין קמפיין'
            }
        </div >
    )
}
