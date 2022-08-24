const { Link } = ReactRouterDOM

// import { mailService } from "../services/mail.service.js"
// import { MailPreview } from "./mail-preview.jsx"
// import { MailFilter } from "./mail-filter.jsx"

export function MailList(mails) {
    
    return <section className="mail-list">
        <div>Hello from mail list</div>
        <ul>
            {
                mails.map(mail => 
                   <li className="mail-preview" key={mail.id}>
                    <MailPreview mail={mail} />
                    </li>
                )}
        </ul>
        <Link to={"mail/compose"}>New Email</Link>
    </section>

}