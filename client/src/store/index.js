// store.js
import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./slices/itemSlice"; // Adjust the path as needed
import getItemReducer from "./slices/addItemDataSlice";

const store = configureStore({
	reducer: {
		items: itemReducer,
		itemData: getItemReducer,
	},
});

export default store;
