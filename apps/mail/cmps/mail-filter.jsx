export class MailFilter extends React.Component {

    state = {
        filterBy: {
            txt: '',
            isRead: null,
        },
        sortBy: {
            prop: 'date',
            desc: false
        }
    }

    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
    }

    onSelectFilter = (ev) => {
        ev.preventDefault()
        const { value } = ev.target
        let readVal

        if (value === 'all') {
            readVal = null
        } else if (value === 'read') {
            readVal = true
        } else if (value === 'unread') {
            readVal = false
        }

        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                isRead: readVal
            }
        }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }


    handleChange = (ev) => {
        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                txt: ev.target.value
            }
        }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    onSetSortBy = ({ target }) => {
        const field = target.name
        const value = target.type === 'checkbox' ? target.checked : target.value
        this.setState((prevState) => ({
            sortBy: {
                ...prevState.sortBy,
                [field]: value
            }
        }), () => {
            this.props.onSortBy(this.state.sortBy)
        })
    }

    render() {

        return (
            <form onSubmit={(ev) => this.onFilter(ev)}>

                <input type="submit" hidden />
                <label htmlFor="filter-by">Filter by:</label>
                <select className="filter-select" name="filter-by" id="filter-by" onChange={this.onSelectFilter}>
                    <option value="all">All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                </select>

                <label htmlFor="sort-by">Sort by:</label>
                <select className="sort-select" name="prop" id="sort-by" onChange={this.onSetSortBy}>
                    {/* <option value="">Select Sorting</option> */}
                    <option value="date">By Date</option>
                    <option value="title">By Title</option>
                </select>
                <label>
                    Descending
                    <input className="sort-desc" name="desc" type="checkbox" onInput={this.onSetSortBy} />
                </label>

            </form>
        )
    }
}