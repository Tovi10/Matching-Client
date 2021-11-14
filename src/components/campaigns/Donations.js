import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Row, } from 'antd';


export default function Donations() {

    const campaign = useSelector(state => state.campaignReducer.campaign);
    const [sortedArray, setSortedArray] = useState([]);

    useEffect(() => {
        setSortedArray(campaign.donations.slice().sort((a, b) => b.date - a.date).reverse());
    }, []);

    useEffect(() => {
        setSortedArray(campaign.donations.slice().sort((a, b) => b.date - a.date).reverse());
    }, [campaign]);

    return (
        <div className='Donations'>
            <div style={{ padding: '10px' }}>
                {sortedArray.length ?
                    <Row gutter={[8, 8]}>
                        {sortedArray.map(donation => {
                            return (
                                <Col span={8} key={donation._id} >
                                    <Card style={{ height: '30vh', borderRadius: '15px' }} title={donation.user.name ? donation.user.name : "לא ידוע"} bordered={false}>
                                        <div>{`תרם ${donation.card.sum} ₪ ${donation.card.text}`}</div>
                                        <div>{`בתאריך ${donation.date}`}</div>
                                        {/* {donation && donation.recruiter ? <div>{`ע"י ${donation.recruiter.user.name === undefined ? "לא ידוע" : donation.recruiter.user.name}`}</div> : ""} */}
                                        {donation && donation.recruiter ? <div>{`ע"י ${donation.recruiter.designName}`}</div> : ""}
                                        {/* <div>{`וקבל ${donation.card.gift && donation.card.gift.name}`}</div> */}
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row> : 'אין תרומות עדיין!'}
            </div>
        </div>
    )
}