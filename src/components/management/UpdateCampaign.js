import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';
import {
    Form,
    Input,
    Button,
    DatePicker,
    Select,
    Alert,
    Spin,
} from 'antd';
import { DeleteTwoTone, UploadOutlined, } from '@ant-design/icons';
import moment from 'moment';
import { firebase } from '../../services/firebase.service';


export default function UpdateCampaign() {

    const dispatch = useDispatch();
    const allCampaigns = useSelector(state => state.campaignReducer.allCampaigns);
    const user = useSelector(state => state.userReducer.user);
    const admin = useSelector(state => state.userReducer.admin);
    const currentNotification = useSelector(state => state.generalReducer.currentNotification);

    const [form] = Form.useForm();
    const [campaign, setCampaign] = useState(null);
    const [spining, setSpining] = useState(false);
    const [imagesFiles, setImagesFiles] = useState([]);
    const [imagesURLs, setImagesURLs] = useState([]);
    const [uploadErr, setUploadErr] = useState(false);

    useEffect(() => {
        setSpining(false)
        if (currentNotification === 'הקמפיין התעדכן בהצלחה!' && campaign) {
            form.resetFields();
            setCampaign(null);
            setImagesFiles([]);
            setImagesURLs([]);
        }
    }, [currentNotification])


    const onFinish = (values) => {
        setSpining(true);
        uploadImageToStorage(values);
    };

    const choose = (campaignId) => {
        const campaignObj = allCampaigns.find(c => c._id === campaignId);
        setCampaign(campaignObj)
        if (!campaignObj) return
        setImagesURLs(campaignObj.images)
        setImagesFiles(campaignObj.images)
        form.setFieldsValue({
            ...campaignObj,
            duration: [moment(campaignObj.duration[0], 'DD/MM/YYYY'), moment(campaignObj.duration[1], 'DD/MM/YYYY')]
        });
    }
    const uploadImage = (event) => {
        setUploadErr(false);
        let imgs = [...imagesURLs], files = [...imagesFiles], index = imagesURLs.length;
        for (const [key, value] of Object.entries(event.target.files)) {
            if (index === 5) {
                setUploadErr(true);
                break;
            }
            index++;
            // display images in <img/>
            imgs.push(URL.createObjectURL(value));
            files.push(value);
        }
        setImagesURLs(imgs);
        setImagesFiles(files)
    }

    const removeImage = (key) => {
        if (!imagesFiles[key].name)
            setImagesFiles(imagesFiles.filter(file => file !== imagesFiles[key]))
        else
            setImagesFiles(imagesFiles.filter(file => file.name !== imagesFiles[key].name))
        setImagesURLs(imagesURLs.filter(img => img !== imagesURLs[key]))
    }

    const removeAll = () => {
        setImagesFiles([]);
        setImagesURLs([]);
    }

    const deleteFilesFromFirebase = async (images) => {
        let fileRef;
        for (let index = 0; index < images.length; index++) {
            fileRef = await firebase.storage().refFromURL(images[index]);
            fileRef.delete().then(function () {
                console.log("File Deleted")
            }).catch(function (error) {
            });
        }
    }
    const uploadImageToStorage = async (values) => {
        let imagePaths = [];
        if (!imagesURLs.length && campaign.images.length) {
            // delete images from folder in firebase
            await deleteFilesFromFirebase(campaign.images);
            // updtae in server
            dispatch(actions.updateCampaign({ ...campaign, ...values, duration: [moment(values.duration[0].toString()).format("DD/MM/YYYY"), moment(values.duration[1].toString()).format("DD/MM/YYYY")], images: [] }));
            return;
        };

        let toDeleteArray = [], toUploadArray = []
        for (let index = 0; index < campaign.images.length; index++) {
            if (imagesURLs.includes(campaign.images[index])) {
                imagePaths.push(campaign.images[index]);
            }
            else {
                toDeleteArray.push(campaign.images[index]);
            }
        }
        for (let index = 0; index < imagesURLs.length; index++) {
            if (!campaign.images.includes(imagesURLs[index])) {
                toUploadArray.push(imagesFiles[index]);
            }
        }
        // delete from firebase what deleted here
        await deleteFilesFromFirebase(toDeleteArray);
        if (!toUploadArray.length) {
            const updateCampaign = { ...campaign, ...values, duration: [moment(values.duration[0].toString()).format("DD/MM/YYYY"), moment(values.duration[1].toString()).format("DD/MM/YYYY")], images: imagePaths }
            dispatch(actions.updateCampaign(updateCampaign));
            // setSpining(false);
        }
        // upload the news
        const storageRef = firebase.storage().ref();
        toUploadArray.map(async img => {
            let fileRef = storageRef.child(`Campaigns/${campaign._id}/${img.name}`);
            await fileRef.put(img);
            const singleImgPath = await fileRef.getDownloadURL();
            imagePaths.push(singleImgPath);
            // the end :)
            if (imagePaths.length === imagesFiles.length) {
                const updateCampaign = { ...campaign, ...values, duration: [moment(values.duration[0].toString()).format("DD/MM/YYYY"), moment(values.duration[1].toString()).format("DD/MM/YYYY")], images: imagePaths }
                dispatch(actions.updateCampaign(updateCampaign));
                // setSpining(false);

            }
        });
    }


    return (
        <div className='UpdateCampaign'>
            <Spin size='large' spinning={spining}>
                <div>
                    <Select
                        size='large'
                        allowClear
                        showSearch
                        style={{ textAlign: 'right' }}
                        dropdownStyle={{ textAlign: 'right' }}
                        onChange={choose}
                        onClear={()=>{form.resetFields();removeAll()}}
                        notFoundContent={<>לא נמצאו נתונים</>}
                        placeholder={`בחר קמפיין...`}
                        virtual={false}
                        dropdownClassName='companiesSelectDropdown'>
                        {admin ? (allCampaigns && allCampaigns.map(item => (
                            !item.goalRaised && <Select.Option key={item._id}>{item.campaignName}</Select.Option>
                        ))) : (user.campaigns && user.campaigns.map(item => (
                            !item.goalRaised && <Select.Option key={item._id}>{item.campaignName}</Select.Option>
                        )))}
                    </Select>
                    <Form
                        className='p-3 customForm'
                        wrapperCol={{
                            span: 24,
                        }}
                        form={form}
                        name="campaign"
                        onFinish={onFinish}
                    >
                        {/* campaignName */}
                        <Form.Item
                            name="campaignName"
                            rules={[
                                {
                                    required: true,
                                    message: `אנא הכנס שם קמפיין!`,
                                },
                            ]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        >
                            <Input size='large'
                                placeholder={`הכנס כאן את השם לקמפיין שלך...`} />
                        </Form.Item>
                        {/* goal */}
                        <Form.Item
                            name="goal"
                            rules={[
                                {
                                    required: true,
                                    message: `אנא הכנס יעד לקמפיין!`,
                                },
                            ]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                        >
                            <Input size='large'
                                type='number' className='formItemInput' placeholder={`הכנס כאן את היעד לקמפיין שלך...`} />
                        </Form.Item>
                        {/* purposeOfCollecting */}
                        <Form.Item
                            name="purposeOfCollecting"
                            rules={[
                                {
                                    required: true,
                                    message: `הכנס מטרה לקמפיין!`,
                                },
                                {
                                    max: 300,
                                    message: `הכנס מטרה לקמפיין עד 300 תווים!`,
                                },
                                {
                                    min: 50,
                                    message: `הכנס מטרה לקמפיין מינימום 50 תווים!`,
                                },
                            ]}
                            style={{ display: 'inline-block', width: 'calc(100% - 8px)', marginLeft: '8px' }}                                >
                            <Input.TextArea size='large' rows={4} placeholder={`פרט כאן על המטרה של הקמפיין שלך...`} />
                        </Form.Item>
                        {/* duration */}
                        <Form.Item
                            name="duration"
                            rules={[
                                {
                                    required: true,
                                    message: `בחר תאריך התחלה וסיום לקמפיין!`,
                                },
                            ]}
                            style={{ display: 'inline-block', width: 'calc(100% - 8px)', marginLeft: '8px' }}
                        >
                            <DatePicker.RangePicker
                                format='DD/MM/YYYY'
                                placeholder={['תאריך התחלה', 'תאריך סיום']}
                                direction='rtl'
                                showNow={true}
                                size='large'
                                className='formItemInput' />
                        </Form.Item>
                        {/* images */}
                        <Form.Item
                            name="images"
                            style={{ display: 'inline-block', width: 'calc(100% - 8px)', marginLeft: '8px' }}
                        // rules={[
                        //     {
                        //         required: uploadErr,
                        //         message: `העלה מקסימום 5 תמונות!`,
                        //     },
                        // ]}
                        >
                            {/* limit num og images to 5 */}
                            {imagesFiles.length < 5 &&
                                <div className='btn mb-2 d-flex justify-content-center uploadLogoDiv'>
                                    <input type='file' accept='image/*' multiple={true}
                                        onChange={e => uploadImage(e)} className='uploadHiddenInput' />
                                    <UploadOutlined className='plusIcon' />
                                    <div>בחר תמונות לקמפיין</div>
                                </div>}
                            <div className='d-flex align-items-center justify-content-around'>
                                {imagesURLs.length ? imagesURLs.map((i, key) => (
                                    <div key={key} className='wrapperImgs' >
                                        <DeleteTwoTone twoToneColor="#FAE01A" className='deleteImgIcon' title={`מחק תמונה`} onClick={() => removeImage(key)} />
                                        <img alt='img' src={i} style={{ width: '100%', height: '20vh', objectFit: 'contain' }} />
                                    </div>
                                )) : ''}
                            </div>
                            {imagesURLs.length ? <div onClick={removeAll}>מחק הכל</div> : ''}
                            {uploadErr && <Alert
                                style={{ width: 'calc(100% - 8px)', margin: '10px 0 0 8px' }}
                                message="העלה מקסימום 5 תמונות!" type="error" closable />}
                        </Form.Item>
                        {/* submit */}
                        <Form.Item
                            style={{ display: 'inline-block', width: 'calc(100% - 8px)', marginLeft: '8px' }}
                            className='submitFormItem'>
                            <Button size='large' type="primary" htmlType="submit" className='btnSubmit'>
                                SAVE                    </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Spin>
        </div>
    )
}