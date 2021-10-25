import React, { useEffect, useState } from 'react';

export default function Stam() {


    const [index, setIndex] = useState(1);
    const showIndex = (n) => {
        const x = document.getElementsByClassName("mySlides");
        let slideIndex = n;
        if (n > x.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = x.length
        }
        for (let i = 0; i < x.length; x[i].style.display = "none", i++);
        x[slideIndex - 1].style.display = "block";
        setIndex(slideIndex)
    }

    useEffect(() => {
        showIndex(1)
    }, [])

    return (
        <div className='Stam'>
            <div className="w3-content w3-display-container">
                <img alt='img1' className="mySlides" src='ljogo192.png' style={{ background: 'red' }} />
                <img alt='img2' className="mySlides" src="img_lights.jpg" style={{ background: 'blue' }} />
                <img alt='img3' className="mySlides" src="img_forest.jpg" style={{ background: 'yellow' }} />
                <img alt='img4' className="mySlides" src="img_mountains.jpg" />

                <button onClick={e => showIndex(index - 1)}>prev</button>
                <button onClick={e => showIndex(index + 1)}>next</button>
            </div>
        </div>
    )
}