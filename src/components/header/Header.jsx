import { Link } from 'react-scroll'

import './header.scss'
import logo from '../../assets/img/Logo.svg'

export default function Header() {
    return (
        <header className='header'>
            <div className="container">
                <div className="header__content">
                    <img className='header__logo' src={logo} alt="Logo" />
                    <div className="header__buttons">
                        <Link to='users_section' smooth={true} className="button">Users</Link>
                        <Link to='form_section' smooth={true} className="button">Sign up</Link>
                    </div>
                </div>
            </div>
        </header>
    )
}