// import { mailService } from "../services/mail.service.js"
// const { Link } = ReactRouterDOM
export function MailPreview({ mail }) {
    const { from, id, subject, body, isRead, sentAt, to } = mail
    return (
        <React.Fragment>
            <td className="from">{from}</td>
            <td className="subject">{subject}</td>
            <td className="body">{body}</td>
            <td className="sent-at">{sentAt}</td>
        </React.Fragment>
    )
}

// id: 'e101',
//         subject: 'Miss you!',
//         body: 'Would love to catch up sometimes',
//         isRead: false,
//         sentAt: 1551133930594,
//         to: 'momo@momo.com'