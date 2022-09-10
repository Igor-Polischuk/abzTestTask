import React from 'react'
import { useForm } from 'react-hook-form'

import './textInput.scss'


const TextInput = React.forwardRef(({label, helperText, errors, id, className, ...other}, ref) => {
    const invalide = errors ? "invalid" : ''

    return (
        <div className='form__group'>
            <input {...other} id={id} ref={ref} className={`form__field ${invalide} ${className}`} placeholder={label} />
            <label htmlFor={id} className={`form__label ${invalide}`}>{label}</label>
            <label htmlFor={id} className={`form__helper ${invalide}`}>{helperText}</label>
        </div>
    )
})

export default TextInput