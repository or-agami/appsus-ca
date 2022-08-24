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
        filterBy: {
            type: null,
        },
    }

    componentDidMount() {
        this.loadKeeps()
    }

    onSetFilterByType = (type) => {
        console.log('setState from KeepIndex')
        // this.setState({ filterBy: {...this.state.filterBy, type} })
        // this.setState({ filterBy: { type } })
        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                type
            }
        }), this.loadKeeps)

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
        const { keeps, filterBy } = this.state
        return (
            <section className="main-layout keep-index">
                <KeepNav onSetFilterByType={this.onSetFilterByType} filterBy={filterBy} />
                <div className="main-content">
                    <KeepAdd keeps={keeps} />
                    <KeepList keeps={keeps} filterBy={filterBy} />
                </div>
            </section>
        )
    }
}