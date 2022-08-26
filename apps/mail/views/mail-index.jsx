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
        mailIsOpen: null,
        modalIsOpen: null,
        composeIsOpen: null,
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
        if (!mailId){
            this.setState({ mailIsOpen: null})  
        } else {
            mailService.getById(mailId)
            .then(mail => {
                if(mail.status === 'drafts'){
                    this.setState({ composeIsOpen: mailId })
                } else {
                    this.setState({ mailIsOpen: mailId })
                }
            })
        }
    }

    onToggleCompose = (mailId) => {
        if (!mailId) return this.setState({composeIsOpen: null })
        this.setState({ composeIsOpen: mailId })
    }

    render() {
        const { mails, filterBy, category, mailIsOpen, composeIsOpen } = this.state
        const { onSetFilter, onRemoveMail, onChangeCategory, onOpenMail, loadMails, onToggleCompose } = this
        return (
            <section className="main-layout mail-index">
                <MailNav
                    onChangeCategory={onChangeCategory}
                    category={category}
                    onToggleCompose={onToggleCompose}
                />
                <div className="main-content">
                    {/* <MailFilter
                        onSetFilter={onSetFilter}
                    /> */}
                    {(!mails || mails.length === 0) && <h1>No mails to display</h1>}
                    {!mailIsOpen &&
                        <MailList
                            mails={mails}
                            onRemoveMail={onRemoveMail}
                            onOpenMail={onOpenMail}
                            onToggleCompose={onToggleCompose}
                        />
                    }
                    {mailIsOpen &&
                        <MailDetails
                            mailIsOpen={mailIsOpen}
                            onOpenMail={onOpenMail}
                            onRemoveMail={onRemoveMail}
                        />
                    }
                    {/* {mailIsOpen && <MailCompose mailIsOpen={mailIsOpen} onOpenMail={onOpenMail} />} */}
                </div>
                {composeIsOpen && <MailCompose
                    mailId = {composeIsOpen}
                    onToggleCompose = {onToggleCompose}
                    loadMails = {loadMails} 
                />
                }
            </section>
        )
    }
}
