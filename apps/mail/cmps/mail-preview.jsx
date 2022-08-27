
// const { Link } = ReactRouterDOM
import { mailService } from "../services/mail.service.js"
export function MailPreview({ mail, category, toggleStar, toggleRead }) {
    const { id, subject, body, isRead, status, isStared } = mail
    let { from, to } = mail

    let { sentAt } = mail
    sentAt = mailService.getLocaleDate(sentAt)


    return (
        <React.Fragment>
            <td className="star" onClick={(ev) => toggleStar(id, ev)}>
                <img src={`assets/icon/${isStared ? 'starred' : 'star'}.png`} alt="Star" />
            </td>
            <td className="read btn-svg" onClick={(ev) => toggleRead(id, ev)}>
                {!isRead &&
                    <svg viewBox="0 0 512 512">
                        <path d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z" />
                    </svg>}
                {isRead &&
                    <svg viewBox="0 0 512 512">
                        <path d="M493.6 163c-24.88-19.62-45.5-35.37-164.3-121.6C312.7 29.21 279.7 0 256.4 0H255.6C232.3 0 199.3 29.21 182.6 41.38c-118.8 86.25-139.4 101.1-164.3 121.6C6.75 172 0 186 0 200.8v263.2C0 490.5 21.49 512 48 512h416c26.51 0 48-21.49 48-47.1V200.8C512 186 505.3 172 493.6 163zM303.2 367.5C289.1 378.5 272.5 384 256 384s-33.06-5.484-47.16-16.47L64 254.9V208.5c21.16-16.59 46.48-35.66 156.4-115.5c3.18-2.328 6.891-5.187 10.98-8.353C236.9 80.44 247.8 71.97 256 66.84c8.207 5.131 19.14 13.6 24.61 17.84c4.09 3.166 7.801 6.027 11.15 8.478C400.9 172.5 426.6 191.7 448 208.5v46.32L303.2 367.5z" />
                    </svg>}
            </td>
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