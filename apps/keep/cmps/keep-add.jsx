import { eventBusService } from "../../../services/event-bus.service.js"
// const ColorInputIcon = '../../../assets/icon/color-input.svg'

export class KeepAdd extends React.Component {
    state = {
        newKeep: {
            title: '',
            content: '',
        },
        keepType: 'keep-txt',
        isFocus: false,
    }

    unsubscribe

    componentDidMount() {
        this.unsubscribe = eventBusService.on('save-mail', (mail) => {
            console.log('mail:', mail)
            this.onSaveKeepFromMail(mail)
        })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        console.log('value from KeepAdd:', value)
        this.setState((prevState) => ({
            newKeep: {
                ...prevState.newKeep,
                [field]: value
            }
        }))
    }

    onSaveKeepFromMail = (mail) => {
        const { from, subject, body } = mail
        const newKeep = {
            content: {
                title: from,
                subject,
                body
            }
        }
        this.props.onKeepAdd(newKeep, 'keep-mail')
    }

    onKeepAdd = (ev) => {
        ev.preventDefault()
        const { newKeep, keepType } = this.state
        this.props.onKeepAdd(newKeep, keepType)
    }

    onChangeKeepType = (type) => {
        this.setState({ keepType: type })
    }


    handleFocus = () => {
        this.setState({ isFocus: true })
        this.props.handleFocus('KeepAdd')
    }

    handleBlur = (ev) => {
        // this.setState({ isFocus: false })
        if (!ev.currentTarget.contains(ev.relatedTarget)) {
            this.setState({ isFocus: false })
            console.log('blur from KeepAdd')
        }
    }

    onImgUpload = (ev) => {
        if (ev.target.files && ev.target.files[0]) {
            const img = ev.target.files[0]
            this.setState({ imgSrc: URL.createObjectURL(img) })
            setTimeout((ev) => onKeepAdd(ev), 200)
        }
    }

    getPlaceHolder = () => {
        const { keepType } = this.state
        switch (keepType) {
            case 'keep-txt':
                return 'Write something...'
            case 'keep-img':
                return 'Enter image URL'
            case 'keep-video':
                return 'Enter video URL'
            case 'keep-todos':
                return 'Write todos with comma separated'

            default:
                break;
        }
    }

    render() {
        // const { isFocus } = this.props
        const { keepType, isFocus } = this.state
        const { handleChange, getPlaceHolder, onChangeKeepType, handleFocus, handleBlur } = this
        return (
            <section className="keep-add"
                onBlur={(ev) => handleBlur(ev)}
                onFocus={handleFocus}
            // onFocus={handleFocus}
            >
                <form className="form form-keep-add"
                    onSubmit={(ev) => this.onKeepAdd(ev)}>
                    {isFocus &&
                        <input className="input input-title"
                            name="title"
                            type="text"
                            onChange={handleChange}
                            placeholder="Title" />}
                    <input className={`input input-txt ${isFocus ? 'active' : ''}`}
                        name="content"
                        type="text"
                        onChange={handleChange}
                        placeholder={getPlaceHolder()} />
                    <input type="submit" hidden />
                </form>
                {isFocus &&
                    <div className="btns btns-keep-add">
                        <button
                            className={`btn btn-svg ${keepType === 'keep-txt' ? 'active' : ''}`}
                            title="Keep Note"
                            onClick={() => onChangeKeepType('keep-txt')}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="#000">
                                <path d="M10.8149 2.60571L3.28365 23.3401H0.205522L8.8774 0.590088H10.8618L10.8149 2.60571ZM17.1274 23.3401L9.58052 2.60571L9.53365 0.590088H11.518L20.2211 23.3401H17.1274ZM16.7368 14.9182V17.387H3.95552V14.9182H16.7368Z" />
                            </svg>
                        </button>
                        {/* <button
                            className={`btn btn-svg ${keepType === 'keep-img' ? 'active' : ''}`}>
                        </button> */}
                        <label
                            title="Keep Image"
                            onClick={() => onChangeKeepType('keep-img')}
                            htmlFor="file-upload" className="custom-file-upload">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="#000">
                                <path
                                    d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z" />
                            </svg>
                        </label>
                        <input id="file-upload" type="file" onChange={this.onImgUpload} />
                        <button
                            className={`btn btn-svg ${keepType === 'keep-video' ? 'active' : ''}`}
                            title="Keep Video"
                            onClick={() => onChangeKeepType('keep-video')}>
                            {/* <svg viewBox="0 0 24 24" fill="#000">
                                <path
                                    d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.47.64 1.06.64 1.67A2.5 2.5 0 0 1 12 22zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5a.54.54 0 0 0-.14-.35c-.41-.46-.63-1.05-.63-1.65a2.5 2.5 0 0 1 2.5-2.5H16c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7z" />
                                <circle cx="6.5" cy="11.5" r="1.5" />
                                <circle cx="9.5" cy="7.5" r="1.5" />
                                <circle cx="14.5" cy="7.5" r="1.5" />
                                <circle cx="17.5" cy="11.5" r="1.5" />
                            </svg> */}
                            <svg width="24" height="24" viewBox="0 0 576 512">
                                <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                            </svg>
                        </button>
                        <button
                            className={`btn btn-svg ${keepType === 'keep-todos' ? 'active' : ''}`}
                            title="Keep Todos"
                            onClick={() => onChangeKeepType('keep-todos')}>
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>
                            </svg>
                        </button>
                    </div>}
            </section>
        )
    }
}