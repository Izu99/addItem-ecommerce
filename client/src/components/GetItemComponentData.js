// GetItemDataComponent.js (or any suitable component name)
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for making HTTP requests

const GetItemDataComponent = () => {
	// State to store items fetched from the backend
	const [items, setItems] = useState([]);

	// Function to fetch items from the backend when the component mounts
	useEffect(() => {
		// Define a function to fetch items
		const fetchItems = async () => {
			try {
				// Make a GET request to fetch items from the backend
				const response = await axios.get('http://localhost:5000/items');
				setItems(response.data); // Update the state with fetched items
			} catch (error) {
				console.error("Error fetching items:", error);
			}
		};

		// Call the fetchItems function
		fetchItems();
	}, []); // Empty dependency array ensures the effect runs only once when the component mounts

	return (
		<div className='container'>
			<h1 className='mt-4 mb-4'>Item List</h1>
			<div className='row'>
				{/* Map through the items array and render each item */}
				{items.map((item) => (
					<div key={item._id} className='col-md-4 mb-4 col-sm-6'>
						<div className='card'>
							<img src={item.itemImageUrl} className='card-img-top' alt={item.itemName} />
							<div className='card-body'>
								<h5 className='card-title'>{item.itemName}</h5>
								<p className='card-text'>{item.itemDescription}</p>
								<p className='card-text'>Price: ${item.itemPrice}</p>
								<p className='card-text'>Category: {item.itemCategory}</p>
								<p className='card-text'>Subcategory: {item.itemSubCategory}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default GetItemDataComponent;
