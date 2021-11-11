import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Applies from './Applies';
import CampaignsManagment from './CampaignsManagment';
import CardsManagment from './CardsManagment';
import GiftsManagment from './GiftsManagment';
import RecruitersManagment from './RecruitersManagment';
import { actions } from '../../redux/actions';


const { TabPane } = Tabs;


export default function BaseManagement() {

    const dispatch = useDispatch();

    const admin = useSelector(state => state.userReducer.admin);
    const allCampaigns = useSelector(state => state.campaignReducer.allCampaigns);
    
    useEffect(() => {
        if (!allCampaigns && admin)
            dispatch(actions.getAllCampaigns())
    }, [])

    return (
        <div className='BaseManagement'>
            <Tabs defaultActiveKey="1" tabPosition='left'>
                <TabPane tab="קמפיינים" key="1">
                    <CampaignsManagment />
                </TabPane>
                <TabPane tab="כרטיסים" key="2">
                    <CardsManagment />
                </TabPane>
                <TabPane tab="מגייסים" key="3">
                    <RecruitersManagment />
                </TabPane>
                {admin &&
                    <>
                        <TabPane tab="מתנות" key="4">
                            <GiftsManagment />
                        </TabPane>
                        <TabPane tab="בקשות" key="5">
                            <Applies />
                        </TabPane>
                    </>}
            </Tabs>
        </div>
    )
}