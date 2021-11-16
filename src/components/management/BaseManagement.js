import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Applies from './Applies';
import CampaignsManagment from './CampaignsManagment';
import CardsManagment from './CardsManagment';
import GiftsManagment from './GiftsManagment';
import RecruitersManagment from './RecruitersManagment';
import { actions } from '../../redux/actions';
import { withRouter } from 'react-router';
import { numberWithCommas } from '../../services/service';


const { TabPane } = Tabs;


function BaseManagement(props) {

    const { history } = props;
    const dispatch = useDispatch();
    const admin = useSelector(state => state.userReducer.admin);
    const allCampaigns = useSelector(state => state.campaignReducer.allCampaigns);

    useEffect(() => {
        if (!allCampaigns && admin)
            dispatch(actions.getAllCampaigns())
    }, [])

    const selectManage = (e) => {
        const indexManageRoute = ["campaigns", "cards", "recruiters", "gifts", "applies"]
        history.push(`/management/${indexManageRoute[Number(e)]}`);
    }

    return (
        <div className='BaseManagement'>
            <Tabs defaultActiveKey="0" tabPosition='left' onChange={e => selectManage(e)} className='clrWhite' animated={false} >
                <TabPane tab="קמפיינים" key="0">
                    <CampaignsManagment />
                </TabPane>
                <TabPane tab="כרטיסים" key="1" >
                    <CardsManagment />
                </TabPane>
                <TabPane tab="מגייסים" key="2">
                    <RecruitersManagment />
                </TabPane>
                {admin &&
                    <>
                        <TabPane tab="מתנות" key="3" >
                            <GiftsManagment />
                        </TabPane>
                        <TabPane tab="בקשות" key="4" >
                            <Applies />
                        </TabPane>
                    </>}
            </Tabs>
        </div>
    )
}

export default withRouter(BaseManagement);