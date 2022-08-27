import { handleMailSearch } from '../../../services/event-bus.service.js'

export class MailSearch extends React.Component {

    state = {
        searchTerm: '',
    }

    handleChange = ({ target }) => {
        const value = target.value
        console.log('value from MailSearch:', value)
        this.setState(({ searchTerm: value }), () => handleMailSearch(this.state.searchTerm))
    }

    render() {
        const { searchTerm } = this.state
        return (
            <section className="mail-filter">
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