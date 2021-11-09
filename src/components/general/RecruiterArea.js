import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { actions } from '../../redux/actions';

export default function RecruiterArea() {

    const dispatch = useDispatch();
    const recruiterDonations = useSelector(state => state.recruiterReducer.recruiterDonations);
    const currentRecruiter = useSelector(state => state.recruiterReducer.currentRecruiter);
    let recruiterId = useParams();

    useEffect(() => {
        dispatch(actions.getRecruiterById(recruiterId));
        dispatch(actions.getDonationsByRecruiterId(recruiterId));
    }, []);

    // useEffect(() => {
    //     recruiterDonations = useSelector(state => state.recruiterReducer.recruiterDonations);
    // }, [recruiterDonations]);

    return (
        <div className="RecruiterArea">{
            currentRecruiter ? <div>
                <h4>{`שלום לך ${currentRecruiter.designName !== undefined? currentRecruiter.designName : (currentRecruiter.user.name || currentRecruiter.user.email)}`}</h4>
                <h4>{`התרומות שנתרמו על ידך לקמפיין ${currentRecruiter.campaign.campaignName}`}</h4>
                {currentRecruiter ? <h6>{`עד כה הושג ${currentRecruiter.sumRaised === undefined ? 0 : currentRecruiter.sumRaised} מתוך ${currentRecruiter.sum} ש"ח`}</h6> : ""}
                <div className="row">
                    {recruiterDonations ? recruiterDonations.map((donation, i) => (
                        // <div>{JSON.stringify(donation)}
                        //     <br /></div>
                        <div className={`card col-4 m-3 ${i % 2 === 0 ? "cardModTwo" : ""}`} key={donation._id}>
                            <div className="card-body">
                                <h5 className="card-title">{donation.user.name ? donation.user.name : 'לא ידוע'}</h5>
                                <p>{`תרם ${donation.card.sum} ש"ח עבור ${donation.card.text}`}</p>
                                <p>{`בתאריך ${donation.date}`}</p>
                                <p>{`וקבל ${donation.card.gift && donation.card.gift.name}`}</p>
                            </div>
                        </div>
                    )) : "No Donations"}
                </div>
            </div>
                :
                "No Recruiter"
        }
        </div>
    );
}