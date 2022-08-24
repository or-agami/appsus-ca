
const { Link } = ReactRouterDOM

export function KeepPreview({ keep }) {
    return (
        <Link to={"/keep/" + keep.id}>
            <div className="keep-preview">
                <h3 className="keep-title">{keep.type}</h3>
            </div>
        </Link>
    )
}