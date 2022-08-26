import { DynamicHeader } from "../cmps/dynamic-header.jsx"

const Router = ReactRouterDOM.HashRouter
const { Route, Link, NavLink, withRouter, Switch } = ReactRouterDOM

export class AppHeader extends React.PureComponent {

    state = {
        menuIsOpen: false,
        currPage: 'home',
    }

    toggleMenu = () => {
        this.setState({ menuIsOpen: !this.state.menuIsOpen })
    }

    updatePage = () => {

    }

    render() {
        const { menuIsOpen } = this.state
        return (
            <header className="app-header">
                <Link to="/">
                    <h3>LOGO!</h3>

                </Link>
                <Route path="/:page?" component={DynamicHeader} />
                {/* <Apps /> */}
            </header >
        )
    }
}


function Apps() {

    return (
        <div className="apps">
            <nav>
                <NavLink exact to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/book">Book</NavLink>
                <NavLink to="/mail">Mail</NavLink>
                <NavLink to="/keep">Keep</NavLink>
            </nav>
        </div>
    )
}