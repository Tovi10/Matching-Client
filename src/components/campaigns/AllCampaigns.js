import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Progress, Spin } from 'antd';
import { actions } from '../../redux/actions';
import { numberWithCommas } from '../../services/service';
import Stamp from './Stamp';
import { ReactHeight } from 'react-height';

import plusImg from '../../assets/plus.png'
import CreateApply from '../general/CreateApply';

function AllCampaigns(props) {

    const { history } = props;

    const dispatch = useDispatch();
    const allCampaigns = useSelector(state => state.campaignReducer.allCampaigns);
    const [showSpin, setShowSpin] = useState(false);

    useEffect(() => {
        dispatch(actions.getAllCampaigns());
        // setTimeout(() => {
        //     setShowSpin(false)
        // }, 2000);
    }, []);

    const selectCampaign = (campaign) => {
        dispatch(actions.setCampaign(campaign._id));
        dispatch(actions.getCompanyById(campaign.company));
        history.push(`/current-campaign/${campaign._id}`);
    }

    const [currentHeight, setCurrentHeight] = useState([]);
    const func = (height, i) => {
        let a = currentHeight;
        a.push({ key: i, value: height })
        setCurrentHeight([...a])
        // console.log({ key: i, value: height })
    }

    const createApplyForNewCampaign = () => {
        dispatch(actions.setShowModal(true));
    }

    return (
        <div className='AllCampaigns container-fluid'>
            <div className="card-columns">
                {allCampaigns ? allCampaigns.map((campaign, i) => (
                    <div className="m-3 card comapaignCard" key={campaign._id} onClick={() => { selectCampaign(campaign) }}>
                        <ReactHeight onHeightReady={height => { func(height, i) }}>
                            {/* // <ReactHeight onHeightReady={height => { func(height) }setCurrentHeight(...currentHeight, [{key: i, value: height }]); console.log(`the id of the card is ${campaign._id} and the height is ${height}`) }}> */}
                            <div>
                                <h5 className="card-title">{campaign.campaignName}</h5>
                                <Spin style={{ display: showSpin ? 'block' : 'none' }} />
                                {(campaign.company && campaign.company.logo) ?
                                    <img style={{ width: "50%", display: showSpin ? 'none' : '' }} src={campaign.company.logo} className="card-img-top" alt="..." /> :
                                    <div style={{ display: showSpin ? 'none' : '' }} className="card-img-top" >no company logo</div>}
                                <div className="card-body">
                                    <p className="card-text">{campaign.purposeOfCollecting}</p>
                                    <b>יעד הקמפיין {numberWithCommas(campaign.goal)}</b>
                                    {campaign.goal ? <Progress percent={Math.round(100 / campaign.goal * campaign.goalRaised)} /> : <Progress percent={0} />}
                                </div>
                            </div>
                            {
                                campaign.duration[1] && new Date(campaign.duration[1]) < new Date(Date.now()) ?
                                    // <div style={{ marginTop: '20px' }}>
                                    <div style={{ padding: "30px", backgroundColor: "red", height: "50px", width: "20px", zIndex: '4' }} style={{ padding: `${currentHeight[i] ? (Number(currentHeight[i].value) - 250) / 2 : 1000}px !important`, marginTop: `${currentHeight[i] ? (Number(currentHeight[i].value) - 250) / 2 : 1000}px !important` }}>
                                        {/* <div style={{ marginTop: `${(Number(currentHeight[i].value) - 250) / 2}px !important` }}> */}
                                        {/* <Stamp height={currentHeight} /> */}
                                    </div>
                                    :
                                    ""
                            }
                        </ReactHeight>
                    </div>
                )) :
                    // <div style={{ textAlign: 'center' }}><LoadingOutlined style={{ fontSize: 40 }} spin size='large' /></div>}
                    <Spin size='large' />
                }
            </div >
            <div>
                <img title="קמפיין חדש" className="imgBtnNewCapmaign" src={plusImg} onClick={createApplyForNewCampaign} />
                <CreateApply />
            </div>
        </div >
    )
}

export default withRouter(AllCampaigns);