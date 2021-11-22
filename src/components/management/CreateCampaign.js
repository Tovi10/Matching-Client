import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Form,
    Input,
    Button,
    DatePicker,
    Select,
    Spin,
    Alert,
    Tooltip,
    Modal,
} from 'antd';
import { PlusOutlined, DeleteTwoTone, MinusOutlined, UploadOutlined, } from '@ant-design/icons';
import { firebase } from '../../services/firebase.service';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';
import CampaignDetails from './CampaignDetails';
import '../../styles/createCampaign.css';
import moment from 'moment';

function CreateCampaign() {


    const dispatch = useDispatch();

    const general = useSelector(state => state.generalReducer);
    const campaign = useSelector(state => state.campaignReducer.campaign);
    const company = useSelector(state => state.companyReducer.company);
    const allCompanies = useSelector(state => state.companyReducer.allCompanies);
    const user = useSelector(state => state.userReducer.user);

    const [form] = Form.useForm();
    const [logo, setLogo] = useState(null);
    const [createCompany, setCreateCompany] = useState(false);
    const [spining, setSpining] = useState(false);
    const [uploadErr, setUploadErr] = useState(false);
    const [logoURL, setLogoURL] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [imagesFiles, setImagesFiles] = useState([]);
    const [imagesURLs, setImagesURLs] = useState([]);

    const inputLogoRef = useRef(null);

    useEffect(() => {
        dispatch(actions.getAllGifts());
        dispatch(actions.getAllCompanies());
    }, [])

    useEffect(() => {
        if (general.campaignId) {
            uploadImageToStorage(general.campaignId);
        }
    }, [general.campaignId])

    useEffect(() => {
        if (general.companyId) {
            uploadLogoToStorage(general.companyId);
        }
    }, [general.companyId])

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
        setImagesFiles(imagesFiles.filter(file => file.name !== imagesFiles[key].name))
        setImagesURLs(imagesURLs.filter(img => img !== imagesURLs[key]))
    }

    const removeAll = () => {
        setImagesFiles([]);
        setImagesURLs([]);
    }

    const onFinish = (values) => {
        setSpining(true);
        if (createCompany) {
            dispatch(actions.createCompany(values))
            setCreateCompany(false)
        }
        else {
            const data = { ...values, images: imagesURLs, duration: [moment(values.duration[0].toString()).format("DD/MM/YYYY"), moment(values.duration[1].toString()).format("DD/MM/YYYY")], userId: user._id };
            dispatch(actions.createCampaign(data));
        }
    }

    const uploadImageToStorage = (campaignId) => {
        if (!imagesURLs.length) {
            // maybe move them to the end of the function;
            dispatch(actions.setCampaignId(null));
            setOpenModal(true);
            return;
        };
        let imagePaths = [];
        const storageRef = firebase.storage().ref();
        imagesFiles.map(async img => {
            let fileRef = storageRef.child(`Campaigns/${campaignId}/${img.name}`);
            await fileRef.put(img);
            const singleImgPath = await fileRef.getDownloadURL();
            imagePaths.push(singleImgPath);
            // the end :)
            if (imagePaths.length === imagesFiles.length) {
                const updateCampaign = { ...campaign, images: imagePaths, create: true }
                dispatch(actions.updateCampaign(updateCampaign))
                dispatch(actions.setCampaignId(null));
                setOpenModal(true);
            }
        });
    }

    const uploadLogoToStorage = async (companyId) => {
        if (logo) {
            const storageRef = firebase.storage().ref();
            let fileRef = storageRef.child(`Companies/${companyId}/${Object.entries(logo)[0][1].name}`);
            await fileRef.put(Object.entries(logo)[0][1]);
            const logoImgPath = await fileRef.getDownloadURL();
            // edit compny in server with the logo
            const updateCompany = { ...company, logo: logoImgPath }
            dispatch(actions.updateCompany(updateCompany));
        }
        else {
            dispatch(actions.setCurrentNotification(`החברה נוצרה בהצלחה!`))
        }
        dispatch(actions.setCompanyId(null));
        setLogo(null);
        form.resetFields();
        setLogo(null);
        setLogoURL(null);
        setSpining(false);
    }

    const closeCompaniesSelectDropdown = () => {
        setCreateCompany(!createCompany);
        if (!document.getElementsByClassName('companiesSelectDropdown')[0]) return;
        let selectCls = document.getElementsByClassName('companiesSelectDropdown')[0].classList;
        if (selectCls.length === 3) {
            selectCls.add('ant-select-dropdown-hidden')
        }
    }

    return (
        <div className='CreateCampaign'>
            <Spin size='large' spinning={spining}>
                {/* <div className='createCampaignTxt'>מלא את הפרטים כדי ליצור את הקמפיין הבא...</div> */}
                <Form
                    className='p-3 customForm'
                    wrapperCol={{
                        span: 24,
                    }}
                    form={form}
                    name="createCampaign"
                    onFinish={onFinish}
                >
                    {/* company */}
                    <Form.Item
                        name="company"
                        rules={createCompany ? [] : [
                            {
                                required: true,
                                message: `אנא בחר חברה!`,
                            },
                        ]}
                        style={{ display: 'inline-block', width: 'calc(90% - 8px)' }}
                    >
                        <Select
                            size='large'
                            allowClear
                            showSearch
                            style={{ textAlign: 'right' }}
                            dropdownStyle={{ textAlign: 'right' }}
                            onChange={() => { setCreateCompany(false) }}
                            notFoundContent={<>לא נמצאו נתונים</>}
                            placeholder={`בחר חברה...`}
                            virtual={false}
                            dropdownClassName='companiesSelectDropdown'>
                            {allCompanies && allCompanies.map(item => (
                                <Select.Option key={item._id}>{item.companyName}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item style={{ display: 'inline-block', width: 'calc(10% - 8px)', margin: '0 8px' }}                    >
                        <Tooltip title={createCompany ? `הסר חברה` : `הוסף חברה `}>
                            <Button
                                type='default'
                                size='large'
                                className='d-flex justify-content-center align-items-center '
                                style={{ width: '100%' }}
                                onClick={closeCompaniesSelectDropdown}>
                                {createCompany ? <MinusOutlined /> : <PlusOutlined />}
                            </Button>
                        </Tooltip>
                    </Form.Item>
                    {createCompany ? <>
                        <Form.Item
                            name='companyName'
                            rules={[
                                {
                                    required: true,
                                    message: `אנא הכנס שם חברה!`,
                                },
                            ]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        >
                            <Input
                                size='large'
                                placeholder={`הכנס כאן את שם החברה בו נערך הקמפיין...`} />
                        </Form.Item>
                        {/* managerCompanyName */}
                        <Form.Item
                            name='managerCompanyName'
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                        >
                            <Input
                                size='large'
                                placeholder={`הכנס כאן את שם המנהל של החברה בה נערך הקמפיין...`} />
                        </Form.Item>
                        {/* logo */}
                        <Form.Item
                            name='logo'
                            style={{ display: 'inline-block', width: 'calc(100% - 8px)', marginLeft: '8px' }}
                        >
                            {logo ?
                                <div className='wrapperImgs'>
                                    <DeleteTwoTone twoToneColor="#FAE01A" className='deleteImgIcon' title={`מחק לוגו`} onClick={() => setLogo(null)} />
                                    <img alt='img' src={logoURL} style={{ width: '100%', height: '15vh', objectFit: 'contain' }} />
                                </div> :
                                <div className='btn d-flex justify-content-center uploadLogoDiv'>
                                    <input type='file' accept='image/*' ref={inputLogoRef} className='uploadHiddenInput'
                                        onChange={event => {
                                            setLogo(inputLogoRef.current.files);
                                            setLogoURL(URL.createObjectURL(event.target.files[0]))
                                        }} />
                                    <UploadOutlined className='plusIcon' />
                                    <div>בחר לוגו לחברה</div>
                                </div>}
                        </Form.Item>
                        {/* phone */}
                        <Form.Item
                            name='phone'
                            rules={[
                                {
                                    required: true,
                                    message: `אנא הכנס טלפון חברה!`,
                                },
                            ]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        >
                            <Input
                                size='large'
                                placeholder={`הכנס כאן מספר טלפון ליצירת קשר בחברה שלך...`}
                                className='formItemInput'
                            />
                        </Form.Item>
                        {/* email */}
                        <Form.Item
                            name='email'
                            rules={[
                                {
                                    type: 'email',
                                    message: `מייל לא תקין!`,
                                },
                                {
                                    required: true,
                                    message: `אנא הכנס מייל חברה!`,
                                },
                            ]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                        >
                            <Input
                                size='large'
                                placeholder={`הכנס כאן כתובת מייל ליצירת קשר בחברה שלך...`} />
                        </Form.Item>
                    </> :
                        <>
                            {/* campaign */}
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
                                style={{ display: 'inline-block', width: 'calc(100% - 8px)', marginLeft: '8px' }}
                            >
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
                        </>}
                    {/* submit */}
                    <Form.Item
                        style={{ display: 'inline-block', width: 'calc(100% - 8px)', marginLeft: '8px' }}
                        className='submitFormItem'>
                        <Button size='large' type="primary" htmlType="submit" className='btnSubmit'>
                            {createCompany ? `יצירת חברה` : `יצירת קמפיין`}
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
            <Modal footer={false} title='קמפיין חדש' visible={openModal} onCancel={() => { setOpenModal(false); setSpining(false); form.resetFields(); removeAll(); }} centered={true} width={1000}>
                <CampaignDetails />
            </Modal>
        </div >
    );
};


export default withRouter(CreateCampaign);
