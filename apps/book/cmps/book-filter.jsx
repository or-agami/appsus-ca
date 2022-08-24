export class BookFilter extends React.Component {
    state = {
        filterBy: {
            title: '',
            minPrice: '',
            maxPrice: '',
        },
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                [field]: value
            }
        }), () => this.props.onSetFilter(this.state.filterBy))
    }

    render() {
        const { title, minPrice, maxPrice } = this.state
        return (
            <section className="book-filter">
                <form onSubmit={(ev) => ev.preventDefault()}>
                    <label htmlFor="by-title">Title:</label>
                    <input
                        type="text"
                        placeholder="By Title"
                        id="by-title"
                        name="title"
                        value={title}
                        onChange={this.handleChange} />


                    <label htmlFor="by-min-price by-max-price">Price:</label>
                    <input
                        type="number"
                        placeholder="Min Price"
                        id="by-min-price"
                        name="minPrice"
                        value={minPrice}
                        onChange={this.handleChange} />

                    {/* <label htmlFor="by-max-price">Price:</label> */}
                    <input
                        type="number"
                        placeholder="Max Price"
                        id="by-max-price"
                        name="maxPrice"
                        value={maxPrice}
                        onChange={this.handleChange} />
                </form>
            </section>
        )
    }
}