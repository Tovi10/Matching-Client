import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Row, } from 'antd';


export default function Recruiters() {

    const campaign = useSelector(state => state.campaignReducer.campaign);

    return (
        <div className='Recruiters'>
            {campaign.recruiters.length ?
                <div style={{ background: '#ace5ac', padding: '10px' }}>
                    <Row gutter={[8, 8]}>
                        {campaign.recruiters.map(recruiter => {
                            return (
                                <Col span={8} key={recruiter._id} >
                                    <Card title={recruiter.user.name} bordered={false}>
                                        <div>{`לקח על עצמו ${recruiter.sum} ש"ח`}</div>
                                        <div>{`ואסף ${recruiter.sumRaised}`}</div>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                </div> : ''}
        </div>

    )
}