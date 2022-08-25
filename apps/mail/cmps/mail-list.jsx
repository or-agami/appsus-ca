
// import { mailService } from "../services/mail.service.js"
import { MailPreview } from "./mail-preview.jsx"

export function MailList({ mails, onRemoveMail, onOpenMail }) {

        return <section className="mail-list">
            <div>Hello from mail list</div>
            <ul>
                {
                    mails.map(mail =>
                        <div className="mail-preview" key={mail.id}>
                            <MailPreview mail={mail} />
                            <button onClick={() => onRemoveMail(mail.id)}>X</button>
                            <button onClick={() => onOpenMail(mail.id)}>...</button>
                        </div>
                    )}
            </ul>
        </section>

}