import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Progress } from 'antd';
import { withRouter } from 'react-router';
import { numberWithCommas } from '../../services/service';
import moment from 'moment';

import { actions } from '../../redux/actions';

function LiveCampaigns(props) {

    const [liveCampaigns, setLiveCampaigns] = useState([]);
    // const [isCampaignHover, setIsCampaignHover] = useState('618ab19d0ff3d6ae11866283');
    const [isCampaignHover, setIsCampaignHover] = useState(null);

    const { history } = props;
    const allCampaigns = useSelector(state => state.campaignReducer.allCampaigns);
    const dispatch = useDispatch();

    useEffect(() => {
        let currentDate = moment(Date.now()).format('DD/MM/YYYY');
        setLiveCampaigns(allCampaigns.filter(c => currentDate >= c.duration[0] && currentDate <= c.duration[1]));
    }, []);

    const selectCampaign = (campaign) => {
        dispatch(actions.setCampaign(campaign._id));
        dispatch(actions.getCompanyById(campaign.company));
        history.push(`/current-campaign/${campaign._id}`);
    }

    return (
        <div className="LiveCampaigns container-fluid">

            <div className='row'>
                {liveCampaigns && liveCampaigns.map(campaign => (
                    <div key={campaign._id} className="col-4 d-flex align-items-center justify-content-center"
                        onClick={() => { selectCampaign(campaign) }}
                    onMouseEnter={() => setIsCampaignHover(campaign._id)}
                    onMouseLeave={() => setIsCampaignHover(null)}
                    >
                        <div className={`shadow mb-5 bg-body rounded card liveCampaignCard HHH`}                            >
                            <div style={{ backgroundImage: campaign.images[0] ? `url(${campaign.images[0]})` : 'linear-gradient(to right, rgb(124, 51, 98), rgb(41, 3, 28))' }}
                                className={`cardImg card-img-top ${isCampaignHover === campaign._id ? 'HHH' : ''}`} alt="..." >
                                {isCampaignHover === campaign._id &&
                                    <div className='d-flex flex-column px-2' style={{ textAlign: 'left',color:'#45022D' }}>
                                        <div className='' style={{ paddingTop:'20%',fontSize:'20px',fontWeight:'bold' }}>
                                            <div className="">{campaign.company.companyName}</div>
                                        </div>
                                        <div style={{paddingTop:'5%'}}>
                                            <div style={{fontSize:'16px'}}>{campaign.campaignName}</div>
                                            <div>{campaign.purposeOfCollecting}</div>
                                        </div>
                                        <div style={{paddingTop:'5%'}}>
                                            <div style={{fontSize:'16px'}}>יעד:  {numberWithCommas(campaign.goal)} ש"ח</div>
                                            <div>עד כה גויס:  {numberWithCommas(campaign.goalRaised)} ש"ח</div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        {/* <div className="card-body">
                                <div className="companyDetails">
                                    <img alt='img' className="logoImg" style={{ maxWidth: '50%', minWidth: '40%', height: '5vh', objectFit: 'contain', display: 'inline-block' }} src={campaign.company.logo}></img>
                                    <p className="companyName">{campaign.company.companyName}</p>
                                </div>
                                <h5 className="card-title">{campaign.campaignName}</h5>
                                <div className="progress">
                                    {campaign.goal ? <Progress percent={Math.round(100 / campaign.goal * campaign.goalRaised)} /> : <Progress percent={0} />}
                                </div>
                                <small className="text-muted goal">מתוך סכום של  {numberWithCommas(campaign.goal)} ש"ח</small>
                            </div> */}
                        {/* </div> */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default withRouter(LiveCampaigns);