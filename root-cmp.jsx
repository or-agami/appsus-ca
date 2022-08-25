import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { BookIndex } from './apps/book/views/book-index.jsx'
import { BookDetails } from './apps/book/views/book-details.jsx'
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { MailCompose } from "./apps/mail/cmps/mail-compose.jsx"
import { MailDetails } from "./apps/mail/cmps/mail-details.jsx"
import { KeepIndex } from "./apps/keep/views/keep-index.jsx"

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Switch>
                <Route path="/book/:bookId" component={BookDetails} />
                <Route path="/book" component={BookIndex} />
                {/* <Route path="/mail/compose" component={MailCompose} /> */}
                {/* <Route path="/mail/details/:mailId" component={MailDetails} /> */}
                <Route path="/mail" component={MailIndex} />
                <Route path="/keep" component={KeepIndex} />
                <Route path="/about" component={About} />
                <Route path="/" component={Home} />
            </Switch>
        </section>
    </Router>
}
