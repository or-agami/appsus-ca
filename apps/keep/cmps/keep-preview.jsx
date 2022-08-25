import { keepService } from "../services/keep.service.js"

export class KeepPreview extends React.Component {

    state = {
        keep: null,
        keepInEdit: null,
        keepInFocus: false,
        filterBy: this.props.filterBy,
    }
    componentDidMount() {
        const { filterBy, keep } = this.props
        this.setState({ filterBy, keep })
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

    onKeepEdit = (keepId) => {
        this.setState({ keepInEdit: keepId })
    }

    onColorChange = (color) => {
        const style = { backgroundColor: color }
        // const { keepInEdit } = this.state
        const keep = { ...this.state.keep, style }
        this.setState({ keep, keepInEdit: null })

        keepService.update(keep)
    }

    render() {
        const { keep } = this.state
        if (!keep) return
        const { keepInEdit } = this.state
        const { getKeepContent, onKeepEdit, onColorChange } = this
        console.log('keepInEdit:', keepInEdit)
        console.log('keep:', keep)
        // console.log('keep.style:', keep.style)
        return (
            <div className={`keep-preview ${keep.type}`}
                style={{ backgroundColor: `${keep.style ? keep.style.backgroundColor : "white"}` }}>
                {getKeepContent()}
                <div className="btns btns-keep-preview">
                    {/* <button className="btn btn-svg" title="Keep Note">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#000">
                        <path d="M10.8149 2.60571L3.28365 23.3401H0.205522L8.8774 0.590088H10.8618L10.8149 2.60571ZM17.1274 23.3401L9.58052 2.60571L9.53365 0.590088H11.518L20.2211 23.3401H17.1274ZM16.7368 14.9182V17.387H3.95552V14.9182H16.7368Z" />
                        </svg>
                    </button> */}
                    <button className="btn btn-svg" title="Change Color"
                        onClick={() => onKeepEdit(keep.id)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#000">
                            <path
                                d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.47.64 1.06.64 1.67A2.5 2.5 0 0 1 12 22zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5a.54.54 0 0 0-.14-.35c-.41-.46-.63-1.05-.63-1.65a2.5 2.5 0 0 1 2.5-2.5H16c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7z" />
                            <circle cx="6.5" cy="11.5" r="1.5" />
                            <circle cx="9.5" cy="7.5" r="1.5" />
                            <circle cx="14.5" cy="7.5" r="1.5" />
                            <circle cx="17.5" cy="11.5" r="1.5" />
                        </svg>
                    </button>
                    {/* <button className="btn btn-svg" title="Keep Video">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#000">
                        <path
                        d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.47.64 1.06.64 1.67A2.5 2.5 0 0 1 12 22zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5a.54.54 0 0 0-.14-.35c-.41-.46-.63-1.05-.63-1.65a2.5 2.5 0 0 1 2.5-2.5H16c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7z" />
                        <circle cx="6.5" cy="11.5" r="1.5" />
                        <circle cx="9.5" cy="7.5" r="1.5" />
                        <circle cx="14.5" cy="7.5" r="1.5" />
                        <circle cx="17.5" cy="11.5" r="1.5" />
                        </svg>
                    </button> */}
                    {/* <button className="btn btn-svg" title="Keep Todo">
                        <svg width="24" height="24" viewBox="0 0 24 24">
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>
                        </svg>
                    </button> */}
                </div>
                {keepInEdit &&
                    <div className="color-plt">
                        <button onClick={() => onColorChange('var(--clr-plt1)')} style={{ backgroundColor: "var(--clr-plt1)" }}></button>
                        <button onClick={() => onColorChange('var(--clr-plt2)')} style={{ backgroundColor: "var(--clr-plt2)" }}></button>
                        <button onClick={() => onColorChange('var(--clr-plt3)')} style={{ backgroundColor: "var(--clr-plt3)" }}></button>
                        <button onClick={() => onColorChange('var(--clr-plt4)')} style={{ backgroundColor: "var(--clr-plt4)" }}></button>
                        <button onClick={() => onColorChange('var(--clr-plt5)')} style={{ backgroundColor: "var(--clr-plt5)" }}></button>
                        <button onClick={() => onColorChange('var(--clr-plt6)')} style={{ backgroundColor: "var(--clr-plt6)" }}></button>
                        <button onClick={() => onColorChange('var(--clr-plt7)')} style={{ backgroundColor: "var(--clr-plt7)" }}></button>
                        <button onClick={() => onColorChange('var(--clr-plt8)')} style={{ backgroundColor: "var(--clr-plt8)" }}></button>
                        <button onClick={() => onColorChange('var(--clr-plt9)')} style={{ backgroundColor: "var(--clr-plt9)" }}></button>
                        <button onClick={() => onColorChange('var(--clr-plt10)')} style={{ backgroundColor: "var(--clr-plt10)" }}></button>
                        <button onClick={() => onColorChange('var(--clr-plt11)')} style={{ backgroundColor: "var(--clr-plt11)" }}></button>
                    </div>}
            </div>
        )
    }
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

function KeepTodo({ keep }) {
    return (
        <React.Fragment>
            <h2>KeepTodo</h2>
            {keep.info.title &&
                <h2 className="keep-title">{keep.info.title}</h2>}
            {keep.info.todos.map((todo, idx) => { <p key={idx}>{todo}</p> })}
        </React.Fragment>
    )
}