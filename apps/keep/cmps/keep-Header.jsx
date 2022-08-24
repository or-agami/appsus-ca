export class KeepHeader extends React.Component {
    state = {
        filterBy: {
            title: '',
        },
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                [field]: value
            }
        }), () => this.props.onSetFilter(this.state.filterBy))
    }

    render() {
        const { filterBy } = this.state
        return (
            <section className="keep-header">
                <div className="keep-logo"></div>
                <input
                    type="text"
                    placeholder="Search by title"
                    name="title"
                    value={filterBy.title}
                    onChange={this.handleChange} />
            </section>
        )
    }
}