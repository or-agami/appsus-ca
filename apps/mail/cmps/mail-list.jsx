
// import { mailService } from "../services/mail.service.js"
import { MailPreview } from "./mail-preview.jsx"

export function MailList({ mails, onOpenMail, category, toggleStar, toggleRead }) {

    return (
        <section className="list-container">
            <table className="mail-list">
                <tbody>
                    {mails.map(mail =>
                        <tr
                            onClick={() => onOpenMail(mail.id)}
                            className={`mail-preview ${mail.isRead ? 'read' : 'unread'}`}
                            key={mail.id}>
                            <MailPreview mail={mail} category={category} toggleStar={toggleStar} 
                            toggleRead={toggleRead}/>
                            {/* <td><button onClick={() => onRemoveMail(mail.id)}>X</button></td> */}
                        </tr>
                    )}
                </tbody>
            </table>
        </section>

    )

}