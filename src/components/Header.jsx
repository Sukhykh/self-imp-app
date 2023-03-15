/* styles */
import '../assets/scss/_Header.scss';
import logo from '../assets/img/logo.png'

/* components */

/* dependencies */
import { useWidthValue } from '../hooks/useWidthValue';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__wrapper">
                    <Link to='/'>
                        <div className="header__logo-wrapper">
                            <img className="header__logo"
                                src={logo} alt="logo.png"
                                width={useWidthValue() > 450 ? 64 : 32}
                                height={useWidthValue() > 450 ? 64 : 32} />
                        </div>
                    </Link >
                    <div className="header__title-wrapper">
                        <h1 className="header__title">courses</h1>
                        {useWidthValue() > 450 && <h2 className="header__sub-title">for self improvement</h2>}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header