import { handleKeepSearch } from '../../../services/event-bus.service.js'

export class KeepFilter extends React.Component {

    state = {
        searchTerm: '',
    }

    handleChange = ({ target }) => {
        const value = target.value
        console.log('value from KeepFilter:', value)
        this.setState(({ searchTerm: value }), () => handleKeepSearch(this.state.searchTerm))
    }

    render() {
        const { searchTerm } = this.state
        return (
            <section className="book-filter">
                <form onSubmit={(ev) => ev.preventDefault()}>
                    <label htmlFor="by-title">Title:</label>
                    <input
                        type="text"
                        placeholder="By Title"
                        id="by-title"
                        name="title"
                        value={searchTerm}
                        onChange={this.handleChange} />
                </form>
            </section>
        )
    }
}