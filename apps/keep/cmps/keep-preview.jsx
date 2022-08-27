import { keepService } from "../services/keep.service.js"
import { mailKeep } from "../../../services/event-bus.service.js"

const { withRouter } = ReactRouterDOM

export class _KeepPreview extends React.Component {

    state = {
        keep: null,
        keepInEdit: null,
        inFocus: false,
        filterBy: this.props.filterBy,
        isClrPltOpen: false,
        editedContent: null,
    }

    componentDidMount() {
        const { filterBy, keep } = this.props
        this.setState({ filterBy, keep })
    }

    getKeepContent = () => {
        const { keep, keepInEdit } = this.state
        const { handleChange, onTodoClick } = this
        switch (keep.type) {
            case 'keep-txt':
                return <KeepTxt
                    keep={keep}
                    keepInEdit={keepInEdit}
                    handleChange={handleChange}
                />
            case 'keep-img':
                return <KeepImg
                    keep={keep}
                    keepInEdit={keepInEdit}
                    handleChange={handleChange}
                />
            case 'keep-video':
                return <KeepVideo
                    keep={keep}
                />
            case 'keep-todos':
                return <KeepTodo
                    keep={keep}
                    keepInEdit={keepInEdit}
                    onTodoClick={onTodoClick}
                    handleChange={handleChange}
                />
            case 'keep-mail':
                return <KeepMail
                    keep={keep}
                />
            default:
                return console.warn('Unknown keep type')
        }
    }

    onTodoClick = (keepId, idx) => {
        keepService.toggleMarkTodo(keepId, idx)
            .then((keep) => this.setState({ keep }))
    }

    onKeepEdit = () => {
        const { keep } = this.state
        this.setState({ keepInEdit: keep })
    }

    onDoneEdit = () => {
        const { keepInEdit } = this.state
        keepService.update(keepInEdit)
        this.setState({ keepInEdit: null })
    }

    handleChange = (keepType, { target }) => {
        const value = target.textContent
        if (keepType === 'keepTodo') {
            const id = +target.attributes.id.value
            const editedTodo = { txt: value, doneAt: null }
            let todos = this.state.keepInEdit.info.todos
            todos.splice(id, 1, editedTodo)
            this.setState((prevState) => ({
                keepInEdit: {
                    ...prevState.keepInEdit,
                    info: { ...prevState.keepInEdit.info, todos }
                }
            }))
            return
        } else if (keepType === 'keepTxt') {
            this.setState((prevState) => ({
                keepInEdit: {
                    ...prevState.keepInEdit,
                    info: { ...prevState.keepInEdit.info, txt: value }
                }
            }))
            return
        } else if (keepType === 'keepImg') {
            this.setState((prevState) => ({
                keepInEdit: {
                    ...prevState.keepInEdit,
                    info: { ...prevState.keepInEdit.info, url: value }
                }
            }))
            return
        }
    }

