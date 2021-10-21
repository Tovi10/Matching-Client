import React from 'react';
import { Tabs } from 'antd';
import CreateCampaign from './CreateCampaign';
import CreateCard from './CreateCard';
import CreateGift from './CreateGift';
import CreateRecruiter from './CreateRecruiter';
import Applies from './Applies';
import { useSelector } from 'react-redux';
import Campaigns from './Campaigns';


const { TabPane } = Tabs;


export default function BaseManagement() {

    const admin = useSelector(state => state.userReducer.admin);

    return (
        <div className='BaseManagement'>
            <Tabs defaultActiveKey="1" tabPosition='left'>
                <TabPane tab="יצירת קמפיין" key="1">
                    <CreateCampaign />
                </TabPane>
                <TabPane tab="הוסף מגייס" key="2">
                    <CreateRecruiter />
                </TabPane>
                {admin &&
                    <>
                        <TabPane tab="הוסף מתנה" key="3">
                            <CreateGift />
                        </TabPane>
                        <TabPane tab="הוסף כרטיס" key="4">
                            <CreateCard />
                        </TabPane>
                        <TabPane tab="בקשות" key="5">
                            <Applies />
                        </TabPane>
                        <TabPane tab="קמפיינים" key="6">
                            <Campaigns />
                        </TabPane>
                    </>}
            </Tabs>
        </div>
    )
}