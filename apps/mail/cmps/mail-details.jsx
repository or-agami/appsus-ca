import { mailService } from "../services/mail.service.js"

export class MailDetails extends React.Component {
    state = {
        mail: null
    }

    componentDidMount() {
        this.loadMail()
    }

    loadMail = () => {
        const mailId = this.props.mailIsOpen
        mailService.getById(mailId)
            .then(mail => {
                if (!mail) return this.onGoBack()
                this.setState({ mail })
            })
    }

    onGoBack = () => {
        this.props.onOpenMail(null)
    }

    onDelete = () => {
        const { mail } = this.state
        const { onOpenMail, onRemoveMail } = this.props
        onOpenMail(null)
        onRemoveMail(mail.id)
    }

    onToggleStar = (mailId) => {
        this.setState({ mail: { ...this.state.mail, isStared: !this.state.mail.isStared } })
        this.props.toggleStar(mailId)
    }

    render() {
        const { mail } = this.state
        if (!mail) return
        const { onGoBack, onDelete, onToggleStar } = this
        return (
            <article className="mail-details">
                <h2>
                    <button onClick={() => onToggleStar(mail.id)}>
                        <img src={`assets/icon/${mail.isStared ? 'starred' : 'star'}.png`} alt="Star" />
                    </button>
                    {mail.subject}
                    <span>{mail.sentAt}</span>
                </h2>
                <p>{mail.body}</p>
                {/* <button onClick={toggleStar}>Star</button> */}
                <button onClick={onGoBack}>Exit</button>
                <button onClick={onDelete}>Delete</button>
            </article>
        )
    }
}

 // const user = mailService.getUser()
    // if(from === user.email) from === 'Me'
    // if(to === user.email) to === 'Me'