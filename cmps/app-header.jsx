const { withRouter, Link, NavLink } = ReactRouterDOM
export class AppHeader extends React.Component {

    state = {
        currPage: 'home',
        isMenuOpen: false,
    }

    componentDidMount() {
        const currPage = this.props.match.params.page
        this.setState({ currPage })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.page === prevProps.match.params.page) return
        const currPage = this.props.match.params.page
        this.setState({ currPage })
    }

    onToggleMenu = () => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen })
    }

    dynamicRendering = () => {
        const { currPage } = this.state
        switch (currPage) {
            case 'book':
                return <BookHeader />
            case 'mail':
                return <MailHeader />
            case 'keep':
                return <KeepHeader />
            default:
                return <HomeHeader />
        }
    }

    render() {
        const { dynamicRendering, onToggleMenu } = this
        const { isMenuOpen } = this.state
        return (
            <header className="app-header">
                {dynamicRendering()}
                <section className="apps-menu"
                    onClick={onToggleMenu}>
                    <div className="svg svg-logo">
                        <svg viewBox="0 0 24 24">
                            <path
                                d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z">
                            </path>
                        </svg>
                    </div>
                    {isMenuOpen &&
                        <Apps />}
                </section>
                <div className="profile-logo">
                    <img src="/assets/icon/profile-picture.png" alt="Profile" />
                </div>
            </header >
        )
    }
}

function HomeHeader() {
    return (
        <React.Fragment>
            <div className="header-logo home-logo">
                <svg viewBox="0 0 63.7 60.12">
                    <path className="cls-1" d="M54.31,30.54c0-15-26.09-21.31-26.09-21.31a8.37,8.37,0,0,1-.85,2.86c0-5.79-6.56-7.58-8.14-7.83.49.91,1.44,4.06,1.08,4.64s-2.63.82-3.16.82c-1.48,0-5.78-3.64-8.43-4.49-1.1,4,3.38,5.22,2.26,10.33-.36,1.63-2.69,2.74-3.18,4.21-.19.57,1.44,10,1.44,12.23,0,3.42-1.23,6.37-1.56,8.2-.7,3.91,7.06,7.45,12.57,3.37C22,42.25,20.9,39,21.3,37.48a11.79,11.79,0,0,1,5.11-6.78c3.32-2.06,2.62-5.9,2.4-7.28,2.6,2.59,2.67,7.2-2.48,10,0,0,1.65,1.34,1.65,6.82S12,50.22,14,57c6.64-10,40.35-7.55,40.35-26.48" transform="translate(-7.64 -4.26)" />
                    <path className="cls-2" d="M38.68,11.48c6.1,2.27,14.89,8.42,17.54,15.41,4,10.39-7.78,17.71-20.07,21.44-13,4-25.89,7.43-22,14.05-.6-6.18,9.05-7.7,19.41-10.22,36-8.73,40.37-27.85,5.15-40.68" transform="translate(-7.64 -4.26)" />
                    <path className="cls-3" d="M47.08,13.48C53.19,15.75,62,21.9,64.62,28.89c3.95,10.39-7.77,17.71-20.07,21.44-13,4-25.88,7.43-22,14-.6-6.18,9.05-7.7,19.41-10.22,36-8.73,40.37-27.85,5.15-40.68" transform="translate(-7.64 -4.26)" />
                </svg>
            </div>
            <div className="logo-name">AppSus</div>
        </React.Fragment>
    )
}

function BookHeader() {
    return (
        <React.Fragment>
            <div className="header-logo book-logo">
                <img src="/assets/icon/book-logo.png" alt="Book" />
            </div>
            <div className="logo-name">Book</div>
        </React.Fragment>
    )
}

function MailHeader() {
    return (
        <React.Fragment>
            <div className="header-logo mail-logo">
                <img src="/assets/icon/mail-logo.png" alt="Mail" />
            </div>
        </React.Fragment>
    )
}

function KeepHeader() {
    return (
        <React.Fragment>
            <div className="header-logo keep-logo">
                <img src="/assets/icon/keep-logo.png" alt="Keep" />
            </div>
            <div className="logo-name">AppSus</div>
        </React.Fragment>
    )
}

function Apps() {

    return (
        <div className="apps">
            <nav>
                <NavLink exact to="/">
                    <img src="/assets/icon/appsus-logo.png" alt="Home" />
                    <span>Home</span>
                </NavLink>
                <NavLink to="/about">
                    <img src="/assets/icon/about-logo.png" alt="About" />
                    <span>About</span>
                </NavLink>
                <NavLink to="/book">
                    <img src="/assets/icon/book-logo.png" alt="Book" />
                    <span>Book</span>
                    </NavLink>
                <NavLink to="/mail">
                    <img src="/assets/icon/mail-logo2.png" alt="Mail" />
                    <span>Mail</span>
                </NavLink>
                <NavLink to="/keep">
                    <img src="/assets/icon/keep-logo.png" alt="Keep" />
                    <span>Keep</span>
                </NavLink>
            </nav>
        </div>
    )
}