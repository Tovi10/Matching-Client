import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-carousel-minimal';
import { Spin, Tooltip, Tabs } from 'antd';
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


// const data = [
//     {
//         image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
//         caption: `<div>
//                   San Francisco
//                   <br/>
//                   Next line
//                 </div>`
//     },
//     {
//         image: "https://cdn.britannica.com/s:800x450,c:crop/35/204435-138-2F2B745A/Time-lapse-hyper-lapse-Isle-Skye-Scotland.jpg",
//         caption: "Scotland"
//     },
//     {
//         image: "https://static2.tripoto.com/media/filter/tst/img/735873/TripDocument/1537686560_1537686557954.jpg",
//         caption: "Darjeeling"
//     },
//     {
//         image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Palace_of_Fine_Arts_%2816794p%29.jpg/1200px-Palace_of_Fine_Arts_%2816794p%29.jpg",
//         caption: "San Francisco"
//     },
//     {
//         image: "https://i.natgeofe.com/n/f7732389-a045-402c-bf39-cb4eda39e786/scotland_travel_4x3.jpg",
//         caption: "Scotland"
//     },
//     {
//         image: "https://www.tusktravel.com/blog/wp-content/uploads/2020/07/Best-Time-to-Visit-Darjeeling-for-Honeymoon.jpg",
//         caption: "Darjeeling"
//     },
//     {
//         image: "https://www.omm.com/~/media/images/site/locations/san_francisco_780x520px.ashx",
//         caption: "San Francisco"
//     },
//     {
//         image: "https://images.ctfassets.net/bth3mlrehms2/6Ypj2Qd3m3jQk6ygmpsNAM/61d2f8cb9f939beed918971b9bc59bcd/Scotland.jpg?w=750&h=422&fl=progressive&q=50&fm=jpg",
//         caption: "Scotland"
//     },
//     {
//         image: "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/02/summer-7.jpg",
//         caption: "Darjeeling"
//     }
// ];
// const captionStyle = {
//     fontSize: '2em',
//     fontWeight: 'bold',
// }
// const slideNumberStyle = {
//     fontSize: '20px',
//     fontWeight: 'bold',
// }

{/* <Carousel
                                            data={campaign.images}
                                            time={10000}
                                            // width="100%"
                                            // height="500px"
                                            captionStyle={captionStyle}
                                            radius="1px"
                                            // slideNumber={true}
                                            // slideNumberStyle={slideNumberStyle}
                                            captionPosition="bottom"
                                            automatic={true}
                                            dots={true}
                                            pauseIconColor="white"
                                            pauseIconSize="40px"
                                            slideBackgroundColor="darkgrey"
                                            slideImageFit="cover"
                                            // thumbnails={true}
                                            // thumbnailWidth="100px"
                                            style={{
                                                textAlign: "center",
                                                // maxWidth: "850px",
                                                // maxHeight: "500px",
                                                // margin: "40px auto",
                                            }}
                                        /> */}