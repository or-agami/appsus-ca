import { bookService } from '../services/book.service.js'
import { BookFilter } from '../cmps/book-filter.jsx'
import { BookList } from '../cmps/book-list.jsx'
import { BookAdd } from '../cmps/book-add.jsx'
import { UserMsg } from '../cmps/user-msg.jsx'

export class BookIndex extends React.Component {
    state = {
        books: [],
        filterBy: null,
        selectedBook: null,
        userMsgId: null,
        userMsg: null,
    }

    componentDidMount() {
        this.loadBooks()
    }

    loadBooks = () => {
        bookService.query(this.state.filterBy)
            .then((books) => this.setState({ books }))
    }

    onCloseMsg = () => {
        this.setState({ userMsgId: null })
    }

    onBookAdd = (bookId) => {
        bookService.addGBook(bookId)
            .then((book) => this.setState(({ books }) => ({ books: [book, ...books], userMsgId: bookId, userMsg: book.title })))
            .then(() => setTimeout(this.onCloseMsg, 3000))
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks)
    }

    render() {
        const { books, userMsgId, userMsg } = this.state
        return (
            <section className="book-app">
                {userMsgId && <UserMsg bookId={userMsgId} userMsg={userMsg} onCloseMsg={this.onCloseMsg} />}

                <BookAdd onBookAdd={this.onBookAdd} />

                <BookFilter
                    filterBy={this.state.filterBy}
                    onSetFilter={this.onSetFilter} />

                <BookList books={books} />

            </section>
        )
    }
}