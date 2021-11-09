import React, { useEffect, useState } from 'react';
import { Table, Button, Spin, Popconfirm, Form, Select, Tooltip, Avatar, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';
import { firebase } from '../../services/firebase.service';
import moment from 'moment';

export default function DeleteRecruiters() {

    const dispatch = useDispatch();
    const allCampaigns = useSelector(state => state.campaignReducer.allCampaigns);
    const user = useSelector(state => state.userReducer.user);
    const admin = useSelector(state => state.userReducer.admin);

    const [form] = Form.useForm();

    const [recruiters, setRecruiters] = useState();
    const [campaign, setCampaign] = useState(null);


    useEffect(() => {
        if (!allCampaigns & admin)
            dispatch(actions.getAllCampaigns())
    }, [])

    useEffect(() => {
        if (campaign) {
            const campaignObj = allCampaigns.find(c => c._id === campaign._id);
            console.log("🚀 ~ file: DeleteRecruiters.js ~ line 29 ~ useEffect ~ campaignObj", campaignObj)
            setCampaign(campaignObj);
            setRecruiters(campaignObj.recruiters.filter(r => !r.sumRaised));
        }
    }, [allCampaigns])

    const choose = (campaignId) => {
        const campaignObj = allCampaigns.find(c => c._id === campaignId);
        console.log("🚀 ~ file: DeleteRecruiters.js ~ line 31 ~ choose ~ campaignObj", campaignObj)
        setCampaign(campaignObj);
        if (campaignObj)
            setRecruiters(campaignObj.recruiters.filter(r => !r.sumRaised));
    }
    const confirm = async (recruiterId) => {
        console.log("🚀 ~ file: DeleteRecruiters.js ~ line 45 ~ confirm ~ recruiterId", recruiterId)
        // delete recruiter from server
        dispatch(actions.deleteRecruiter(recruiterId));
    }

    const columns = [
        {
            title: '',
            dataIndex: '',
            render: (recruiter) =>
                <Popconfirm
                    title="האם אתה בטוח שאתה רוצה למחוק?"
                    onConfirm={() => confirm(recruiter._id)}
                    okText="כן"
                    cancelText="לא"
                    style={{ direction: 'ltr' }}
                    icon={null}
                >
                    <Button >מחק!</Button>
                </Popconfirm>,
            className: 'rtlColumn',
            align: 'left',
        }, {
            title: 'סכום',
            dataIndex: 'sum',
            align: 'right',
        }, {
            title: 'שם מגייס',
            dataIndex: 'designName',
            align: 'right',
            className: 'rtlColumn'
            // }, {
            //     title: 'משתמש',
            //     dataIndex: 'user',
            //     render: (user) =>
            //         <Tooltip className='pointer' title={user.name}>
            //             <Avatar>{user.name[0]}</Avatar>
            //         </Tooltip>,
            //     align: 'center',
        },
    ];
    return (
        <div className='DeleteRecruiters'>
            <h6>כאן מוצגים רק המגייסים שעוד לא תרמו להם</h6>
            <Form
                wrapperCol={{
                    span: 20,
                }}
                form={form}>
                {/* campaign */}
                <Form.Item
                    name="campaign"
                    rules={[
                        {
                            required: true,
                            message: `אנא בחר קמפיין!`,
                        },
                    ]}
                >
                    <Select
                        allowClear
                        showSearch
                        onChange={choose}
                        style={{ textAlign: 'right' }}
                        dropdownStyle={{ textAlign: 'right' }}
                        notFoundContent={<>לא נמצאו נתונים</>}
                        placeholder={`בחר קמפיין...`} >
                        {admin ? (allCampaigns && allCampaigns.map(item => (
                            <Select.Option key={item._id}>{item.campaignName}</Select.Option>
                        ))) : (user.campaigns && user.campaigns.map(item => (
                            <Select.Option key={item._id}>{item.campaignName}</Select.Option>
                        )))}
                    </Select>
                </Form.Item>
            </Form>
            <Spin size='large' spinning={!recruiters}>
                <Table dataSource={recruiters} columns={columns}
                    rowKey={recruiter => recruiter._id}
                    pagination={{ position: ['bottomLeft', 'none'] }}
                    style={{ direction: 'ltr' }} />
            </Spin>
        </div>
    )
}