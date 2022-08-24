// import { mailService } from "../services/mail.service.js"
// const { Link } = ReactRouterDOM
export function MailPreview({mail}) {
    const {id, subject, body, isRead, sentAt, to} = mail
    const className = isRead ? 'read' : 'unread'
    return <div className={className}><span className="to">to: {to}</span><span className="subject">{subject}</span>
    <span className="body">{body}</span><span className="sent-at">{sentAt}</span></div>
}

// id: 'e101',
//         subject: 'Miss you!',
//         body: 'Would love to catch up sometimes',
//         isRead: false,
//         sentAt: 1551133930594,
//         to: 'momo@momo.com'