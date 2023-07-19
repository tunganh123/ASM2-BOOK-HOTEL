import React from 'react'
import { forwardRef } from 'react'
export const Input = forwardRef((props, ref) => {
    return (
        <input {...props} ref={ref} style={{ marginBottom: "1rem", ...props.style }} className='form-control' />
    )
})
