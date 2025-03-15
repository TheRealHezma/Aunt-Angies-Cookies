import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find(i => i.id === item.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...item, quantity: 1 });
            }
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.items = state.items.filter(item => item.id !== itemId);
        },
        clearCart: (state) => {
            state.items = [];
        },
        updateItemQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            if (quantity === 0) {
                // Remove the item if quantity is set to 0
                state.items = state.items.filter(item => item.id !== id);
            } else {
                const existingItem = state.items.find(item => item.id === id);
                if (existingItem) {
                    existingItem.quantity = quantity; // Update quantity
                }
            }
        },
    },
});

export const { addItem, removeItem, clearCart, updateItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
