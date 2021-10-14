import React from 'react';
import ApplyCreateCampaign from '../general/CreateApply';
// import "animate.css"

export default function About() {

    return (
        <div className='About'>
            {/* https://animate.style/ */}
            {/* <h1 className="animate__animated animate__flipOutY">An animated element</h1> */}
            <div className="bg"></div>
            <div className="bg bg2"></div>
            <div className="bg bg3"></div>
            <div className="content">
                {/* <div id="bars1">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div> */}
                <div className="wrapper" >
                    <div className="typing-demo" >
                        זה המקום לספר על האתר שלנו כמה הוא יפה ומשוכלל!!
                    </div >
                </div>
                <ApplyCreateCampaign/>
            </div>
        </div>
    )
}