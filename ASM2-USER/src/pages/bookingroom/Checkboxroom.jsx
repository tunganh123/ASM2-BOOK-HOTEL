import React, { useRef } from 'react';

const Checkboxroom = ({ ro, datacheck, room }) => {

    const ref = useRef()
    const changehandler = () => {
        if (ref.current.checked) {
            datacheck(ref.current.value, true)
        } else datacheck(ref.current.value, false)
    }
    return (
        <>
            <span style={{ marginRight: "1rem", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <label htmlFor="">{ro}</label>
                <input ref={ref} onChange={changehandler} style={{ margin: "0 auto" }} type="checkbox" value={ro} />
            </span>
        </>
    )
}

export default Checkboxroom;