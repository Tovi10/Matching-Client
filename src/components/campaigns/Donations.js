import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Row } from 'antd';


export default function Donations() {

    const campaign = useSelector(state => state.campaignReducer.campaign);

    return (
        <div className='Donations' style={{ background: '#ace5ac', padding: '10px' }}>
            <Row gutter={[8, 8]}>
                {campaign.donations && campaign.donations.map(donation => {
                    return (
                        <Col span={8} key={donation._id} >
                            <Card title={donation.user.name} bordered={false}>
                                <div>{`תרם ${donation.card.text}`}</div>
                                <div>{`בתאריך ${donation.date}`}</div>
                                <div>{`וקבל ${donation.card.gift&&donation.card.gift.name}`}</div>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}