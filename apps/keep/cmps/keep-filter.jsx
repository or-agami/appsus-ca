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
            <section className="keep-filter">
                <form onSubmit={(ev) => ev.preventDefault()}>
                    <label htmlFor="by-title">
                        <svg focusable="false" height="24px" viewBox="0 0 24 24" width="24px">
                            <path
                                d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z">
                            </path>
                            <path d="M0,0h24v24H0V0z" fill="none"></path>
                        </svg>
                    </label>
                    <input
                        type="text"
                        placeholder="Search in keep"
                        id="by-title"
                        name="title"
                        value={searchTerm}
                        onChange={this.handleChange} />
                </form>
            </section>
        )
    }
}