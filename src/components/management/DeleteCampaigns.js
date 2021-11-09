import React, { useEffect, useState } from 'react';
import { Table, Button, Spin, Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';
import { firebase } from '../../services/firebase.service';
import moment from 'moment';

export default function DeleteCampaigns() {

    const dispatch = useDispatch();
    const allCampaigns = useSelector(state => state.campaignReducer.allCampaigns);
    const user = useSelector(state => state.userReducer.user);
    const admin = useSelector(state => state.userReducer.admin);


    const [campaigns, setCampaigns] = useState([]);


    useEffect(() => {
        if (!allCampaigns & admin)
            dispatch(actions.getAllCampaigns())
    }, [])

    useEffect(() => {
        if (!allCampaigns) return;
        setCampaigns(allCampaigns.filter(c => !c.goalRaised))
    }, [allCampaigns]);

    const deleteFilesFromFirebase = async (images) => {
        let fileRef;
        for (let index = 0; index < images.length; index++) {
            fileRef = await firebase.storage().refFromURL(images[index]);
            fileRef.delete().then(function () {
                console.log("File Deleted")
            }).catch(function (error) {
                console.log("🚀 ~ file: DeleteCampaigns.js ~ err with delete img of campaign ~ error", error)
            });
        }
    }
    const confirm = async (campaignId) => {
        console.log("🚀 ~ file: DeleteCampaigns.js ~ line 19 ~ confirm ~ campaignId", campaignId)
        let campaign;
        if (admin)
            campaign = allCampaigns.find(c => c._id === campaignId);
        else
            campaign = user.campaigns.find(c => c._id === campaignId);
        // delete images from firebase
        deleteFilesFromFirebase(campaign.images);
        // delete campaigns from server
        dispatch(actions.deleteCampaign({ campaignId, userId: user._id }));
    }

    const columns = [
        {
            title: '',
            dataIndex: '',
            render: (campaign) =>
                <Popconfirm
                    title="האם אתה בטוח שאתה רוצה למחוק?"
                    onConfirm={() => confirm(campaign._id)}
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
            title: 'תאריך',
            dataIndex: 'duration',
            render: (text) => <div>{`${text[0]}-${text[1]}`}</div>,
            align: 'right',
        }, {
            title: 'יעד',
            dataIndex: 'goal',
            render: (text) => <div>{text} ש"ח</div>,
            align: 'right',
            className: 'rtlColumn'
        }, {
            title: 'מטרה',
            dataIndex: 'purposeOfCollecting',
            ellipsis: true,
            align: 'right',
            width: '35%',
            className: 'rtlColumn'
        }, {
            title: 'חברה',
            dataIndex: 'company',
            render: (text) => (text.companyName),
            align: 'right',
        }, {
            title: 'שם',
            dataIndex: 'campaignName',
            align: 'right',
            className: 'rtlColumn'
        },


    ];
    return (
        <div className='DeleteCampaigns'>
            <h6>כאן מוצגים רק הקמפיינים שעוד לא תרמו להם</h6>
            <Spin size='large' spinning={!campaigns}>
                <Table dataSource={campaigns} columns={columns}
                    rowKey={campaign => campaign._id}
                    pagination={{ position: ['bottomLeft', 'none'] }}
                    style={{ direction: 'ltr' }} />
            </Spin>
        </div>
    )
}