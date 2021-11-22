import React from 'react';
import ApplyCreateCampaign from '../general/CreateApply';

import ourAcitvityImg from '../../assets/ourAcitvity.png';

export default function About() {

    return (
        <div className='About'>
            <img className="ourAcitvityImg" src={ourAcitvityImg} />
            <p className="aboutText">
                כל יו&quot;ר ארגון חסד או עמותת צדקה
                <br />יודע שרק בזכות התורמים
                <br />הוא מצליח להניף את הפעילות החשובה שלו
                <br />בלעדיהם, הוא לא היה מחזיק מעמד
                <br />תוכנת 'גיפטמאצ' מאפשרת לארגון
                <br />להביע את הערכתם על תרומתכם החשובה.
                <br />בשיטה המיוחדת שבה עובד האתר
                <br />אתם מוזמנים לבחור
                <br />את גודל הסכום ואת השי הנחשק
                <br />והשובר ישלח ישירות למייל
                <br /><b>ביחד נגיע ליעד!</b>
                <br />
                <br />
                <br />אז אם אתם התורמים - כנסו לארגון שאתם מוקירים ועל כל תרומה תקבלו מתנה,
                <br /><b>אם אתם ראשי עמותה - מוזמנים לפנות אלי</b>
                <br /><b>ולבחור את המסלול המתאים לכם!</b>
                <br />
                <br />אני כאן לכל שאלה,
                <br />אושרת ישראלי
            </p>
            {/* <
            <div>
                {/* <Board /> */}
            {/* <Note /> */}
            <ApplyCreateCampaign />
        </div >
    )
}