import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'

import TextInput from "../textInput/TextInput"
import Radio from "../radio/Radio"
import FileInput from "../fleInput/FileInput"
import Spiner from "../spiner/Spiner"

import useABZService from "../../services/abzService"

import successImage from '../../assets/img/success-image.svg'
import './form.scss'

export default function FormSection() {
    const [isRegistred, setRegistred] = useState(false)

    return (
        <section className="form_section">
            <h2 className="title form__title">{!isRegistred ? 'Working with POST request' : 'User successfully registered'}</h2>
            {isRegistred ? <img className="form__success" src={successImage} />
                : <Form setRegistred={setRegistred} />}
        </section>
    )
}


const schema = yup.object().shape({
    photo: yup.mixed()
        .test('isFile', 'You need to privide a file', function (value) {
            return value && value.length
        })
        .test('fileSize', 'The file is too large. Size must not exceed  5MB', function (value) {
            return value && value[0]?.size <= 5000000
        }),
    name: yup.string()
        .required('This field is required')
        .min(2, 'Name to short')
        .max(60, 'Name too long'),
    email: yup.string()
        .required('This field is required')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid email address"),
    phone: yup.string()
        .required('This field is required')
        .matches(/^\d{12}$/, "Invalid phone number"),
})

const Form = ({ setRegistred }) => {
    const form = useRef(null)
    const { post, loading } = useABZService()
    const [serverError, setServerError] = useState('')
    const { register, handleSubmit, watch, formState: { errors, isDirty, isValid } } = useForm({
        defaultValues: {
            position_id: '1',
            name: '',
            email: '',
            phone: '380'
        },
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const onSubmit = async data => {
        let formData = new FormData(form.current);

        const response = await post(formData)
        
        if (response.success === false){
            setServerError(response.message)
            return 0
        }
        
        setRegistred(true)
    }

    const loader = loading ? <Spiner /> : null

    return (
        <>
            {loader}
            <form style={loading ? { display: 'none' } : null}
                ref={form} className="form"
                onSubmit={handleSubmit(onSubmit)}>
                <div className="form__input__container">
                    <TextInput
                        {...register('name')}
                        label="Your name" id="name"
                        type="text"
                        className="form__input"
                        errors={errors.name}
                        helperText={errors.name ? errors.name.message : null} />
                </div>
                <div className="form__input__container">
                    <TextInput
                        {...register('email')}
                        label="Email"
                        id="email"
                        type="email"
                        className="form__input"
                        errors={errors.email}
                        helperText={errors.email ? errors.email.message : null} />

                </div>
                <div className="form__input__container">
                    <TextInput
                        {...register('phone')}
                        label="Phone"
                        id="phone"
                        type="tel"
                        className="form__input"
                        errors={errors.phone}
                        helperText={errors.phone ? errors.phone.message : '+38 (XXX) XXX - XX - XX'} />
                </div>

                <ul className="form__radio__list">
                    <li><p className="form__radio__list-title">Select your position </p></li>
                    <li className="form__radio__item">
                        <Radio {...register('position_id')} value={1} label='Frontend developer' id='position-frontend' name="position_id" />
                    </li>
                    <li className="form__radio__item">
                        <Radio {...register('position_id')} value={2} label='Backend developer' id='position-backend' name="position_id" />
                    </li>
                    <li className="form__radio__item">
                        <Radio {...register('position_id')} value={3} label='Designer' id='position-designer' name="position_id" />
                    </li>
                    <li className="form__radio__item">
                        <Radio {...register('position_id')} value={4} label='QA' id='position-qa' name="position_id" />

                    </li>
                </ul>
                <FileInput
                    {...register('photo')}
                    file={watch('photo')}
                    helperText={errors.photo ? errors.photo.message : null}
                    errors={errors.photo} />
                    <p className="form__error">{serverError}</p>
                <button type="submit" className="button" disabled={!isDirty || !isValid}    >Sign up</button>
            </form>
        </>
    )
}