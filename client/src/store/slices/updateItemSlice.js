import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	error: null,
	success: false,
};

const updateItemSlice = createSlice({
	name: "updateItem",
	initialState,
	reducers: {
		updateItemStart: (state) => {
			state.loading = true;
			state.error = null;
			state.success = false;
		},
		updateItemSuccess: (state) => {
			state.loading = false;
			state.success = true;
		},
		updateItemFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.success = false;
		},
		resetUpdateItemState: (state) => {
			state.loading = false;
			state.error = null;
			state.success = false;
		},
	},
});

export const { updateItemStart, updateItemSuccess, updateItemFailure, resetUpdateItemState } =
	updateItemSlice.actions;

export default updateItemSlice.reducer;
