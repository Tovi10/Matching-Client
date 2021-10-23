import React from 'react';
import { Tabs } from 'antd';
import CreateCard from './CreateCard';
import CreateRecruiter from './CreateRecruiter';
import Applies from './Applies';
import { useSelector } from 'react-redux';
import Campaigns from './UpdateCampaign';
import CampaignsManagment from './CampaignsManagment';
import CardsManagment from './CardsManagment';
import GiftsManagment from './GiftsManagment';
import RecruitersManagment from './RecruitersManagment';


const { TabPane } = Tabs;


export default function BaseManagement() {

    const admin = useSelector(state => state.userReducer.admin);

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