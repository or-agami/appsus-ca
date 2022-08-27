
import { mailService } from "../services/mail.service.js"
export class MailCompose extends React.Component {
    state = {
        mail: {
            id: null,
            to: '',
            subject: '',
            body: '',
        }
    }

    componentDidMount() {
        this.loadMail()
    }

    loadMail = () => {
        const { mailId, mailKeep } = this.props
        console.log('mailKeep from MailCompose:', mailKeep)
        if (mailId === -2) {
            this.loadMailFromKeep(mailKeep)
            return
        }
        if (mailId === -1) return
        mailService.getById(mailId)
            .then((draftMail) => this.setState({ mail: draftMail }))
    }

    loadMailFromKeep = (keep) => {
        console.log('mail from MailCompose', keep)
        this.setState({ mail: { ...this.state.mail, ...keep } })
    }

    onCreateMail = (ev, isSent) => {
        ev.preventDefault()
        // this.props.onToggleCompose()
        mailService.createMail(this.state.mail, isSent)
            .then(this.props.onToggleCompose())
            .then(this.props.loadMails())

    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(({ mail }) => ({
            mail: { ...mail, [field]: value }
        }))
    }

    render() {
        // if (!this.state.mail) return
        const { to, subject, body } = this.state.mail
        return (
            <section className="mail-compose">
                <header>
                    <button onClick={(ev) => this.onCreateMail(ev, false)}>x</button>
                    <h1>New massage</h1>
                </header>
                <form>
                    <div className="to">
                        <input onChange={this.handleChange} name="to" value={to} type="email" placeholder="to:" />
                    </div>
                    <div className="subject">
                        <input onChange={this.handleChange} type="text" value={subject} name="subject" placeholder="subject" />
                    </div>
                    <div className="body">
                        <input onChange={this.handleChange} type="textarea" value={body} name="body" placeholder="body" />
                    </div>
                    <div className="footer">
                        <button type="submit" onClick={(ev) => this.onCreateMail(ev, true)}>Send</button>
                    </div>
                </form>
            </section>
        )
    }
}