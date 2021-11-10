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
    const allCompanies = useSelector(state => state.companyReducer.allCompanies);
    const dispatch = useDispatch();

    useEffect(() => {
        let currentDate = moment(Date.now()).format('DD/MM/YYYY');
        setLiveCampaigns(allCampaigns.filter(c => currentDate >= c.duration[0] && currentDate <= c.duration[1]));
        if (!allCompanies) {
            dispatch(actions.getAllCompanies())
        }
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
                        <div className={`shadow mb-5 bg-body rounded card liveCampaignCard`}                            >
                            <div style={{ backgroundImage: campaign.images[0] ? `url(${campaign.images[0]})` : 'linear-gradient(to right, rgb(124, 51, 98), rgb(41, 3, 28))' }}
                                className={`cardImg card-img-top ${isCampaignHover === campaign._id ? 'hoverCampaign' : ''}`} alt="..." >
                                {isCampaignHover === campaign._id &&
                                    <div className='d-flex flex-column px-2' style={{ textAlign: 'left', color: '#45022D' }}>
                                        <div className='' style={{ paddingTop: '20%', fontSize: '20px', fontWeight: 'bold' }}>
                                            <div className="">{campaign.company.companyName}</div>
                                        </div>
                                        <div style={{ paddingTop: '5%' }}>
                                            <div style={{ fontSize: '16px' }}>{campaign.campaignName}</div>
                                            <div>{campaign.purposeOfCollecting}</div>
                                        </div>
                                        <div style={{ paddingTop: '5%' }}>
                                            <div style={{ fontSize: '16px' }}>יעד:  {numberWithCommas(campaign.goal)} ש"ח</div>
                                            <div>עד כה גויס:  {numberWithCommas(campaign.goalRaised)} ש"ח</div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                ))}
                <div className='d-flex justify-content-center'>
                    {allCompanies && allCompanies.map(company => (
                        <div className='d-flex justify-content-center align-items-center'>
                            <div className='d-flex justify-content-center'>
                                <svg className="pAbsolute" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 600 600"><path d="M449.5 177.2C485.4 225.8 500.5 287.5 483.9 334.8 467.4 382 419.3 414.9 370.7 433 322.1 451.1 273.1 454.4 221.4 438.8 169.8 423.3 115.5 388.9 103.6 343.1 91.8 297.3 122.4 240 162.2 190.6 202 141.2 251 99.6 303.9 96.5 356.8 93.4 413.6 128.7 449.5 177.2Z"
                                    fill="#FFFF" /></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 600 600"><path d="M441.7 222.8C479 282.7 501.2 355.8 475.1 398.9 449 442 374.5 455 312.4 447.8 250.3 440.7 200.7 413.3 161.4 362.7 122.2 312 93.3 238 118.1 185.3 143 132.7 221.5 101.3 286.9 108.9 352.3 116.5 404.5 163 441.7 222.8Z"
                                    fill="#FAE01A" /></svg>
                            </div>
                            <div className='pAbsolute'>
                                {company.logo ? <img src={company.logo} width='70' /> : company.companyName}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default withRouter(LiveCampaigns);