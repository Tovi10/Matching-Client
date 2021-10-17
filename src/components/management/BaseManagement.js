import React from 'react';
import { Tabs } from 'antd';
import CreateCampaign from './CreateCampaign';
import CreateCard from './CreateCard';
import CreateGift from './CreateGift';
import CreateRecruiter from './CreateRecruiter';
import Applies from './Applies';


const { TabPane } = Tabs;


export default function BaseManagement() {

    return (
        <div className='BaseManagement'>
            <Tabs defaultActiveKey="1" tabPosition='left'>
                <TabPane tab="יצירת קמפיין" key="1">
                    <CreateCampaign />
                </TabPane>
                <TabPane tab="הוסף כרטיס" key="2">
                    <CreateCard />
                </TabPane>
                <TabPane tab="הוסף מתנה" key="3">
                    <CreateGift />
                </TabPane>
                <TabPane tab="הוסף מגייס" key="4">
                    <CreateRecruiter />
                </TabPane>
                <TabPane tab="בקשות" key="5">
                    <Applies />
                </TabPane>
            </Tabs>
        </div>
    )
}