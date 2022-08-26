import { keepService } from "../services/keep.service.js"
export class KeepPreview extends React.Component {

    state = {
        keep: null,
        keepInEdit: null,
        inFocus: false,
        filterBy: this.props.filterBy,
        isClrPltOpen: false,
    }

    componentDidMount() {
        const { filterBy, keep } = this.props
        this.setState({ filterBy, keep })
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.focusOn !== this.props.focusOn &&
    //         this.props.focusOn !== 'KeepPreview') {
    //         this.setState({ inFocus: false })
    //     }
    // }

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
                return <KeepTodo keep={keep} onTodoClick={onTodoClick} />
            default:
                return console.warn('Unknown keep type')
        }
    }

    onTodoClick = this.props.onTodoClick

    onKeepEdit = (keepId) => {
        this.setState({ keepInEdit: keepId })
    }

    handleFocus = () => {
        this.setState({ inFocus: true })
        this.props.handleFocus('KeepPreview')
    }

    handleBlur = () => {
        setTimeout(() => {
            this.setState({ inFocus: false, keepInEdit: null, isClrPltOpen: false })
        }, 200)
    }

    onToggleClrPlt = () => {
        this.setState({ isClrPltOpen: !this.state.isClrPltOpen })
    }

    onColorChange = (color) => {
        console.log('color:', color)
        const style = { backgroundColor: color }
        // const { keepInEdit } = this.state
        const keep = { ...this.state.keep, style }
        this.setState({ keep, isClrPltOpen: false, })

        keepService.update(keep)
    }

    onDownloadKeep = () => {
        console.log('exportRef:', exportRef)
        // const keepId = this.state.keep.id
        // keepService.convertKeepToJpeg(keepId)
    }

    render() {
        const { keep } = this.state
        if (!keep) return
        const { keepInEdit, inFocus, isClrPltOpen } = this.state
        const { getKeepContent, onKeepEdit, onColorChange, handleFocus, handleBlur, onToggleClrPlt, onDownloadKeep } = this
        return (
            <div className={`keep-preview ${keep.id} ${keep.type} ${keep.style ? keep.style.backgroundColor : 'white'}`}
                // onFocus={handleFocus}
                onBlur={handleBlur}>
                {getKeepContent()}
                <div className="btns btns-keep-preview">
                    {/* <button className="btn btn-svg" title="Keep Note">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#000">
                        <path d="M10.8149 2.60571L3.28365 23.3401H0.205522L8.8774 0.590088H10.8618L10.8149 2.60571ZM17.1274 23.3401L9.58052 2.60571L9.53365 0.590088H11.518L20.2211 23.3401H17.1274ZM16.7368 14.9182V17.387H3.95552V14.9182H16.7368Z" />
                        </svg>
                    </button> */}
                    <button className="btn btn-svg" title="Change Color"
                        onClick={onToggleClrPlt}>
                        {/* onClick={() => onKeepEdit(keep.id)}> */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#000">
                            <path
                                d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.47.64 1.06.64 1.67A2.5 2.5 0 0 1 12 22zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5a.54.54 0 0 0-.14-.35c-.41-.46-.63-1.05-.63-1.65a2.5 2.5 0 0 1 2.5-2.5H16c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7z" />
                            <circle cx="6.5" cy="11.5" r="1.5" />
                            <circle cx="9.5" cy="7.5" r="1.5" />
                            <circle cx="14.5" cy="7.5" r="1.5" />
                            <circle cx="17.5" cy="11.5" r="1.5" />
                        </svg>
                    </button>
                    <button className="btn btn-svg" title="Download Keep"
                        onClick={() => keepService.exportAsImage(`${keep.id}`, 'test')}>
                        <svg width="16" height="16" viewBox="0 0 16 16">
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M5.01366 6.77078L7.00982 9.57448L7.00182 1.4184C7.00182 1.1664 7.22782 0.962402 7.50582 0.962402C7.78382 0.962402 8.00982 1.1664 8.00982 1.4184V9.57448L10.0067 6.77078C10.2067 6.57448 10.6067 6.57448 10.8067 6.77078C11.0067 6.97448 11.0067 7.37448 10.8067 7.57836L7.51184 11.9804L4.20982 7.57836C4.01044 7.37448 4.01147 6.97352 4.20982 6.77078C4.40818 6.57448 4.80982 6.57206 5.01366 6.77078ZM13.0427 16H2.04266C0.938664 16 0.0426636 15.104 0.0426636 14V8.0358C0.0426636 7.03588 1.04265 7.03575 1.04266 8.03575V14C1.04266 14.5 1.54266 15 2.04266 15H13.0427C13.5427 15 14.0427 14.5 14.0427 14V8.03566C14.03 7.03573 15.0427 6.93071 15.0427 8.03571V14C15.0427 15.105 14.1467 16 13.0427 16Z" />
                        </svg>
                    </button>
                    {/* <button className="btn btn-svg" title="Keep Todo">
                        <svg width="24" height="24" viewBox="0 0 24 24">
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>
                        </svg>
                    </button> */}
                </div>
                {isClrPltOpen &&
                    <div className="color-plt">
                        <ColorList onColorChange={onColorChange} />
                    </div>}
            </div>
        )
    }
}

function ColorList({ onColorChange }) {
    let colors = []
    for (let i = 1; i <= 11; i++) {
        colors.push(<ColorPreview i={i} key={i} onColorChange={onColorChange} />)
    }
    return colors
}

function ColorPreview({ i, onColorChange }) {
    return <button onClick={() => onColorChange(`plt${i}`)} style={{ backgroundColor: `var(--clr-plt${i})` }}></button>
}

function KeepTxt({ keep }) {
    return (
        <React.Fragment>
            <h2>KeepTxt</h2>
            {keep.info.title &&
                <h2 className="keep-title">{keep.info.title}</h2>}
            <p>{keep.info.txt}</p>
        </React.Fragment>
    )
}

function KeepImg({ keep }) {
    return (
        <React.Fragment>
            <h2>KeepImg</h2>
            {keep.info.title &&
                <h2 className="keep-title">{keep.info.title}</h2>}
            <img src={keep.info.url} alt="Keep Image" />
        </React.Fragment>
    )
}

function KeepVideo({ keep }) {
    return (
        <React.Fragment>
            <h2>KeepVideo</h2>
            {keep.info.title &&
                <h2 className="keep-title">{keep.info.title}</h2>}
        </React.Fragment>
    )
}

function KeepTodo({ keep, onTodoClick }) {
    return (
        <React.Fragment>
            <h2>KeepTodo</h2>
            {keep.info.title &&
                <h2 className="keep-title">{keep.info.title}</h2>}
            {keep.info.todos.map((todo, idx) => (
                <p key={idx}
                    onClick={() => onTodoClick(keep.id, idx)}>
                    {todo.txt}
                </p>
            ))}
        </React.Fragment>
    )
}