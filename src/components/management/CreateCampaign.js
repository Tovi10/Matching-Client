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
                const updateCampaign = { ...campaign, images: imagePaths, create: true}
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
            dispatch(actions.setCurrentNotification(`?????????? ?????????? ????????????!`))
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
            <div className={`wrapForm mt-2`}>
                <Spin size='large' spinning={spining}>
                    <div className='createCampaignTxt'>?????? ???? ???????????? ?????? ?????????? ???? ?????????????? ??????...</div>
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
                                    message: `?????? ?????? ????????!`,
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
                                notFoundContent={<>???? ?????????? ????????????</>}
                                placeholder={`?????? ????????...`}
                                virtual={false}
                                dropdownClassName='companiesSelectDropdown'>
                                {allCompanies && allCompanies.map(item => (
                                    <Select.Option key={item._id}>{item.companyName}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item style={{ display: 'inline-block', width: 'calc(10% - 8px)', margin: '0 8px' }}                    >
                            <Tooltip title={createCompany ? `?????? ????????` : `???????? ???????? `}>
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
                                        message: `?????? ???????? ???? ????????!`,
                                    },
                                ]}
                                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                            >
                                <Input
                                    size='large'
                                    placeholder={`???????? ?????? ???? ???? ?????????? ???? ???????? ??????????????...`} />
                            </Form.Item>
                            {/* managerCompanyName */}
                            <Form.Item
                                name='managerCompanyName'
                                style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                            >
                                <Input
                                    size='large'
                                    placeholder={`???????? ?????? ???? ???? ?????????? ???? ?????????? ???? ???????? ??????????????...`} />
                            </Form.Item>
                            {/* logo */}
                            <Form.Item
                                name='logo'
                                style={{ display: 'inline-block', width: 'calc(100% - 8px)', marginLeft: '8px' }}
                            >
                                {logo ?
                                    <div className='wrapperImgs'>
                                        <DeleteTwoTone twoToneColor="#5ddf5d" className='deleteImgIcon' title={`?????? ????????`} onClick={() => setLogo(null)} />
                                        <img alt='img' src={logoURL} style={{ width: '100%', height: '15vh', objectFit: 'contain' }} />
                                    </div> :
                                    <div className='btn d-flex justify-content-center uploadLogoDiv'>
                                        <input type='file' accept='image/*' ref={inputLogoRef} className='uploadHiddenInput'
                                            onChange={event => {
                                                setLogo(inputLogoRef.current.files);
                                                setLogoURL(URL.createObjectURL(event.target.files[0]))
                                            }} />
                                        <UploadOutlined className='plusIcon' />
                                        <div>?????? ???????? ??????????</div>
                                    </div>}
                            </Form.Item>
                            {/* phone */}
                            <Form.Item
                                name='phone'
                                rules={[
                                    {
                                        required: true,
                                        message: `?????? ???????? ?????????? ????????!`,
                                    },
                                ]}
                                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                            >
                                <Input
                                    size='large'
                                    placeholder={`???????? ?????? ???????? ?????????? ???????????? ?????? ?????????? ??????...`}
                                    className='formItemInput'
                                />
                            </Form.Item>
                            {/* email */}
                            <Form.Item
                                name='email'
                                rules={[
                                    {
                                        type: 'email',
                                        message: `???????? ???? ????????!`,
                                    },
                                    {
                                        required: true,
                                        message: `?????? ???????? ???????? ????????!`,
                                    },
                                ]}
                                style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                            >
                                <Input
                                    size='large'
                                    placeholder={`???????? ?????? ?????????? ???????? ???????????? ?????? ?????????? ??????...`} />
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
                                            message: `?????? ???????? ???? ????????????!`,
                                        },
                                    ]}
                                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                                >
                                    <Input size='large'
                                        placeholder={`???????? ?????? ???? ?????? ?????????????? ??????...`} />
                                </Form.Item>
                                {/* goal */}
                                <Form.Item
                                    name="goal"
                                    rules={[
                                        {
                                            required: true,
                                            message: `?????? ???????? ?????? ??????????????!`,
                                        },
                                    ]}
                                    style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                                >
                                    <Input size='large'
                                        type='number' className='formItemInput' placeholder={`???????? ?????? ???? ???????? ?????????????? ??????...`} />
                                </Form.Item>
                                {/* purposeOfCollecting */}
                                <Form.Item
                                    name="purposeOfCollecting"
                                    rules={[
                                        {
                                            required: true,
                                            message: `???????? ???????? ??????????????!`,
                                        },
                                        {
                                            max: 300,
                                            message: `???????? ???????? ?????????????? ???? 300 ??????????!`,
                                        },
                                        {
                                            min: 50,
                                            message: `???????? ???????? ?????????????? ?????????????? 50 ??????????!`,
                                        },
                                    ]}
                                    style={{ display: 'inline-block', width: 'calc(100% - 8px)', marginLeft: '8px' }}
                                >
                                    <Input.TextArea size='large' rows={4} placeholder={`?????? ?????? ???? ?????????? ???? ?????????????? ??????...`} />
                                </Form.Item>
                                {/* duration */}
                                <Form.Item
                                    name="duration"
                                    rules={[
                                        {
                                            required: true,
                                            message: `?????? ?????????? ?????????? ?????????? ??????????????!`,
                                        },
                                    ]}
                                    style={{ display: 'inline-block', width: 'calc(100% - 8px)', marginLeft: '8px' }}
                                >
                                    <DatePicker.RangePicker
                                        format='DD/MM/YYYY'
                                        placeholder={['?????????? ??????????', '?????????? ????????']}
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
                                //         message: `???????? ?????????????? 5 ????????????!`,
                                //     },
                                // ]}
                                >
                                    {/* limit num og images to 5 */}
                                    {imagesFiles.length < 5 &&
                                        <div className='btn mb-2 d-flex justify-content-center uploadLogoDiv'>
                                            <input type='file' accept='image/*' multiple={true}
                                                onChange={e => uploadImage(e)} className='uploadHiddenInput' />
                                            <UploadOutlined className='plusIcon' />
                                            <div>?????? ???????????? ??????????????</div>
                                        </div>}
                                    <div className='d-flex align-items-center justify-content-around'>
                                        {imagesURLs.length ? imagesURLs.map((i, key) => (
                                            <div key={key} className='wrapperImgs' >
                                                <DeleteTwoTone twoToneColor="#5ddf5d" className='deleteImgIcon' title={`?????? ??????????`} onClick={() => removeImage(key)} />
                                                <img alt='img' src={i} style={{ width: '100%', height: '20vh', objectFit: 'contain' }} />
                                            </div>
                                        )) : ''}
                                    </div>
                                    {imagesURLs.length ? <div onClick={removeAll}>?????? ??????</div> : ''}
                                    {uploadErr && <Alert
                                        style={{ width: 'calc(100% - 8px)', margin: '10px 0 0 8px' }}
                                        message="???????? ?????????????? 5 ????????????!" type="error" closable />}
                                </Form.Item>
                            </>}
                        {/* submit */}
                        <Form.Item
                            style={{ display: 'inline-block', width: 'calc(100% - 8px)', marginLeft: '8px' }}
                            className='submitFormItem'>
                            <Button size='large' type="primary" htmlType="submit" className='btnSubmit'>
                                {createCompany ? `?????????? ????????` : `?????????? ????????????`}
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </div >
            <Modal footer={false} title='???????????? ??????' visible={openModal} onCancel={() => { setOpenModal(false); setSpining(false); form.resetFields(); removeAll(); }} centered={true} width={1000}>
                <CampaignDetails />
            </Modal>
        </div >
    );
};


export default withRouter(CreateCampaign);
