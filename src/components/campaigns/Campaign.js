import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Tooltip, Tabs, notification, } from 'antd';
import { ShareAltOutlined, MailOutlined, CopyOutlined, CopyFilled, CopyTwoTone, MailTwoTone, } from '@ant-design/icons';
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
    const donationData = useSelector(state => state.generalReducer.donationData);
    const dispatch = useDispatch();

    const [showSpin, setShowSpin] = useState(true);
    const [copy, setCopy] = useState(true);
    const [index, setIndex] = useState(1);

    useEffect(() => {
        console.log("🚀 ~ file: Campaign.js ~ line 31 ~ Campaign ~ donationData", donationData)
    }, [donationData])

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
        window.onmessage = function (e) {
            if (e.data == 'createDonation') {
                dispatch(actions.createDonation(donationData));
            }
        };
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
            console.log("🚀 ~ file: Campaign.js ~ line 60 ~ useEffect ~ campaign", campaign)
            campaign ? dispatch(actions.getCampaignById(campaign._id)) : dispatch(actions.getCampaignById(window.location.href.split('/')[4]));
        });
        return () => socket.emit('leaveCampaign', { room: campaign ? campaign._id : window.location.href.split('/')[4] });
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
                        <h2 style={{ color: '#FAE01A' }}>{campaign ? campaign.campaignName : campaign}</h2>
                    </div>
                    <div className='row'>
                        <div className="col-9">
                            <div className="row container" style={{ height: '50vh', padding: '0%', margin: '0%' }}>
                                <div className='d-flex justify-content-center'>
                                    {campaign.images.length ?
                                        <div className='col-7 offset-1 d-flex align-items-center justify-content-center'>
                                            <SpinnerCircularFixed style={{ display: showSpin ? 'block' : 'none' }} size={73} thickness={100} speed={100} color="#FFFF" secondaryColor="#FAE01A" />
                                            {/* {campaign.images.length > 1 && <div className='arrowSlide pointer notSelected' onClick={e => showCurrentImg(index + 1)} title={`הבא`}
                                                style={{ display: showSpin ? 'none' : 'block' }}>&#10094;</div>} */}
                                            {campaign.images.map((i, imgIndex) => {
                                                return (<img key={imgIndex} alt='img' title={`תמונה מס' ${imgIndex + 1}`}
                                                    style={{ height: '50vh', objectFit: 'contain', width: showSpin ? '0px' : '100%', borderRadius: '15px' }}
                                                    className='mySlides notSelected' src={i} />)
                                            })}
                                            {/* {campaign.images.length > 1 && <div className='arrowSlide pointer notSelected' onClick={e => showCurrentImg(index - 1)} title={`הקודם`} style={{ display: showSpin ? 'none' : 'block' }}>&#10095;</div>} */}
                                        </div> :
                                        <div className='col-8 d-flex align-items-center justify-content-center'>
                                            <div style={{ color: '#FFFF' }}>אין תמונות לקמפיין זה 📸</div>
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
                            <div className='row mt-5 d-flex justify-content-around clrWhite'>
                                <div className='d-flex align-items-start'>
                                    <div className='col-10'>
                                        <div className="progress campaignProgress">
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                aria-valuenow={Math.round(100 / campaign.goal * campaign.goalRaised)}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                                style={{ width: `${Math.round(100 / campaign.goal * campaign.goalRaised)}%` }}></div>
                                        </div>
                                        <div>מתוך סכום של {numberWithCommas(campaign.goal)} ₪</div>
                                    </div>
                                    <div className="col-2" style={{ fontSize: '20px' }}>
                                        {Math.round(100 / campaign.goal * campaign.goalRaised)}%
                                    </div>
                                </div>
                                <div className='row mt-5 d-flex align-items-center clrWhite'>
                                    <div className='col-9' style={{ fontSize: '20px' }}>
                                        {/* {campaign.donations.length ? `עד כה נתרם ${campaign.goalRaised} ₪, על ידי ${campaign.donations.length} תרומות.` : `היה אתה התורם הראשון!`} */}
                                        {campaign.donations.length ? `עד כה נתרם ${numberWithCommas(campaign.goalRaised)} ₪.  ` : `היה אתה התורם הראשון!`}
                                    </div>
                                    <div className='col-3 d-flex justify-content-around align-items-center Share'>
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
                                                {copy ? <CopyTwoTone twoToneColor="#FAE01A" /> : <CopyFilled />}
                                            </div>
                                        </Tooltip>
                                        <Tooltip title='מייל'>
                                            <div className='shareIcon'>
                                                {/* NOTE SERVER */}
                                                {/* <MailOutlined onClick={() => window.open(`https://mail.google.com/mail/u/0/?fs=1&su=1&body=https://matching-try.herokuapp.com/current-campaign/${campaign._id}&tf=cm`, '_blank')} /> */}
                                                {/* <MailOutlined onClick={() => window.open(`https://mail.google.com/mail/u/0/?fs=1&su=1&body=http://3000/current-campaign/${campaign._id}&tf=cm`, '_blank')} /> */}
                                                <MailTwoTone twoToneColor="#FAE01A" onClick={() => window.open(`https://mail.google.com/mail/u/0/?fs=1&su=גיפטמאצ'&body=שלום,
%0A
רוצה לתרום לקמפיין שלנו?
%0A
הכנס כאן לקישור:
%0A
https://matching-try.herokuapp.com/${campaign._id}
%0A
ותזכה בזכויות!! ובמתנות שוות!!
&tf=cm`, '_blank')} />
                                                {/* <MailOutlined onClick={() => window.open(`https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&subject=תרום%20CALL%20לקמפיין&body=שלום%2C%0A%0AI%20tried%20contacting%20you%20today%20but%20you%20seem%20to%20have%20missed%20my%20call.%20%0A%0APlease%20return%20my%20call%20as%20soon%20as%20you%E2%80%99re%20available.%20%0A%0AIn%20any%20case%2C%20I%20will%20try%20ringing%20you%20at%20a%20later%20time.%0A%0A%0ATy%2C%0A%0A%0A%0A`, '_blank')} /> */}
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
                    <Tabs defaultActiveKey="1" type='card' >
                        <TabPane tab="תרומות" key="1" >
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