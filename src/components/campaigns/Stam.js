import React, { useEffect, useState } from 'react';
import { Form, Alert,Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { DeleteTwoTone, UploadOutlined, } from '@ant-design/icons';
import { firebase } from '../../services/firebase.service';
import { actions } from '../../redux/actions';


export default function Stam() {

    const dispatch = useDispatch();
    const campaign = useSelector(state => state.campaignReducer.campaign)
    const [imagesFiles, setImagesFiles] = useState([]);
    const [imagesURLs, setImagesURLs] = useState([]);
    const [uploadErr, setUploadErr] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (!campaign) {
            dispatch(actions.getCampaignById('614632dd070df86687d7f792'))
          
        }
    }, [])

    useEffect(()=>{
        if(campaign&&campaign.images.length){
              // form.setFieldsValue(campaign)
              setImagesURLs(campaign.images)
        }
    },[campaign])

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

    
    const uploadImageToStorage = () => {
        let images = [], imagePaths = [];
        if (!imagesURLs) {
            // maybe move them to the end of the function;
            return;
        };
      
        const storageRef = firebase.storage().ref();
        imagesFiles.map(async img => {
            let fileRef = storageRef.child(`Campaigns/614632dd070df86687d7f792/${img.name}`);
            await fileRef.put(img);
            const singleImgPath = await fileRef.getDownloadURL();
            imagePaths.push(singleImgPath);
            // the end :)
            if (imagePaths.length === images.length) {
                const updateCampaign = { ...campaign, images: imagePaths, create: true }
                // dispatch(actions.updateCampaign(updateCampaign))
            }
        });
    }

    const onFinish = (values) => {
        console.log("🚀 ~ file: Stam.js ~ line 55 ~ onFinish ~ values", values)
        console.log("🚀 ~ file: Stam.js ~ line 55 ~ onFinish ~ imagesURLs", imagesURLs)        
        console.log("🚀 ~ file: Stam.js ~ line 55 ~ onFinish ~ imagesFiles", imagesFiles)      
        uploadImageToStorage();  
    }


    return (
        <div className='Stam'>
            <div>stam</div>
            <div onClick={removeAll}>removeAll</div>
            <Form
                form={form}
                name="campaign"
                onFinish={onFinish}>
                <Form.Item
                    name="images"
                    style={{ display: 'inline-block', width: 'calc(100% - 8px)', marginLeft: '8px' }}
                    rules={[
                        {
                            required: uploadErr,
                            message: `העלה מקסימום 5 תמונות!`,
                        },
                    ]}
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
    )
}