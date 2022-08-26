
import { mailService } from "../services/mail.service.js"
export class MailCompose extends React.Component {
    state = {
        mail: {
            to: '',
            subject: '',
            body: '',
        }
    }

    loadMail = () => {
        if(this.props.mailId === -1) return
        mailService.getById(mailId)
            .then(draftMail => this.setState({mail:{to, subject, body} = draftMail}, console.log(this.state.mail)))
            // .then(draftMail => this.setState({mail:{to: draftMail.to,
            //                                         subject: draftMail.subject,
            //                                         body: draftMail.body}}))
    }

    onCreateMail = (ev, isSent) => {
        ev.preventDefault()
        this.props.onToggleNewMail()
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
        return (
            <section className="mail-compose">
                <h1>hi from mail compose</h1>
                <form>
                    <button onClick={(ev) => this.onCreateMail(ev, false)}>x</button>
                    <input onChange={this.handleChange} name="to" type="email" placeholder="to:" />
                    <input onChange={this.handleChange} type="text" name="subject" placeholder="subject" />
                    <input onChange={this.handleChange} type="textarea" name="body" placeholder="body" />
                    <button type="submit" onClick={(ev) => this.onCreateMail(ev, true)}>Send</button>
                </form>
            </section>
        )
    }
}