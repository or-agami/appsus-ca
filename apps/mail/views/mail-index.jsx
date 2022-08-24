import { MailList } from "../cmps/mail-list.jsx"
import { MailNav } from "./mail-nav.jsx"
import { mailService } from "../services/mail.service.js"
import { MailPreview } from "../cmps/mail-preview.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"
// import {eventBusService} from "../../../services/event-bus.service.js"

export class MailIndex extends React.Component {
    state = {
        mails: [],
        filterBy: null,
    }

    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        mailService.query()
            .then(mails => this.setState({ mails }))
    }

    onRemoveMail = (mailId) => {
        let { mails } = this.state
        mailService.removeMail(mailId)

        mails = mails.filter(mail => mail.id !== mailId)
        this.setState({ mails })
        // eventBusService.showSuccessMsg('Email Removed')

    }


    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadMails)
        // showSuccessMsg('Filtered Cars')
    }

    render() {
        const { mails } = this.state
        if (!mails || mails.length === 0) return <h1>loading</h1>
        const { onSetFilter, onRemoveMail } = this
        return <section>
            <h1>mail app</h1>
            <MailNav />
            <MailFilter onSetFilter={onSetFilter} />
            <MailList mails={mails} onRemoveMail={onRemoveMail} />
        </section>
    }
}
