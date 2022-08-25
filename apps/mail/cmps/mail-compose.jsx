
import { mailService } from "../services/mail.service.js"
export class MailCompose extends React.Component {
    state = {
        mail: {
            to: '',
            subject: '',
            body: '',
        }
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
        this.setState(({mail}) => ({
            mail: { ...mail, [field]: value }
        }))
    }

    render() {
    return <section className="mail-compose">
        <h1>hi from mail compose</h1>
        <form>
            <button onClick={(ev) => this.onCreateMail(ev, false)}>x</button>
            <input name="to" type="email" placeholder="to:"/>
            <input type="text" name="subject" placeholder="subject"/> 
            <input type="textarea" name="body"/>
            <button type="submit" onClick={(ev) => this.onCreateMail(ev,true)}>Send</button>
        </form>

    </section>

    }
}