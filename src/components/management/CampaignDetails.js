import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Spin, Empty } from 'antd';
import { numberWithCommas } from '../../services/service';

export default function CampaignDetails(props) {

    const campaign = useSelector(state => state.campaignReducer.campaign);
    const [showSpin, setShowSpin] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShowSpin(false)
        }, 2000);
    }, []);

    return (
        <div className="CampaignDetails">
            {campaign ? <div className="row notSelected">
                <div className="col-md-8">
                    <div className="card-body">
                        <h2 className="card-title">{campaign.campaignName}</h2>
                        <h1 className="card-text">{numberWithCommas(campaign.goal)} ₪</h1>
                        <h4 className="card-text">{campaign.purposeOfCollecting}</h4>
                        <h5>{`הקמפיין יהיה פעיל מיום ${campaign.duration[0]} עד ${campaign.duration[1]}`}</h5>
                        <label>{`קמפיין זה שייך לארגון ${campaign.company.companyName}`}</label>
                        <p className="card-text"><small className="text-muted">{`ניתן ליצור קשר ב${campaign.company.phone} או ב ${campaign.company.email}`}</small></p>
                        <Spin style={{ display: showSpin ? 'block' : 'none' }} />
                        {campaign.company.logo ?
                            <img style={{ width: '100%', height: '100%', objectFit: 'contain', display: showSpin ? 'none' : '' }} className="card-img" src={campaign.company.logo} alt="logo" /> :
                            <div style={{ display: showSpin ? 'none' : '' }}  >no company logo</div>}

                    </div>
                </div>
                <div className="col-md-4">
                    <Spin style={{ display: showSpin ? 'block' : 'none' }} />
                    {(campaign.images && campaign.images.length) ?
                        // campaign.images.map(i =>
                        //     <img key={i} style={{ width: '100%', height: '100%', objectFit: 'contain' }} className="card-img" src={i} alt="..." />) : 'no images!'}
                        <img style={{ width: '100%', height: '100%', objectFit: 'contain', display: showSpin ? 'none' : '' }} className="card-img" src={campaign.images[0]} alt="..." /> :
                        <div style={{ display: showSpin ? 'none' : '' }}  >no campaigns images</div>}
                </div>
            </div> : <Empty description='לא קיים מידע על קמפיין חדש ...' image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        </div >
    );

}