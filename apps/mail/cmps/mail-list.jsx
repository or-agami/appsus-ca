const {Link} = ReactRouterDOM

import { MailPreview } from "./mail-preview.jsx"
import { MailFilter } from "./mail-filter.jsx"

export class MailList extends React.Component {
    state = {
        emails: []
    }
    render() {
        return <section className="mail-list">
            <div>Hello from mail list</div>
            <MailFilter />
            <ul>
                <li key="1"><MailPreview /></li>
                <li key="2"><MailPreview /></li>
                <li key="3"><MailPreview /></li>
                <li key="4"><MailPreview /></li>
            </ul>
            <Link to={"mail/compose"}>New Email</Link>
        </section>
    }
}