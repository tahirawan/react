import {currencyFormatter} from "../../util/formatting.js";

export default function CartItem({ item, onIncrease, onDecrease }) {
    return (
        <li key={item.id} className="cart-item">
            <p>
                <span>{item.name}</span>
                <span> ({ currencyFormatter.format(item.price) })</span>
            </p>
            <div className="cart-item-actions">
                <button onClick={onDecrease}>
                    -
                </button>
                <span>{item.quantity}</span>
                <button onClick={onIncrease}>
                    +
                </button>
            </div>
        </li>
    );
}
