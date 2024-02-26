// addImageSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	imageUrl: null,
	loading: false,
	error: null,
};

const addImageSlice = createSlice({
	name: "addImage",
	initialState,
	reducers: {
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
		resetImage(state) {
			state.imageUrl = null;
			state.loading = false;
			state.error = null;
		},
	},
});

export const { uploadImageStart, uploadImageSuccess, uploadImageFailure, resetImage } =
	addImageSlice.actions;

export default addImageSlice.reducer;
