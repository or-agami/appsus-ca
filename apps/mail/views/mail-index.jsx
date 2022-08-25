import { MailList } from "../cmps/mail-list.jsx"
import { MailNav } from "../cmps/mail-nav.jsx"
import { mailService } from "../services/mail.service.js"
import { MailPreview } from "../cmps/mail-preview.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailCompose } from "../cmps/mail-compose.jsx"
import { MailDetails } from "../cmps/mail-details.jsx"
// import {eventBusService} from "../../../services/event-bus.service.js"

export class MailIndex extends React.Component {
    state = {
        mails: [],
        filterBy: null,
        category: 'inbox',
        // screen: 'mail-list'
        mailIsOpen: null,
    }

    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        const { filterBy, category } = this.state
        mailService.query(filterBy, category)
            .then(mails => this.setState({ mails }, console.log('mails:', mails)))
    }

    onRemoveMail = (mailId) => {
        let { mails } = this.state
        mailService.removeMail(mailId)

        mails = mails.filter(mail => mail.id !== mailId)
        this.setState({ mails })
        // eventBusService.showSuccessMsg('Email Removed')
    }

    onChangeCategory = (category) => {
        this.setState({ category }, this.loadMails)
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadMails)
        // showSuccessMsg('Filtered Cars')
    }

    onOpenMail = (mailId) => {
        this.setState({ mailIsOpen: mailId })
    }

    render() {
        const { mails, filterBy, category, mailIsOpen } = this.state
        if (!mails || mails.length === 0) return <h1>loading</h1>
        const { onSetFilter, onRemoveMail, onChangeCategory, onOpenMail, loadMails } = this
        return (
            <section className="main-layout mail-index">
                <MailNav
                    onChangeCategory={onChangeCategory}
                    category={category}
                    loadMails={loadMails}
                />
                <div className="main-content">
                    {/* <MailFilter
                        onSetFilter={onSetFilter}
                    /> */}
                    {!mailIsOpen &&
                        <MailList
                            mails={mails}
                            onRemoveMail={onRemoveMail}
                            onOpenMail={onOpenMail}
                        />
                    }
                    {mailIsOpen &&
                        <MailDetails
                            mailIsOpen={mailIsOpen}
                            onOpenMail={onOpenMail}
                        />
                    }
                    {/* {mailIsOpen && <MailCompose mailIsOpen={mailIsOpen} onOpenMail={onOpenMail} />} */}
                </div>
            </section>
        )
    }
}
