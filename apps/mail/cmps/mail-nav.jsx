import { mailService } from "../services/mail.service.js"
import { MailCompose } from "./mail-compose.jsx"

export class MailNav extends React.Component {

    state = {
        category: 'inbox',
        unreadMails: this.props.unreadMails,
    }

    componentDidMount() {
        const { category, unreadMails } = this.props
        this.setState({ category, unreadMails })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.unreadMails === this.props.unreadMails) return
        this.setState({ unreadMails: this.props.unreadMails })
    }
    onChangeCategory = (category) => {
        this.setState({ category })
        this.props.onChangeCategory(category)
    }

    render() {
        const { onToggleCompose } = this.props
        const { onChangeCategory } = this
        const { category, unreadMails } = this.state
        return (
            <nav className="btns side-nav side-nav-btns mail-nav">
                <button className="btn btn-svg btn-compose"
                    title="Compose"
                    onClick={() => onToggleCompose(-1)}>
                    <svg height="20" width="20">
                        <path
                            d="M4.5 17q-.604 0-1.052-.448Q3 16.104 3 15.5v-11q0-.625.448-1.062Q3.896 3 4.5 3h11q.625 0 1.062.438Q17 3.875 17 4.5v11q0 .604-.438 1.052Q16.125 17 15.5 17Zm5.5-4q.833 0 1.417-.583Q12 11.833 12 11h3.5V4.5h-11V11H8q0 .833.583 1.417Q9.167 13 10 13Z" />
                    </svg>
                    <span>Compose</span>
                </button>
                <button className={`btn btn-svg ${category === 'inbox' ? 'active' : ''}`}
                    onClick={() => onChangeCategory('inbox')}
                    title="Inbox">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                        <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z">
                        </path>
                    </svg>
                    <span>Inbox</span>
                    {unreadMails !== 0 && <span>{unreadMails}</span>}
                </button>
                <button className={`btn btn-img ${category === 'stared' ? 'active' : ''}`}
                    onClick={() => onChangeCategory('stared')}
                    title="Stared">
                    <img src="assets/icon/star.png" alt="Star" />
                    <span>Starred</span>
                </button>
                <button className={`btn btn-img ${category === 'sent' ? 'active' : ''}`}
                    onClick={() => onChangeCategory('sent')}
                    title="Sent Mails">
                    <img src="assets/icon/send.png" alt="Sent" />
                    <span>Sent</span>
                </button>
                <button className={`btn btn-svg ${category === 'trash' ? 'active' : ''}`}
                    onClick={() => onChangeCategory('trash')}
                    title="Trash">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                        <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path>
                        <path d="M9 8h2v9H9zm4 0h2v9h-2z"></path>
                    </svg>
                    <span>Trash</span>
                </button>
                <button className={`btn btn-svg ${category === 'drafts' ? 'active' : ''}`}
                    onClick={() => onChangeCategory('drafts')}
                    title="Drafts">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#000">
                        <path
                            d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.47.64 1.06.64 1.67A2.5 2.5 0 0 1 12 22zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5a.54.54 0 0 0-.14-.35c-.41-.46-.63-1.05-.63-1.65a2.5 2.5 0 0 1 2.5-2.5H16c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7z" />
                        <circle cx="6.5" cy="11.5" r="1.5" />
                        <circle cx="9.5" cy="7.5" r="1.5" />
                        <circle cx="14.5" cy="7.5" r="1.5" />
                        <circle cx="17.5" cy="11.5" r="1.5" />
                    </svg>
                    <span>Drafts</span>
                </button>
            </nav>
        )
    }
}