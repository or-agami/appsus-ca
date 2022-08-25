const ColorInputIcon = '../../../assets/icon/color-input.svg'

export class KeepAdd extends React.Component {
    state = {
        newKeep: {
            title: '',
            content: '',
        },
        keepType: 'keep-txt',
        isFocus: false,
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

    onKeepAdd = (ev) => {
        ev.preventDefault()
        const { newKeep, keepType } = this.state
        this.props.onKeepAdd(newKeep, keepType)
    }

    onChangeKeepType = (type) => {
        this.setState({ keepType: type })
    }


    handleInputFocus = () => {
        this.setState({ isFocus: true });
    }

    handleInputBlur = () => {
        this.setState({ isFocus: false });
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
        const { keepType, isFocus } = this.state
        const { handleChange, getPlaceHolder, onChangeKeepType, handleInputFocus, handleInputBlur } = this
        return (
            <section className="keep-add"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}>
                <form className="form form-keep-add"
                    onSubmit={(ev) => this.onKeepAdd(ev)}>
                    {isFocus &&
                        <input className="input input-txt"
                            name="title"
                            type="text"
                            onChange={handleChange}
                            placeholder="Title" />}
                    <input className="input input-txt"
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
                        <button
                            className={`btn btn-svg ${keepType === 'keep-img' ? 'active' : ''}`}
                            title="Keep Image"
                            onClick={() => onChangeKeepType('keep-img')}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="#000">
                                <path
                                    d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z" />
                            </svg>
                        </button>
                        <button
                            className={`btn btn-svg ${keepType === 'keep-video' ? 'active' : ''}`}
                            title="Keep Video"
                            onClick={() => onChangeKeepType('keep-video')}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="#000">
                                <path
                                    d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.47.64 1.06.64 1.67A2.5 2.5 0 0 1 12 22zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5a.54.54 0 0 0-.14-.35c-.41-.46-.63-1.05-.63-1.65a2.5 2.5 0 0 1 2.5-2.5H16c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7z" />
                                <circle cx="6.5" cy="11.5" r="1.5" />
                                <circle cx="9.5" cy="7.5" r="1.5" />
                                <circle cx="14.5" cy="7.5" r="1.5" />
                                <circle cx="17.5" cy="11.5" r="1.5" />
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