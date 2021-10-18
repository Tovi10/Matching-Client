import React, { useEffect, useRef, useState } from 'react';

export default function Stamp({ height }) {

    const stampRef = useRef();
    const [stampHeight, setStampHeight] = useState(20);

    // useEffect(() => {
    //     console.log("from stamp " + height);
    //     setStampHeight(stampRef.current.clientHeight);
    //     console.log("stampRef.current.clientHeight" + stampRef.current.clientHeight)
    // }, []);

    return (
        <div className="Stamp" ref={stampRef} style={{ marginTop: `${height ? (Number(height) - 250) / 2 : 1000} px` }} >
            {console.log((Number(height) - 250) / 2)}
            < p >
                <span>CLOSED</span>
            </ p>
        </ div>
    );

}