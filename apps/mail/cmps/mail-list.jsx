const { Link } = ReactRouterDOM

// import { mailService } from "../services/mail.service.js"
import { MailPreview } from "./mail-preview.jsx"
// import { MailFilter } from "./mail-filter.jsx"

export function MailList({mails, onRemoveMail}) {
    
    return <section className="mail-list">
        <div>Hello from mail list</div>
        <ul>
            {
                mails.map(mail => 
                   <div className="mail-preview" key={mail.id}>
                    <MailPreview mail={mail} />
                    <button onClick={() => onRemoveMail(mail.id)}>X</button>
                    <Link to={`/mail/details/${mail.id}`}><button>...</button></Link>
                    </div>
                )}
        </ul>
        <Link to={"mail/compose"}>New Email</Link>
    </section>

}