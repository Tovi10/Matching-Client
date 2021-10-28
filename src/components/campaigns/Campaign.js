import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Tooltip, Tabs, notification, } from 'antd';
import { ShareAltOutlined, MailOutlined, CopyOutlined, CopyFilled } from '@ant-design/icons';
import { numberWithCommas } from '../../services/service';
import { SpinnerCircularFixed } from 'spinners-react';

import { actions } from '../../redux/actions';

import Card from './Card';
import Donations from './Donations';
import Recruiters from './Recruiters';

const { TabPane } = Tabs;


export default function Campaign(props) {

    const campaign = useSelector(state => state.campaignReducer.campaign);
    const socket = useSelector(state => state.socketReducer.socket);
    const dispatch = useDispatch();

    const [showSpin, setShowSpin] = useState(true);
    const [copy, setCopy] = useState(true);
    const [index, setIndex] = useState(1);

    const showCurrentImg = (n) => {
        if (!campaign || !campaign.images.length) { return }
        const x = document.getElementsByClassName("mySlides");
        let slideIndex = n;
        if (n > x.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = x.length
        }
        for (let i = 0; i < x.length; x[i].style.display = "none", i++);
        x[slideIndex - 1].style.display = "block";
        setIndex(slideIndex)
    }

    useEffect(() => {
        if (!campaign) {
            dispatch(actions.getCampaignById(window.location.pathname.split('/')[2]));
        }
        // time to get the images from firebase
        setTimeout(() => {
            setShowSpin(false)
        }, 2000);

        socket.on('gotEntered', event => console.log(event.msg));
        socket.on('leaveCampaign', event => console.log(event.msg));
        socket.on('newDonation', event => {
            notification.open({
                message: 'תרומה חדשה!',
                description: event.donation.user.name + ` תרם ` + event.donation.card.sum + ` וקבל ` + event.donation.card.gift.advertising
            });
            console.log(event);
            dispatch(actions.getCampaignById(campaign._id));
        });

        return campaign ? () => socket.emit('leaveCampaign', { room: campaign._id }) : "No campaign!";
    }, [])

    useEffect(() => {
        campaign ? socket.emit('enterCampaign', { room: campaign._id }) : console.log("No campaign!");
    }, [campaign]);

    // when spining finish -> its the time to display the images (by width);
    useEffect(() => {
        if (!showSpin) {
            showCurrentImg(1)
        }
    }, [showSpin])

    useInterval(() => {
        showCurrentImg(index + 1);
    }, 10000);

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
                                    {campaign.images.length ?
                                        <div className='col-7 offset-1 d-flex align-items-center justify-content-center'>
                                            <SpinnerCircularFixed style={{ display: showSpin ? 'block' : 'none' }} size={73} thickness={100} speed={100} color="#252583" secondaryColor="#5ddf5d" />
                                            {campaign.images.length > 1 && <div className='arrowSlide pointer notSelected' onClick={e => showCurrentImg(index + 1)} title={`הבא`}
                                                style={{ display: showSpin ? 'none' : 'block' }}>&#10094;</div>}
                                            {campaign.images.map((i, imgIndex) => {
                                                return (<img key={imgIndex} alt='img' title={`תמונה מס' ${imgIndex + 1}`}
                                                    // style={{ width: '100%', height: '50vh', objectFit: 'contain', display: showSpin ? 'none' : 'block' }}
                                                    style={{ height: '50vh', objectFit: 'contain', width: showSpin ? '0px' : '100%' }}
                                                    className='rounded mySlides notSelected' src={i} />)
                                            })}
                                            {campaign.images.length > 1 && <div className='arrowSlide pointer notSelected' onClick={e => showCurrentImg(index - 1)} title={`הקודם`} style={{ display: showSpin ? 'none' : 'block' }}>&#10095;</div>}
                                        </div> :
                                        <div className='col-8 d-flex align-items-center justify-content-center'>
                                            <div>אין תמונות לקמפיין זה 📸</div>
                                        </div>}
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
                                    <div className='col-8'>
                                        <p>מתוך סכום של {numberWithCommas(campaign.goal)} ש"ח</p>
                                        {campaign.donations.length ? <h4>מס' התרומות עד כה הינו {campaign.donations.length}</h4> : <h4>היה אתה התורם הראשון!</h4>}
                                    </div>
                                    {/* <div className='col-4'></div> */}
                                    <div className='col-4 d-flex justify-content-around align-items-center Share'>
                                        <div>
                                            שתף באמצעות:
                                            {/* <ShareAltOutlined /> */}
                                        </div>
                                        <Tooltip title={copy ? 'העתקת קישור' : 'הקישור הועתק'} onClick={() => {
                                            setCopy(false);
                                            // navigator.clipboard.writeText(`http://localhost:3000/current-campaign/${campaign._id}`);
                                            navigator.clipboard.writeText(`https://matching-try.herokuapp.com/current-campaign/${campaign._id}`);
                                        }}>
                                            <div className='shareIcon'>
                                                {copy ? <CopyOutlined /> : <CopyFilled />}
                                            </div>
                                        </Tooltip>
                                        <Tooltip title='מייל'>
                                            <div className='shareIcon'>
                                                {/* NOTE SERVER */}
                                                {/* <MailOutlined onClick={() => window.open(`https://mail.google.com/mail/u/0/?fs=1&su=1&body=http://3000/current-campaign/${campaign._id}&tf=cm`, '_blank')} /> */}
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
                    <Tabs defaultActiveKey="1" type='card'>
                        <TabPane tab="תרומות" key="1">
                            <Donations />
                        </TabPane>
                        <TabPane tab="מגייסים" key="2">
                            <Recruiters />
                        </TabPane>
                    </Tabs>
                </div> : 'אין קמפיין'
            }
        </div >
    )
}


function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        let id = setInterval(tick, delay);
        return () => clearInterval(id);
    }, [delay]);
}