    onSendKeepAsMail = () => {
        const { keep } = this.state
        const mail = {}
        mail.subject = keep.info.title ? keep.info.title : 'My Keep'
        switch (keep.type) {
            case 'keep-txt':
                mail.body = keep.info.txt
                break
            case 'keep-img' || 'keep-video':
                mail.body = keep.info.url
                break
            // case 'keep-video':
            //     mail.body = keep.info.url
            case 'keep-todos':
                mail.body = keep.info.todos.map(todo => todo.txt).join('\n')
                break
            case 'keep-mail':
                mail.body = keep.info.body
                break
            default:
                return console.warn('Unknown keep type')
        }
        this.props.history.push('/mail')
        setTimeout(() => { mailKeep(mail) }, 2000)
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

    onTogglePinned = (keepId) => {
        this.props.onTogglePinned(keepId)
    }

    onRemoveKeep = (keepId) => {
        this.props.onRemoveKeep(keepId)
    }

    onColorChange = (color) => {
        const style = { backgroundColor: color }
        const keep = { ...this.state.keep, style }
        this.setState({ keep, isClrPltOpen: false, })

        keepService.update(keep)
    }

    onDownloadKeep = () => {
        // React.createRef();
        // console.log('exportRef:', exportRef)
        // const keepId = this.state.keep.id
        // keepService.convertKeepToJpeg(keepId)
    }

    render() {
        const { keep } = this.state
        if (!keep) return
        const { keepInEdit, inFocus, isClrPltOpen } = this.state
        const { getKeepContent, onKeepEdit, onColorChange, handleFocus, handleBlur, onToggleClrPlt, onDownloadKeep, onDoneEdit, onTogglePinned, onSendKeepAsMail, onRemoveKeep } = this
        return (
            <div className={`keep-preview ${keep.id} ${keep.type} ${keep.style ? keep.style.backgroundColor : 'default'} ${keep.isPinned ? 'pinned' : ''}`}
                // onFocus={handleFocus}
                onBlur={handleBlur}>
                {getKeepContent()}
                <div className="space"></div>
                <div className="btns btns-keep-preview">
                    <button className="btn btn-svg btn-pin" title="Pin"
                        onClick={() => onTogglePinned(keep.id)}>
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path fill="#000"
                                d="M17 4v7l2 3v2h-6v5l-1 1-1-1v-5H5v-2l2-3V4c0-1.1.9-2 2-2h6c1.11 0 2 .89 2 2zM9 4v7.75L7.5 14h9L15 11.75V4H9z" />
                        </svg>
                    </button>
                    <button className="btn btn-svg" title="Change Color"
                        onClick={onToggleClrPlt}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#000">
                            <path
                                d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.47.64 1.06.64 1.67A2.5 2.5 0 0 1 12 22zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5a.54.54 0 0 0-.14-.35c-.41-.46-.63-1.05-.63-1.65a2.5 2.5 0 0 1 2.5-2.5H16c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7z" />
                            <circle cx="6.5" cy="11.5" r="1.5" />
                            <circle cx="9.5" cy="7.5" r="1.5" />
                            <circle cx="14.5" cy="7.5" r="1.5" />
                            <circle cx="17.5" cy="11.5" r="1.5" />
                        </svg>
                    </button>
                    {!keepInEdit && keep.type !== 'keep-video' &&
                        <button className="btn btn-svg btn-edit" title="Edit"
                            onClick={onKeepEdit}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="#000">
                                <path d="M20.41 4.94l-1.35-1.35c-.78-.78-2.05-.78-2.83 0L13.4 6.41 3 16.82V21h4.18l10.46-10.46 2.77-2.77c.79-.78.79-2.05 0-2.83zm-14 14.12L5 19v-1.36l9.82-9.82 1.41 1.41-9.82 9.83z">
                                </path>
                            </svg>
                        </button>}
                    {keepInEdit &&
                        <button className="btn btn-svg btn-edit" title="Done"
                            onClick={() => onDoneEdit()}>
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>
                            </svg>
                        </button>}
                    <button className="btn btn-svg" title="Download Keep"
                        onClick={() => keepService.exportAsImage(`${keep.id}`, 'test')}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="#000">
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M5.01366 6.77078L7.00982 9.57448L7.00182 1.4184C7.00182 1.1664 7.22782 0.962402 7.50582 0.962402C7.78382 0.962402 8.00982 1.1664 8.00982 1.4184V9.57448L10.0067 6.77078C10.2067 6.57448 10.6067 6.57448 10.8067 6.77078C11.0067 6.97448 11.0067 7.37448 10.8067 7.57836L7.51184 11.9804L4.20982 7.57836C4.01044 7.37448 4.01147 6.97352 4.20982 6.77078C4.40818 6.57448 4.80982 6.57206 5.01366 6.77078ZM13.0427 16H2.04266C0.938664 16 0.0426636 15.104 0.0426636 14V8.0358C0.0426636 7.03588 1.04265 7.03575 1.04266 8.03575V14C1.04266 14.5 1.54266 15 2.04266 15H13.0427C13.5427 15 14.0427 14.5 14.0427 14V8.03566C14.03 7.03573 15.0427 6.93071 15.0427 8.03571V14C15.0427 15.105 14.1467 16 13.0427 16Z" />
                        </svg>
                    </button>
                    <button className="btn btn-svg" title="Send as Mail"
                        onClick={onSendKeepAsMail}>
                        <svg height="20" width="20">
                            <path d="M3.5 16q-.625 0-1.062-.438Q2 15.125 2 14.5v-9q0-.625.438-1.062Q2.875 4 3.5 4h13q.625 0 1.062.438Q18 4.875 18 5.5v9q0 .625-.438 1.062Q17.125 16 16.5 16Zm6.5-5L3.5 7.271V14.5h13V7.271Zm0-1.771L16.5 5.5h-13ZM3.5 7.271V5.5v9Z" />
                        </svg>
                    </button>
                    <button className="btn btn-svg" title="Delete"
                        onClick={() => onRemoveKeep(keep.id)}>
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path>
                            <path d="M9 8h2v9H9zm4 0h2v9h-2z"></path>
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

function KeepTxt({ keep, handleChange, keepInEdit }) {
    return (
        <React.Fragment>
            {/* <h2>KeepTxt</h2> */}
            <div className="details">
                {keep.info.title &&
                    <h2 className="keep-title">{keep.info.title}</h2>}
                <p
                    type="text"
                    onInput={(e) => handleChange('keepTxt', e)}
                    contentEditable={keepInEdit ? 'true' : 'false'}
                >
                    {keep.info.txt}
                </p>
            </div>
        </React.Fragment>
    )
}

function KeepImg({ keep, handleChange, keepInEdit }) {
    return (
        <React.Fragment>
            {/* <h2>KeepImg</h2> */}
            {keepInEdit === null &&
                <div className="img">
                    <img src={keep.info.url} alt="Keep Image" />
                </div>
                // <img src="https://blog.logrocket.com/wp-content/uploads/2020/01/logrocket-blog-logo.png" />
            }
            <div className="details">
                {keepInEdit &&
                    <p
                        type="text"
                        onInput={(e) => handleChange('keepImg', e)}
                        contentEditable={keepInEdit ? 'true' : 'false'}
                    >
                        {keep.info.url}
                    </p>
                }
                {keep.info.title &&
                    <h2 className="keep-title">{keep.info.title}</h2>}
            </div>
        </React.Fragment>
    )
}

function KeepVideo({ keep }) {
    return (
        <React.Fragment>
            {/* <h2>KeepVideo</h2> */}
            <iframe width="100%" src={`https://www.youtube.com/embed/${keep.info.videoId}`}></iframe>
            <div className="details">
                {keep.info.title &&
                    <h2 className="keep-title">{keep.info.title}</h2>}
            </div>
        </React.Fragment>
    )
}

function KeepTodo({ keep, onTodoClick, handleChange, keepInEdit }) {
    return (
        <React.Fragment>
            {/* <h2>KeepTodo</h2> */}
            <div className="details">
                {keep.info.title &&
                    <h2 className="keep-title">{keep.info.title}</h2>}
                {keep.info.todos.map((todo, idx) => (
                    <p key={idx} className={`todo ${(todo.doneAt && !keepInEdit) ? 'done' : ''}`}
                        type="text"
                        id={idx}
                        contentEditable={keepInEdit ? 'true' : 'false'}
                        onInput={(e) => handleChange('keepTodo', e)}
                        onClick={() => onTodoClick(keep.id, idx)}>
                        {todo.txt}
                    </p>
                ))}
            </div>
        </React.Fragment>
    )
}

function KeepMail({ keep }) {
    return (
        <React.Fragment>
            {/* <h2>KeepMail</h2> */}
            <div className="details">
                {keep.info.title &&
                    <h2 className="keep-title">{keep.info.title}</h2>}
                <h3>{keep.info.subject}</h3>
                <p>{keep.info.body}</p>
            </div>
        </React.Fragment>
    )
}

export const KeepPreview = withRouter(_KeepPreview)
