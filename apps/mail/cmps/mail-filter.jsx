export class MailFilter extends React.Component {

    state = {
        filterBy: {
            txt: '',
            isRead: null,
        },
        sortBy: {
            prop: "",
            desc: null
        }
    }
    inputRef = React.createRef()

    componentDidMount() {
        this.inputRef.current.focus()
    }

    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
    }


    onSelectFilter = (ev) => {
        ev.preventDefault()
        const {value} = ev.target
        let readVal

        if(value === 'all') {
            readVal = null
        } else if(value === 'read') {
            readVal = true 
        } else if(value === 'unread') {
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

    onSetSortBy = ({target}) => {
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
    
            <button type="submit">
                <svg focusable="false" height="24px" viewBox="0 0 24 24" width="24px">
                    <path
                        d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z">
                    </path>
                    <path d="M0,0h24v24H0V0z" fill="none"></path>
                </svg>
            </button>
            <input
                ref={this.inputRef}
                type="text"
                placeholder="Search Email..."
                onChange={this.handleChange}
            />
            <input type="submit" hidden />
            <label htmlFor="filter-by">Filter by:</label>
            <select className="filter-select" name="filter-by" id="filter-by" onChange={this.onSelectFilter}>
                <option value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
            </select>
    
            <label htmlFor="sort-by">Sort by:</label>
            <select className="sort-select" name="prop" id="sort-by" onChange={this.onSetSortBy}>
                <option value="">Select Sorting</option>
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