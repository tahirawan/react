import classes from './CartButton.module.css';
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const CartButton = (props) => {
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const dispatch = useDispatch();

    const toggleCartHandler = () => {
        dispatch(uiActions.toggleCart());
    }
  return (
    <button onClick={toggleCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
