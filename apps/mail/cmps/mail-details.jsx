import { mailService } from "../services/mail.service.js"
import { saveMail } from "../../../services/event-bus.service.js"

const { withRouter } = ReactRouterDOM

class _MailDetails extends React.Component {
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

    onSaveMailAsKeep = () => {
        const { mail } = this.state
        this.props.history.push('/keep')
        setTimeout(() => { saveMail(mail) }, 2000)
    }

    onToggleStar = (mailId) => {
        this.setState({ mail: { ...this.state.mail, isStared: !this.state.mail.isStared } })
        this.props.toggleStar(mailId)
    }

    render() {
        const { mail } = this.state
        if (!mail) return
        const { onGoBack, onDelete, onToggleStar, onSaveMailAsKeep } = this
        const { id, isStared, subject, body, from, to} = mail
        let { sentAt } = mail
        sentAt = mailService.getLocaleDate(sentAt)
        return (
            <article className="mail-details">
                <button onClick={onGoBack}>Go Back</button>
                <h2>
                    <button onClick={() => onToggleStar(id)}>
                        <img src={`assets/icon/${isStared ? 'starred' : 'star'}.png`} alt="Star" />
                    </button>
                    {subject} 
                    <span>{sentAt}</span>
                </h2>
                <p>{body}</p>
                <button onClick={onDelete}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                        <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path>
                        <path d="M9 8h2v9H9zm4 0h2v9h-2z"></path>
                    </svg>
                </button>
                <button onClick={onSaveMailAsKeep}>Save as Keep</button>
            </article>
        )
    }
}
export const MailDetails = withRouter(_MailDetails)

