import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Row, } from 'antd';


export default function Recruiters() {

    const campaign = useSelector(state => state.campaignReducer.campaign);

    return (
        <div className='Recruiters'>
            <div style={{ background: '#ace5ac', padding: '10px' }}>
                {campaign.recruiters.length ?
                    <Row gutter={[8, 8]}>
                        {campaign.recruiters.map(recruiter => {
                            return (
                                <Col style={{ cursor: 'pointer' }} span={8} key={recruiter._id} onClick={() => recruiter.link ? window.open(recruiter.link, "_blank") : ""}>
                                    <Card style={{ height: '26vh' }} title={recruiter.designName === undefined ? 'לא ידוע' : recruiter.designName} bordered={false}>
                                        <div>{`לקח על עצמו ${recruiter.sum} ש"ח`}</div>
                                        <div>{`ואסף ${recruiter.sumRaised === undefined ? 0 : recruiter.sumRaised}`}</div>
                                        {recruiter.sumRaised > recruiter.sum ? <b style={{ backgroundColor: "yellow" }}>הגיע ליעד!!</b> : ""}
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row> : 'אין מגייסים עדיין!'}
            </div>
        </div>

    )
}