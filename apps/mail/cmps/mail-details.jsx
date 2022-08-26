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
        console.log('mailId:', mailId)

        mailService.getById(mailId)
            .then(mail => {
                if (!mail) return this.onGoBack()
                this.setState({ mail })
            })
    }

    onGoBack = () => {
        this.props.onOpenMail(null)
    }

    render() {
        const { mail } = this.state
        if (!mail) return
        return (
            <article className="mail-details">
                <h2>{mail.subject} <span>{mail.sentAt}</span></h2>
                <p>{mail.body}</p>
                <button onClick={this.onGoBack}>Exit</button>
            </article>
        )
    }
}

 // const user = mailService.getUser()
    // if(from === user.email) from === 'Me'
    // if(to === user.email) to === 'Me'