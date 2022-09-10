import './card.scss'
import ReactTooltip from 'react-tooltip'

export default function Card({ photo, name, position, email, phone }) {
    return (
        <li className="card">
            <img src={photo} alt={`${name} profile photo`} className="card__photo" />
            <p className="card__name" data-tip={name} data-for="tooltip">{name.length > 40 ? `${name.slice(0, 40)}...` : name}</p>
            <p className="card__descr">
                <span data-tip={position} data-for="tooltip">{position.length > 40 ? `${position.slice(0, 40)}...` : position}</span> <br />
                <span data-tip={email} data-for="tooltip">{email.length > 40 ? `${email.slice(0, 40)}...` : email}</span> <br />
                {phone} <br />
            </p>

            <ReactTooltip arrowColor='transparent' backgroundColor='black' id="tooltip" place="bottom" effect="solid"/>
        </li>
    )
}