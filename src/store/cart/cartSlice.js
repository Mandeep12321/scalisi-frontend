import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addProductToCart(state, action) {
      const productToAdd = action.payload;
      let previousCart = current(state);
      previousCart = structuredClone(previousCart.cart);
      const existingProductIndex = previousCart.findIndex(
        (item) =>
          item.itemid === productToAdd.itemid &&
          item.selectedVariant?.value === productToAdd.selectedVariant?.value
      );
      if (existingProductIndex !== -1) {
        previousCart[existingProductIndex].selectedCount =
          previousCart[existingProductIndex].selectedCount +
          productToAdd.selectedCount;
      } else {
        // Ensure the product has a note field initialized
        const productWithNote = {
          ...productToAdd,
          note: productToAdd.note || "",
        };
        console.log("Adding new product with note field:", productWithNote);
        previousCart.push(productWithNote);
      }
      state.cart = previousCart;
    },
    updateNoteInCart(state, action) {
      const { note, productId, productVariant } = action.payload;

      let previousCart = current(state);
      previousCart = structuredClone(previousCart.cart);

      console.log(
        "Looking for product with itemid:",
        productId,
        "and variant:",
        productVariant
      );

      const existingProductIndex = previousCart.findIndex((item) => {
        const matches =
          item.itemid === productId &&
          item.selectedVariant?.value === productVariant;
        console.log(
          "Checking item:",
          item.itemid,
          "variant:",
          item.selectedVariant?.value,
          "matches:",
          matches
        );
        return matches;
      });

      console.log("Found product at index:", existingProductIndex);

      if (existingProductIndex !== -1) {
        console.log(
          "Before update - item note:",
          previousCart[existingProductIndex].note
        );
        previousCart[existingProductIndex].note = note;
        console.log(
          "After update - item note:",
          previousCart[existingProductIndex].note
        );
        state.cart = previousCart;
        console.log("Note updated successfully. New cart state:", state.cart);
      } else {
        console.log(
          "Product not found in cart. Available items:",
          previousCart.map((item) => ({
            itemid: item.itemid,
            variant: item.selectedVariant?.value,
          }))
        );
      }
    },
    removeNoteFromCart(state, action) {
      const { productId, productVariant } = action.payload;

      let previousCart = current(state);
      previousCart = structuredClone(previousCart.cart);

      const existingProductIndex = previousCart.findIndex((item) => {
        return (
          item.itemid === productId &&
          item.selectedVariant?.value === productVariant
        );
      });

      if (existingProductIndex !== -1) {
        previousCart[existingProductIndex].note = "";
        state.cart = previousCart;
        console.log("Note removed successfully. New cart state:", state.cart);
      }
    },
    updateQuantity(state, action) {
      const { _id, quantityChange, productVariant } = action.payload;
      const itemToUpdate = state.cart.find(
        (item) =>
          item.itemid === _id && item.selectedVariant?.value === productVariant
      );

      if (itemToUpdate) {
        itemToUpdate.selectedCount = quantityChange;

        // Remove item if quantity becomes 0
        if (quantityChange === 0) {
          state.cart = state.cart.filter(
            (item) =>
              !(
                item.itemid === _id &&
                item.selectedVariant?.value === productVariant
              )
          );
        }
      }
    },
    updateItemVariant(state, action) {
      const { parentId, variant } = action.payload;
      const productToUpdateVariant = state.cart.findIndex(
        (item) => item.itemid === parentId
      );
      if (productToUpdateVariant !== -1) {
        state.cart[productToUpdateVariant].selectedVariant = variant;
      }
    },
    removeProductFromCart(state, action) {
      const { _id, productVariant } = action.payload;

      if (productVariant) {
        // Remove specific variant
        state.cart = state.cart.filter(
          (item) =>
            !(
              item.itemid === _id &&
              item.selectedVariant?.value === productVariant
            )
        );
      } else {
        // Remove all variants of the product (backward compatibility)
        state.cart = state.cart.filter((item) => item.itemid !== _id);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addProductToCart,
  updateNoteInCart,
  removeNoteFromCart,
  incrementProductQuantity,
  decrementProductQuantity,
  removeProductFromCart,
  updateItemVariant,
  clearCart,
  updateQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
// cart = []
// 1 - push
// 2 - remove
// 3 - quantity
