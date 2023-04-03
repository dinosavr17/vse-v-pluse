import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += action.payload.quantity;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        removeProduct: (state, action) => {
            state.quantity -= action.payload.quantity;
            // alert(action.payload.id);
            // let bug =state.products.map(product => product.quantity);
            // alert(bug);
            // alert(action.payload.quantity)
            state.total -= action.payload.price * action.payload.quantity;
            // state.products[0].quantity=state.products[0].quantity-action.payload.quantity;
            let ass;
            if (state.quantity > 0) {
                state.products.map((product, index) => {
                        console.log('Дошло', product.id === action.payload.id);
                        console.log('Количество', product.quantity)
                        console.log('Удаляем', action.payload.quantity)
                        ass = (product.id === action.payload.id) ? index : null;
                    }
                );
                state.products[ass].quantity = state.products[ass].quantity - action.payload.quantity;
            }
        },
        clearCart: (state, action) => {
            state.quantity = 0;
            state.total = 0;
            state.products = [];
        },
    },
});

export const { addProduct } = cartSlice.actions;
export const { removeProduct } = cartSlice.actions;
export const {clearCart} = cartSlice.actions;
export default cartSlice.reducer;