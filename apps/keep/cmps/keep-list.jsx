import { KeepPreview } from "../cmps/keep-preview.jsx"

export function KeepList({ keeps, filterBy }) {

    return (
        <section className="keep-list">
            {keeps.map(keep =>
                <KeepPreview
                    key={keep.id}
                    keep={keep}
                    filterBy={filterBy} />
            )}
        </section>
    )
}