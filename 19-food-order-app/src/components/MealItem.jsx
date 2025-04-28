import {useContext} from "react";
import CartContext from "../store/shopping-cart-context.jsx";
import { currencyFormatter } from '../util/formatting.js';
import Button from "./UI/Button.jsx";

export default function MealItem({meal}) {
    const cartCtx = useContext(CartContext);
    return (
        <li key={meal.id} className="meal-item">
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt={meal.name}/>
                <div>
                    <h3>{meal.name}</h3>

                    <p className="meal-item-price">
                        { currencyFormatter.format(meal.price) }
                    </p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>

                <p className='meal-item-actions'>
                    <Button onClick={() => cartCtx.addItem(meal)}>Add to Cart</Button>
                </p>
            </article>
        </li>
    );
}
