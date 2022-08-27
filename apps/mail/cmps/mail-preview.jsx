
// const { Link } = ReactRouterDOM
import { mailService } from "../services/mail.service.js"
export function MailPreview({ mail, category }) {
    const { from, id, subject, body, isRead, to, status } = mail
    const { toggleStar } = props

    let {sentAt} = mail
    sentAt = mailService.getLocaleDate(sentAt) 

    return (
        <React.Fragment>
            <td className="star" onclick={()=> toggleStar(id)}>⭐</td>
            {(category !== 'sent' && category!== 'draft') && <td className="from">{from}</td>}
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