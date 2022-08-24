// import { utilService } from "../../../services/util.service.js"
import { ReviewList } from './review-list.jsx'

export class ReviewAdd extends React.Component {

    state = {
        reviews: null,
        review: {
            reviewer: '',
            textReview: '',
            rating: 0,
        }
    }

    componentDidMount() {
        this.setState({ reviews: this.props.reviews })
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type !== 'select-one' ? target.value : +target.value
        this.setState((prevState) => ({
            review: {
                ...prevState.review,
                [field]: value
            }
        }))
    }

    onReviewSubmit = (ev) => {
        ev.preventDefault()
        this.props.onReviewAdd(this.state.review)
    }

    render() {
        const { reviews, review } = this.state
        return (
            <section className="review-add">
                <form onSubmit={this.onReviewSubmit}>

                    <h3>Add a review</h3>
                    
                    <label htmlFor="reviewer">Reviewer</label>
                    <input id="reviewer"
                        name="reviewer"
                        type="text"
                        placeholder="Full name"
                        // value={title}
                        onChange={this.handleChange}
                        required />

                    <label htmlFor="rating">Rating:</label>
                    <select id="rating"
                        name="rating"
                        onChange={this.handleChange}
                        required>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>

                    <label htmlFor="textReview">Review:</label>
                    <textarea id="textReview"
                        name="textReview"
                        rows="4"
                        placeholder="Enter a few word about your experience"
                        // value={minPrice}
                        onChange={this.handleChange}
                    >
                    </textarea>

                    <button>Submit</button>
                </form>
                {reviews &&
                    <ReviewList reviews={reviews} />}
            </section>
        )
    }
}