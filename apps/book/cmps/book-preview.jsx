import { utilService } from "../../../services/util.service.js"

const { Link } = ReactRouterDOM

export function BookPreview({ book }) {
    const { amount, currencyCode } = book.listPrice
    return (
        <Link to={"/book/" + book.id}>
            <div className="book-preview">
                <h3 className="book-title">{book.title}</h3>
                <h4>{utilService.getFormatPrice(currencyCode, amount)}</h4>
                <img src={book.thumbnail} />
            </div>
        </Link>
    )
}