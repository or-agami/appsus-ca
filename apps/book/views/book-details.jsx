import { utilService } from "../../../services/util.service"
import { bookService } from "../services/book.service.js"
import { ReviewAdd } from "../cmps/review-add.jsx"
const { Link } = ReactRouterDOM

export class BookDetails extends React.Component {

    state = {
        book: null,
    }

    componentDidMount() {
        this.loadBook()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
            this.loadBook()
        }
    }

    loadBook = () => {
        const { bookId } = this.props.match.params
        bookService.getById(bookId)
            .then((book) => this.setState({ book }))
    }

    onGoBack = () => {
        this.props.history.push('/book')
    }

    getReadingTime = () => {
        const { book } = this.state
        return (
            book.pageCount > 500 ? 'Long' :
                book.pageCount > 200 ? 'Decent' :
                    book.pageCount < 100 ? 'Short' :
                        'Average'
        )
    }

    onReviewAdd = (review) => {
        review.id = utilService.makeId()
        const { book } = this.state
        book.reviews.unshift(review)
        bookService.reviewAdd(book)
            .then(() => this.setState({ book }))
    }

    getCondition = () => {
        const currYear = new Date().getFullYear()
        return this.state.book.publishedDate + 10 < currYear ? 'Veteran Book' : 'New!'
    }

    render() {
        const { book } = this.state
        if (!book) return <h1>Loading...</h1>
        const { title, authors, thumbnail, description, listPrice, reviews, } = book
        const { amount, currencyCode } = listPrice
        const nextBookId = bookService.getNextId(book.id)
        const prevBookId = bookService.getNextId(book.id, true)

        return (
            <section className="book-details">
                <div className="book-info">

                    <div className="img-container">
                        <img src={thumbnail} />
                    </div>

                    <div className="info-container">
                        <h1>{title}</h1>
                        <h2>By: {authors}</h2>
                        <h5>Reading time: {this.getReadingTime()}</h5>
                        <h5>Condition: {this.getCondition()}</h5>
                        <h5 className={`${amount > 150 ? 'red' : 'green'}`}>
                            Price: {utilService.getFormatPrice(currencyCode, amount)}
                        </h5>
                        <hr />
                        <h4>Description:</h4>
                        <p>{description}</p>
                    </div>

                </div>
                <ReviewAdd reviews={reviews} onReviewAdd={this.onReviewAdd} />
                <div className="btn-nav">
                    <Link to={`/book/${prevBookId}`}><button >Previous Book</button></Link>
                    <button onClick={this.onGoBack}>Close</button>
                    <Link to={`/book/${nextBookId}`}><button >Next Book</button></Link>
                </div>
            </section>
        )
    }
}