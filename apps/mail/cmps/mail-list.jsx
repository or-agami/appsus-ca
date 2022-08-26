
// import { mailService } from "../services/mail.service.js"
import { MailPreview } from "./mail-preview.jsx"

export function MailList({ mails, onRemoveMail, onOpenMail }) {

    return <table className="mail-list">
        <tbody>
            {
                mails.map(mail =>
                    <tr
                        className={`mail-preview ${mail.isRead ? 'read' : 'unread'}`}
                        key={mail.id}>
                        <MailPreview mail={mail} />
                        <td><button onClick={() => onRemoveMail(mail.id)}>X</button></td>
                        <td><button onClick={() => onOpenMail(mail.id)}>...</button></td>
                    </tr>
                )}
        </tbody>
    </table>

}