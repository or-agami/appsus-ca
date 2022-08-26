import { KeepPreview } from "../cmps/keep-preview.jsx"

export function KeepList({ keeps, handleFocus, focusOn, onTodoClick }) {

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
                    onTodoClick={onTodoClick}
                    handleFocus={handleFocus} />
            )}
        </section>
    )
}