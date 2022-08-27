import { KeepPreview } from "../cmps/keep-preview.jsx"

export function KeepList({ keeps, handleFocus, focusOn, onTodoClick, onTogglePinned }) {

    return (
        <React.Fragment>
            <section className="keep-list pinned-list">
                {keeps.filter(keep => keep.isPinned).map(keep =>
                    <KeepPreview
                        key={keep.id}
                        keep={keep}
                        focusOn={focusOn}
                        onTodoClick={onTodoClick}
                        onTogglePinned={onTogglePinned}
                        handleFocus={handleFocus} />
                )}
            </section>
            <section className="keep-list">
                {keeps.filter(keep => !keep.isPinned).map(keep =>
                    <KeepPreview
                        key={keep.id}
                        keep={keep}
                        focusOn={focusOn}
                        onTodoClick={onTodoClick}
                        onTogglePinned={onTogglePinned}
                        handleFocus={handleFocus} />
                )}
            </section>
        </React.Fragment>
    )
}