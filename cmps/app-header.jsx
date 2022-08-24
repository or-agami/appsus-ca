import { DynamicHeader } from "../cmps/dynamic-header.jsx"

const { Link, NavLink, withRouter } = ReactRouterDOM
export class AppHeader extends React.PureComponent {

    state = {
        menuIsOpen: false,
    }

    toggleMenu = () => {
        this.setState({ menuIsOpen: !this.state.menuIsOpen })
    }

    render() {
        const { menuIsOpen } = this.state
        return (
            <header className="app-header">
                <Link to="/">
                    <h3>LOGO!</h3>
                    
                </Link>
                <nav>
                    <NavLink exact to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/book">Book</NavLink>
                    <NavLink to="/mail">Mail</NavLink>
                    <NavLink to="/keep">Keep</NavLink>
                    {/* <DynamicHeader onClick={this.toggleMenu} />
                    {menuIsOpen && <Apps />} */}
                </nav>
            </header >
        )
    }
}