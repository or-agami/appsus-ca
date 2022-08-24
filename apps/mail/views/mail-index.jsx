import { MailList } from "../cmps/mail-list.jsx"
import { MailNav} from "./mail-nav.jsx"
import { mailService } from "../services/mail.service.js"
import { MailPreview } from "../cmps/mail-preview.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"

export class MailIndex extends React.Component {
    state = {
        mails: [],
        filterBy: null,
    }

    componentDidMount() {
        this.loadMails()
        console.log('hiiiiii:', hiiiiii)
        
    }

    loadMails = () => {
        mailService.query()
            .then(mails => this.setState({ mails }))
            .then(mails => console.log('mails:', mails)
            )
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadMails)
        // showSuccessMsg('Filtered Cars')
    }

    render() {
        const { mails } = this.state
        if(!mails || )
        const { onSetFilter } = this
        return <section>
            <h1>mail app</h1>
                <MailNav />
                <MailFilter onSetFilter={onSetFilter} />
                <MailList mails={mails} />
            </section>
        
    }
}
