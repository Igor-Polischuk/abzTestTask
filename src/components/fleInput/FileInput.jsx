import React from 'react'

import './fileInput.scss'

const FileInput = React.forwardRef(({file, helperText, errors, ...props}, ref) => {
    const invalide = errors ? "invalid" : ''
    const isFile = file && file.length != 0 ? true : false//'
    return (
        <label htmlFor="form__file" className="form__file__container">
            <input {...props}  accept="image/jpeg" className="file" ref={ref} id="form__file" type="file" />
            <div className="form__file__custom">
                <div className={`form__file__custom__upload ${invalide}`}>Upload</div>
                <div style={isFile ? {color: '#000'} : null} className={`form__file__custom__name ${invalide}`}>{isFile ? file[0]?.name : 'Upload your photo'}</div>
                <label htmlFor='form__file' className={`form__helper ${invalide}`}>{helperText}</label>
            </div>
        </label>
    )
})

export default FileInput