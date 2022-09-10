import React from 'react'

import './radio.scss'

const Radio = React.forwardRef(({label, id, ...props}, ref) => {

    return (
        <>
            <label className='custom__radio' htmlFor={id}>
                <input {...props} ref={ref} type="radio" id={id} />
                <span className="checkmark"></span>
            </label>
            <label htmlFor={id}>{label}</label>
        </>
    )
})

export default Radio