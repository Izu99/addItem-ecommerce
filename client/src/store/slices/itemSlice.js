import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    imageUrl: null,
    loading: false,
    error: null,
    items: [],
};

const itemSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        addItemStart(state) {
            state.loading = true;
            state.error = null;
        },
        addItemSuccess(state, action) {
            state.loading = false;
            state.items.push(action.payload);
        },
        addItemFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        uploadImageStart(state) {
            state.loading = true;
            state.error = null;
        },
        uploadImageSuccess(state, action) {
            state.loading = false;
            state.imageUrl = action.payload;
        },
        uploadImageFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        resetState(state) {
            state.loading = false;
            state.error = null;
            state.imageUrl = null;
        },
    },
});

export const {
    addItemStart,
    addItemSuccess,
    addItemFailure,
    uploadImageStart,
    uploadImageSuccess,
    uploadImageFailure,
    resetState,
} = itemSlice.actions;

export default itemSlice.reducer;
