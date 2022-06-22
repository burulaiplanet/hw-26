import { BASE_URL } from "../../utils/constants/general";
import { cartActions } from "./cartSlice";
import { uiActions } from "./uiSlice";

export const sendCartData = (formState) => {
  return (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending data o cart !",
      })
    );
    fetch(`${BASE_URL}/cart.json`, {
      method: "POST",
      body: JSON.stringify(formState),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Sending cart data failed");
        }
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success !",
            message: "Sent cart data successfully !",
          })
        );
        return response.json();
      })
      .then((data) => {})
      .catch((error) => {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error !",
            message: "Sending cart data failed !",
          })
        );
      });
  };
};

export const getHandler = () => {
  return (dispatch) => {
    fetch(`${BASE_URL}/cart.json`)
      .then((response) => response.json())
      .then((data) => {
        for (let key in data) {
          dispatch(
            cartActions.addItemToCart({
              id: key,
              title: data[key].title,
              price: +data[key].price,
            })
          );
        }
      });
  };
};
