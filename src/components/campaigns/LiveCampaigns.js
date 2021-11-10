import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Progress } from 'antd';
import { withRouter } from 'react-router';
import { numberWithCommas } from '../../services/service';
import moment from 'moment';

import { actions } from '../../redux/actions';

function LiveCampaigns(props) {

    const [liveCampaigns, setLiveCampaigns] = useState([]);
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
                    // {allCampaigns && allCampaigns.map(campaign => (
                    <div key={campaign._id} className="col-4 d-flex align-items-center justify-content-center"
                        onClick={() => { selectCampaign(campaign) }}
                        onMouseEnter={() => setIsCampaignHover(campaign._id)}
                        onMouseLeave={() => setIsCampaignHover(null)}>
                        <div className={`shadow mb-5 bg-body rounded card liveCampaignCard HHH`}                            >
                            <div style={{ backgroundImage: campaign.images[0] ? `url(${campaign.images[0]})` : 'linear-gradient(to right, rgb(124, 51, 98), rgb(41, 3, 28))' }}
                                className={`cardImg card-img-top ${isCampaignHover === campaign._id ? 'HHH' : ''}`} alt="..." >
                                {isCampaignHover === campaign._id && <div className="companyDetails">
                                    <img alt='img' className="logoImg" style={{ maxWidth: '50%', minWidth: '40%', height: '5vh', objectFit: 'contain', display: 'inline-block' }} src={campaign.company.logo}></img>
                                    <p className="companyName">{campaign.company.companyName}</p>
                                </div>}
                            </div>
                        </div>
                        {/* {(campaign.images && campaign.images[0]) ?
                                <div style={{ backgroundImage: `url(${campaign.images[0]})` }} className="cardImg card-img-top" alt="..." /> :
                                <img alt='img' className="cardImg card-img-top" src="https://firebasestorage.googleapis.com/v0/b/matching-599f8.appspot.com/o/Companies%2F6140542c341303e08fd8e6a6%2F1.jpg?alt=media&token=da0a0364-7440-4bf4-85dd-9dec67ea5109" alt="..." />} */}
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