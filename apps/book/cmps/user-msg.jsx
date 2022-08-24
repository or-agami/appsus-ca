const { Link } = ReactRouterDOM

export class UserMsg extends React.Component {

    state = {
        userMsg: this.props.userMsg,
        bookId: this.props.bookId,
    }

    onMsgClick = () => {
        this.setState({ userMsg: null, bookId: null })
    }

    render() {
        const { userMsg, bookId } = this.state
        const { onCloseMsg } = this.props
        if (!bookId) return
        return (
            <section className={'user-msg'}>
                <button onClick={onCloseMsg}>x</button>
                <Link to={`/book/${bookId}`}><div className="btn-msg">"{userMsg}" Added successfully</div></Link>
            </section>
        )
    }
}
