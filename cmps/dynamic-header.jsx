const { withRouter, Link, NavLink } = ReactRouterDOM
export class DynamicHeader extends React.Component {

    state = {
        currPage: null,
    }

    componentDidMount() {
        const currPage = this.props.location.pathname
        console.log('componentDidMount from DynamicHeader')
        console.log('currPage from DynamicHeader:', currPage)
    }

    componentDidUpdate(prevProps, prevState) {
        // const currPage = this.props.location.pathname
        const currPage = this.props.match.params.page
        // if (currPage === prevProps.match.params.page) return
        // const { currPage } = this.props.match.params.page
        console.log('currPage from DynamicHeader:', currPage)
        if (true) return
        this.setState({ currPage })
    }

    render() {
        return (

            <header className="app-header">
                <Link to="/">
                    <h3>LOGO!</h3>

                </Link>
                <section className="apps-menu">
                    <div className="svg svg-logo">
                        <svg viewBox="0 0 24 24">
                            <path
                                d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z">
                            </path>
                        </svg>
                    </div>
                    <Apps />
                </section>
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