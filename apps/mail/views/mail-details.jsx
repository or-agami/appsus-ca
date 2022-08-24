import { mailService } from "../services/mail.service.js"

export class MailDetails extends React.Component {
    state = {
        mail: null
    }

    componentDidMount() {
        this.loadMail()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.mailId !== this.props.match.params.mailId) {
            this.loadMail()
        }
    }

    loadMail = () => {
        const { mailId } = this.props.match.params
        mailService.getById(mailId)
        .then(mail => {
            if (!mail) return this.onGoBack()
            this.setState({mail})
        })
    }

    onGoBack = () => {
        return this.props.history.push('/mail')
    }


    render() {
        return <article className="mail-details">
            <h2>mail</h2>
        </article>
    }
}