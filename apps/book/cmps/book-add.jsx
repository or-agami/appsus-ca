import { bookService } from '../services/book.service.js'

export class BookAdd extends React.Component {
    state = {
        gBooks: [],
        title: null,
    }

    handleChange = ({ target }) => {
        this.setState({ title: target.value })
    }

    loadGBooks = (ev) => {
        ev.preventDefault()
        const query = this.state.title
        if (!query) return
        if (query.length <= 3) return
        bookService.getGBooks(query)
            .then((gBooks) => this.setState({ gBooks }))
    }

    onBookAdd = (bookId) => {
        this.setState({ gBooks: [], title: null })
        this.props.onBookAdd(bookId)
    }

    render() {
        const { gBooks, title } = this.state
        return (
            <section className="book-add">
                <form className="form-search" onSubmit={(ev) => this.loadGBooks(ev,)}>
                    <label htmlFor="bookTitleChoice">Add a Book</label>
                    <input className="input-search" type="text"
                        id="bookTitleChoice"
                        onChange={this.handleChange}
                        placeholder="Search by title" />
                    {title &&
                        <ul>
                            {gBooks.map((book) => <GBookList key={book.id} onBookAdd={this.onBookAdd} book={book} />)}
                        </ul>}
                </form>
            </section >
        )
    }
}

function GBookList({ book, onBookAdd }) {
    return (
        <li onClick={() => onBookAdd(book.id)}>+ {book.volumeInfo.title}</li>
    )
}