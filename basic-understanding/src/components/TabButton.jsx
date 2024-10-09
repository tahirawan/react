//export default function TabButton(props) {
export default function TabButton({children, onClick, isSelected}) {

    return (
        <li>
            <button className={isSelected ? 'active' : undefined } onClick={onClick}>
                { children }
            </button>
        </li>
    )
}
