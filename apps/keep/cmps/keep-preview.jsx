
const { Link } = ReactRouterDOM

export class KeepPreview extends React.Component {

    state = {
        // keep: this.props.keep,
        filterBy: this.props.filterBy,
    }
    componentDidMount() {
        console.log('filterBy from KeepPreview (cdm):', this.props.filterBy)
        this.setState({ filterBy: this.props.filterBy })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.filterBy !== this.state.filterBy) {
            console.log('filterBy from KeepPreview (cdu):', this.props.filterBy)
            this.setState({ filterBy: this.props.filterBy })
        }
    }

    getKeepContent = () => {
        const { keep } = this.props
        switch (keep.type) {
            case 'keep-txt':
                return <KeepTxt keep={keep} />
            case 'keep-img':
                return <KeepImg keep={keep} />
            case 'keep-videos':
                return <KeepVideo keep={keep} />
            case 'keep-todos':
                return <KeepTodo keep={keep} />
            default:
                return console.warn('Unknown keep type')
        }
    }

    render() {
        const { keep } = this.props

        return (
            <Link to={"/keep/" + keep.id}>
                {this.getKeepContent()}
            </Link>
        )
    }
}

function KeepTxt({ keep }) {
    return (
        <div className="keep-preview keep-txt">
            <h2>KeepTxt</h2>
            {keep.info.title &&
                <h2 className="keep-title">{keep.info.title}</h2>}
            <p>{keep.info.txt}</p>
        </div>
    )
}

function KeepImg({ keep }) {
    return (
        <div className="keep-preview keep-img">
            <h2>KeepImg</h2>
            {keep.info.title &&
                <h2 className="keep-title">{keep.info.title}</h2>}
            <img src={keep.info.url} alt="Keep Image" />
        </div>
    )
}

function KeepVideo({ keep }) {
    return (
        <div className="keep-preview keep-video">
            <h2>KeepVideo</h2>
            {keep.info.title &&
                <h2 className="keep-title">{keep.info.title}</h2>}
        </div>
    )
}

function KeepTodo({ keep }) {
    return (
        <div className="keep-preview keep-todo">
            <h2>KeepTodo</h2>
            {keep.info.title &&
                <h2 className="keep-title">{keep.info.title}</h2>}
            {keep.info.todos.map((todo, idx) => { <p key={idx}>{todo}</p> })}
        </div>
    )
}