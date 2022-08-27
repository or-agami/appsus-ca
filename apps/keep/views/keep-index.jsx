import { keepService } from "../services/keep.service.js"
import { KeepList } from "../cmps/keep-list.jsx"
import { KeepFilter } from "../cmps/keep-filter.jsx"
import { KeepHeader } from "../cmps/keep-Header.jsx"
import { KeepAdd } from "../cmps/keep-add.jsx"
import { KeepNav } from "../cmps/keep-nav.jsx"
import { eventBusService } from '../../../services/event-bus.service.js'

export class KeepIndex extends React.Component {

    state = {
        keeps: [],
        selectedKeep: null,
        filterBy: {
            type: null,
            searchTerm: '',
        },
        focusOn: null,
    }

    unsubscribe

    componentDidMount() {
        this.unsubscribe = eventBusService.on('keep-search', (searchTerm) => {
            this.setState(({ filterBy: { ...this.state.filterBy, searchTerm } }), () => this.loadKeeps())
        })
        this.loadKeeps()
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    loadKeeps = () => {
        keepService.query(this.state.filterBy)
            .then((keeps) => this.setState({ keeps }))
    }

    onSetFilterByType = (type) => {
        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                type
            }
        }), this.loadKeeps)
    }

    onTogglePinned = (keepId) => {
        const keeps = this.state.keeps
        const keepIdx = keeps.findIndex(keep => keep.id === keepId)
        const keep = keeps[keepIdx]
        keep.isPinned = !keep.isPinned
        keeps.splice(keepIdx, 1)
        this.setState({ keeps: [keep, ...keeps] })
        keepService.update(keep)
    }

    handleFocus = (focusOn) => {
        this.setState({ focusOn })
    }

    keepAdd = (keep, keepType) => {
        keepService.keepAdd(keep, keepType)
            .then(this.loadKeeps)
    }

    render() {
        const { onSetFilterByType, keepAdd, handleFocus, onTogglePinned } = this
        const { keeps, filterBy, focusOn } = this.state
        return (
            <section className="main-layout keep-index">
                <KeepNav
                    onSetFilterByType={onSetFilterByType}
                    filterBy={filterBy}
                    handleFocus={handleFocus}
                    focusOn={focusOn}
                />
                <div className="main-content">
                    <KeepAdd
                        keeps={keeps}
                        onKeepAdd={keepAdd}
                        handleFocus={handleFocus}
                        focusOn={focusOn}
                    />
                    <KeepList
                        keeps={keeps}
                        filterBy={filterBy}
                        handleFocus={handleFocus}
                        focusOn={focusOn}
                        onTogglePinned={onTogglePinned}
                    />
                </div>
            </section>
        )
    }
}
