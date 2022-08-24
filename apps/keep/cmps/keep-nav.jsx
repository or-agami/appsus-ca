const { Link, NavLink, withRouter } = ReactRouterDOM

export class KeepNav extends React.Component {
    state = {
        type: null,
    }

    componentDidMount() {
        this.setState({ filterBy: this.props.filterBy.type })
    }

    onSetFilterByType = (type) => {
        this.setState({ type })
        this.props.onSetFilterByType(type)
    }

    render() {
        const { onSetFilterByType } = this
        const { type } = this.state
        console.log('type from KeepNav:', type)
        return (
            <nav className="btns side-nav-btns keep-nav">
                <button className={`btn btn-svg ${type === null ? 'active' : ''}`}
                    onClick={() => onSetFilterByType(null)}
                    title="Keep Note">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                        <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z">
                        </path>
                    </svg>
                    <span>All</span>
                </button>
                <button className={`btn btn-svg ${type === 'keep-txt' ? 'active' : ''}`}
                    onClick={() => onSetFilterByType('keep-txt')}
                    title="Keep Note">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#000">
                        <path d="M10.8149 2.60571L3.28365 23.3401H0.205522L8.8774 0.590088H10.8618L10.8149 2.60571ZM17.1274 23.3401L9.58052 2.60571L9.53365 0.590088H11.518L20.2211 23.3401H17.1274ZM16.7368 14.9182V17.387H3.95552V14.9182H16.7368Z" />
                    </svg>
                    <span>Notes</span>
                </button>
                <button className={`btn btn-svg ${type === 'keep-img' ? 'active' : ''}`}
                    onClick={() => onSetFilterByType('keep-img')}
                    title="Keep Image">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#000">
                        <path
                            d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z" />
                    </svg>
                    <span>Images</span>
                </button>
                <button className={`btn btn-svg ${type === 'keep-video' ? 'active' : ''}`}
                    onClick={() => onSetFilterByType('keep-video')}
                    title="Keep Video">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#000">
                        <path
                            d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.47.64 1.06.64 1.67A2.5 2.5 0 0 1 12 22zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5a.54.54 0 0 0-.14-.35c-.41-.46-.63-1.05-.63-1.65a2.5 2.5 0 0 1 2.5-2.5H16c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7z" />
                        <circle cx="6.5" cy="11.5" r="1.5" />
                        <circle cx="9.5" cy="7.5" r="1.5" />
                        <circle cx="14.5" cy="7.5" r="1.5" />
                        <circle cx="17.5" cy="11.5" r="1.5" />
                    </svg>
                    <span>Videos</span>
                </button>
                <button className={`btn btn-svg ${type === 'keep-todos' ? 'active' : ''}`}
                    onClick={() => onSetFilterByType('keep-todos')}
                    title="Keep Todo">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>
                    </svg>
                    <span>Todos</span>
                </button>
            </nav>
        )
    }
}