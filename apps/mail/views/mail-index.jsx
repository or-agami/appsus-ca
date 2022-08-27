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
        sortBy: null,
        category: 'inbox',
        mailIsOpen: null,
        modalIsOpen: null,
        composeIsOpen: null,
        unreadMails: 0,
    }

    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        const { filterBy, category, sortBy } = this.state
        if (category === 'inbox') {
            mailService.query(filterBy, category, sortBy)
                .then(mails => this.setState({ mails, unreadMails: mails.filter(mail => !mail.isRead).length }))
        }
        else mailService.query(filterBy, category, sortBy)
            .then(mails => this.setState({ mails }))
    }

    onRemoveMail = (mailId) => {
        // let { mails } = this.state
        mailService.removeMail(mailId)
            .then(this.loadMails)
        // mails = mails.filter(mail => mail.id !== mailId)
        // this.setState({ mails })
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
        if (!mailId) {
            this.setState({ mailIsOpen: null })
        } else {
            // mailService.getById(mailId)
            const mail = this.state.mails.find(mail => mailId === mail.id)
            if (mail.status.includes('drafts')) {
                this.setState({ composeIsOpen: mailId })
            } else {
                let { mails } = this.state
                mail.isRead = true
                const mailIdx = this.state.mails.findIndex(mail => mailId === mail.id)
                mailService.update(mail)
                mails.splice(mailIdx, 1, mail)
                const unreadMails = mails.filter(mail => !mail.isRead).length
                this.setState({ mails, mailIsOpen: mailId, unreadMails })
            }
        }
    }

    onToggleCompose = (mailId) => {
        if (!mailId) return this.setState({ composeIsOpen: null })
        this.setState({ composeIsOpen: mailId })
    }

    onSortBy = (sortBy) => {
        this.setState({ sortBy }, this.loadMails)
    }


    render() {
        const { mails, filterBy, category, mailIsOpen, composeIsOpen, unreadMails } = this.state
        const { onSetFilter, onRemoveMail, onChangeCategory, onOpenMail, loadMails, onToggleCompose,
             onSortBy, toggleStar } = this
        return (
            <section className="main-layout mail-index">
                <MailNav
                    onChangeCategory={onChangeCategory}
                    category={category}
                    onToggleCompose={onToggleCompose}
                    unreadMails={unreadMails}
                />
                <div className="main-content">
                    <MailFilter
                        onSetFilter={onSetFilter}
                        onSortBy={onSortBy}
                    />
                    {(!mails || mails.length === 0) && <h1>No mails to display</h1>}
                    {!mailIsOpen &&
                        <MailList
                            mails={mails}
                            onRemoveMail={onRemoveMail}
                            onOpenMail={onOpenMail}
                            onToggleCompose={onToggleCompose}
                            category={category}
                            toggleStar={toggleStar}
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
                    mailId={composeIsOpen}
                    onToggleCompose={onToggleCompose}
                    loadMails={loadMails}
                />
                }
            </section>
        )
    }
}
