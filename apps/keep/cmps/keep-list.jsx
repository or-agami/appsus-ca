import { KeepPreview } from "../cmps/keep-preview.jsx"

export function KeepList({ keeps, handleFocus, focusOn }) {

    // function handleFocus() {
    //     handleFocus('KeepAdd')
    // }

    return (
        <section className="keep-list">
            {keeps.map(keep =>
                <KeepPreview
                    key={keep.id}
                    keep={keep}
                    focusOn={focusOn}
                    handleFocus={handleFocus} />
            )}
        </section>
    )
}