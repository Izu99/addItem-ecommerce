import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./slices/itemSlice";
import getItemReducer from "./slices/addItemDataSlice";
import updateItemReducer from "./slices/updateItemSlice"

const store = configureStore({
	reducer: {
		items: itemReducer,
		itemData: getItemReducer,
		updateItem: updateItemReducer, // Add the updateItemReducer to the reducer
	},
});

export default store;
