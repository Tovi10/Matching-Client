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
        <div className="RecruiterArea">
            <h5>{`שלום לך ${currentRecruiter ? currentRecruiter.designName : ""}`}</h5>
            <h5>{`התרומות שנתרמו על ידך לקמפיין ${recruiterDonations[0] ? recruiterDonations[0].recruiter.campaign.campaignName : ""}`}</h5>
            <div className="row">
                {recruiterDonations ? recruiterDonations.map((donation, i) => (
                    // <div>{JSON.stringify(donation)}
                    //     <br /></div>
                    <div className={`card col-4 m-3 ${i % 2 === 0 ? "cardModTwo" : ""}`} key={donation._id}>
                        <div class="card-body">
                            <h5 className="card-title">{donation.user.name}</h5>
                            <p>{`תרם ${donation.card.text}`}</p>
                            <p>{`בתאריך ${donation.date}`}</p>
                            <p>{`וקבל ${donation.card.gift && donation.card.gift.name}`}</p>
                        </div>
                    </div>
                )) : "No Donations"}
            </div>
        </div>
    );
}