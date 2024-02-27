// getItemDataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define an async thunk to fetch item data from the backend
export const fetchItemData = createAsyncThunk("getItemData/fetchItemData", async () => {
	try {
		const response = await axios.get("/items"); // Assuming your backend serves items at the '/items' endpoint
		return response.data;
	} catch (error) {
		throw Error(error.message);
	}
});

// Create a slice for managing item data state
const getItemDataSlice = createSlice({
	name: "getItemData",
	initialState: {
		items: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		// Handle pending state while fetching item data
		builder.addCase(fetchItemData.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		// Handle fulfilled state when item data is successfully fetched
		builder.addCase(fetchItemData.fulfilled, (state, action) => {
			state.loading = false;
			state.items = action.payload;
		});
		// Handle rejected state when fetching item data fails
		builder.addCase(fetchItemData.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
	},
});

// Export actions and reducer from the slice
export const getItemDataActions = getItemDataSlice.actions;
export default getItemDataSlice.reducer;
