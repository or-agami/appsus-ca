import { keepService } from "../services/keep.service.js"
import { KeepList } from "../cmps/keep-list.jsx"
import { KeepFilter } from "../cmps/keep-filter.jsx"
import { KeepHeader } from "../cmps/keep-Header.jsx"
import { KeepAdd } from "../cmps/keep-add.jsx"
import { KeepNav } from "../cmps/keep-nav.jsx"

export class KeepIndex extends React.Component {

    state = {
        keeps: [],
        keep: null,
        selectedKeep: null,
        filterBy: null,
    }

    componentDidMount() {
        this.loadKeeps()
    }

    loadKeeps = () => {
        keepService.query(this.state.filterBy)
            .then((keeps) => this.setState({ keeps }))
    }

    keepAdd = () => {
        keepService.keepAdd(this.state.keep)
            .then(() => this.setState({ keep: null }))
    }

    render() {
        const { keeps } = this.state
        return (
            <section className="main-layout keep-index">
                <KeepNav keeps={keeps} />
                <div className="main-content">
                    <KeepAdd keeps={keeps} />
                    <KeepList keeps={keeps} />
                </div>
            </section>
        )
    }
}
