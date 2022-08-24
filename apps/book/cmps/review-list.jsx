export function ReviewList({ reviews }) {
    return (
        <section className="review-list">
            {reviews.map(review =>
                <BookReview
                    key={review.id}
                    review={review} />
            )}
        </section>
    )
}

function BookReview({ review }) {
    const { reviewer, rating, textReview } = review
    return (
        <div className="review">
            <h3>Reviewer: {reviewer}</h3> <hr />
            <h4>Rating: {rating}</h4>
            <p>Review: {textReview}</p>
        </div>
    )
}