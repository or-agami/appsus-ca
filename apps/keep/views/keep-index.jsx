import { keepService } from "../services/keep.service.js"
import { KeepList } from "../cmps/keep-list.jsx"
import { KeepFilter } from "../cmps/keep-filter.jsx"
import { KeepHeader } from "../cmps/keep-Header.jsx"
import { KeepAdd } from "../cmps/keep-add.jsx"
import { KeepNav } from "../cmps/keep-nav.jsx"

export class KeepIndex extends React.Component {

    state = {
        keeps: [],
        selectedKeep: null,
        filterBy: {
            type: null,
        },
        focusOn: null,
    }

    componentDidMount() {
        this.loadKeeps()
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

    handleFocus = (focusOn) => {
        this.setState({ focusOn })
    }

    keepAdd = (keep, keepType) => {
        keepService.keepAdd(keep, keepType)
            .then(this.loadKeeps)
    }

    render() {
        const { onSetFilterByType, keepAdd, handleFocus } = this
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
                    />
                </div>
            </section>
        )
    }
}
