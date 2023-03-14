import '../assets/scss/_Header.scss';

const Header = () => {

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__wrapper">
                    <div className="header__title-wrapper">
                        <h1 className="header__title">Weather</h1>
                        <h2 className="header__sub-title">by location</h2>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header