import { removeProductFromCart, updateQuantity } from "@/store/cart/cartSlice";
import { mergeClass } from "@/resources/utils/helper";
import { GoPlus } from "react-icons/go";
import { HiMiniMinusSmall } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import classes from "./Counter.module.css";
import { useEffect, useState } from "react";
import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";

export default function Counter({
  data = 1,
  setData,
  iconStyle,
  isInCart = false,
  productId = null,
  productVariant = null,
}) {
  const dispatch = useDispatch();
  const product = data?.product?.product;

  const [is375, setIs375] = useState(false);

  const handleRemoveItem = () => {
    dispatch(removeProductFromCart(product._id));
  };

  const handleIncrement = () => {
    const newQuantity = data + 1;
    setData(newQuantity);

    // If item is in cart, update cart quantity in real-time
    if (isInCart && productId && productVariant) {
      dispatch(
        updateQuantity({
          _id: productId,
          quantityChange: newQuantity,
          productVariant: productVariant,
        })
      );
    }
  };

  const handleDecrement = () => {
    if (data > 1) {
      const newQuantity = data - 1;
      setData(newQuantity);

      // If item is in cart, update cart quantity in real-time
      if (isInCart && productId && productVariant) {
        dispatch(
          updateQuantity({
            _id: productId,
            quantityChange: newQuantity,
            productVariant: productVariant,
          })
        );
      }
    } else if (data === 1 && isInCart && productId && productVariant) {
      // If quantity is 1 and we're decrementing, remove from cart
      dispatch(
        updateQuantity({
          _id: productId,
          quantityChange: 0,
          productVariant: productVariant,
        })
      );
      setData(1); // Reset to 1 instead of 0 to maintain UI consistency
    }
  };

  useEffect(() => {
    isMobileViewHook(setIs375, 376);
  }, []);

  return (
    <div className={classes.mainDiv}>
      <div className={classes?.controlButtons}>
        <HiMiniMinusSmall
          size={is375 ? 17 : 12}
          className={mergeClass(classes.icon, iconStyle, "cursor-pointer")}
          color="var(--text-color-v1)"
          onClick={handleDecrement}
        />

        <p className="fw-500 fs-17">{data}</p>

        <GoPlus
          className={mergeClass(classes.icon, iconStyle, "cursor-pointer")}
          size={is375 ? 17 : 12}
          color="var(--text-color-v1)"
          onClick={handleIncrement}
        />
      </div>
    </div>
  );
}
