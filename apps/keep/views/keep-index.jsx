import { keepService } from "../services/keep.service.js"
import { KeepList } from "../cmps/keep-list.jsx"
import { KeepFilter } from "../cmps/keep-filter.jsx"
import { KeepHeader } from "../cmps/keep-Header.jsx"
import { KeepAdd } from "../cmps/keep-add.jsx"
import { KeepNav } from "../cmps/keep-nav.jsx"

export class NoteIndex extends React.Component {

    state = {
        keeps: [],
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

    render() {
        const { keeps } = this.state
        return (
            <section className="keep-index">
                <div>keep app</div>
                <KeepList keeps={keeps} />
            </section>
        )
    }
}
