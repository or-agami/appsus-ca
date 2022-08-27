
// const { Link } = ReactRouterDOM
import { mailService } from "../services/mail.service.js"
export function MailPreview({ mail, category, toggleStar, toggleRead }) {
    const { id, subject, body, isRead, status, isStared } = mail
    let { from, to} = mail

    let { sentAt } = mail
    sentAt = mailService.getLocaleDate(sentAt)
    const user = mailService.getUser()

    if(from === user.email) from = 'Me'
    if(to === user.email) to = 'Me'

    return (
        <React.Fragment>
            <td className="mail-icons" onClick={(ev) => toggleStar(id, ev)}>
                <img src={`assets/icon/${isStared ? 'starred' : 'star'}.png`} alt="Star" />
                <span onClick={(ev) => toggleRead(id, ev)}>✉️</span>
            </td>
            {/* <td className="read" onClick={(ev) => toggleRead(id, ev)}>✉️</td> */}
            {(category !== 'sent' && category !== 'draft') && <td className="from">{from}</td>}
            {(category === 'sent' || category === 'draft') && <td className="from">{to}</td>}
            <td className="td-space"></td>
            <td className="subject">{subject}</td>
            <td className="td-space"></td>
            <td className="body">{body}</td>
            <td className="td-space td-flex"></td>
            <td className="sent-at">{sentAt}</td>
            {/* <td className="td-space"></td> */}
        </React.Fragment>
    )
}