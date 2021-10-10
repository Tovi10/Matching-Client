import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Progress, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { actions } from '../../redux/actions';
import { numberWithCommas } from '../../services/service';

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


    return (
        // <div className='AllCampaigns container'>
        //     <div className='row d-flex justify-content-center'>
        //         {allCampaigns ? allCampaigns.map(campaign => (
        //             <div className="col-3 m-3 card comapaignCard" key={campaign._id} onClick={() => { selectCampaign(campaign) }}>
        <div className='AllCampaigns container-fluid'>
            <div className="card-columns">
                {allCampaigns ? allCampaigns.map(campaign => (
                    <div className="m-3 card comapaignCard" key={campaign._id} onClick={() => { selectCampaign(campaign) }}>
                        <h5 className="campaignName card-title">{campaign.campaignName}</h5>
                        <Spin style={{ display: showSpin ? 'block' : 'none' }} />
                        {(campaign.company && campaign.company.logo) ?
                            <img style={{ width: "50%", display: showSpin ? 'none' : '' }} src={campaign.company.logo} className="card-img-top" alt="..." /> :
                            <div style={{ display: showSpin ? 'none' : '' }} className="card-img-top" >no company logo</div>}
                        <div className="card-body">
                            <p className="card-text">{campaign.purposeOfCollecting}</p>
                            <b className="goal" >יעד הקמפיין: {numberWithCommas(campaign.goal)} ש"ח</b>
                            {campaign.goal ? <Progress percent={Math.round(100 / campaign.goal * campaign.goalRaised)} /> : <Progress percent={0} />}
                        </div>
                    </div>
                )) :
                    // <div style={{ textAlign: 'center' }}><LoadingOutlined style={{ fontSize: 40 }} spin size='large' /></div>}
                    <Spin size='large' />}
            </div>
        </div >
    )
}

export default withRouter(AllCampaigns);