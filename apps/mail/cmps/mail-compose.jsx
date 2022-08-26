
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
        const { mailId } = this.props
        if (mailId === -1) return
        mailService.getById(mailId)
            .then((draftMail) => this.setState({ mail: draftMail }))
    }

    onCreateMail = (ev, isSent) => {
        ev.preventDefault()
        this.props.onToggleCompose()
        mailService.createMail(this.state.mail, isSent)
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
        const { to, subject, body } = this.state.mail
        return (
            <section className="mail-compose">
                <h1>hi from mail compose</h1>
                <form>
                    <button onClick={(ev) => this.onCreateMail(ev, false)}>x</button>
                    <input onChange={this.handleChange} name="to" value={to} type="email" placeholder="to:" />
                    <input onChange={this.handleChange} type="text" value={subject} name="subject" placeholder="subject" />
                    <input onChange={this.handleChange} type="textarea" value={body} name="body" placeholder="body" />
                    <button type="submit" onClick={(ev) => this.onCreateMail(ev, true)}>Send</button>
                </form>
            </section>
        )
    }
}