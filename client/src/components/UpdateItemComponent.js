import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateItem = () => {
	const { id } = useParams();
	const [inputs, setInputs] = useState({
		itemName: "",
		itemDescription: "",
		itemPrice: "",
		itemCategory: "",
		itemSubCategory: "",
		itemImageUrl: "", // State to store the image URL
	});

	useEffect(() => {
		const fetchItem = async () => {
			try {
				const response = await axios.get(`http://localhost:5000/items/${id}`);
				const itemData = response.data;

				setInputs({
					itemName: itemData.itemName,
					itemDescription: itemData.itemDescription,
					itemPrice: itemData.itemPrice,
					itemCategory: itemData.itemCategory,
					itemSubCategory: itemData.itemSubCategory,
					itemImageUrl: itemData.itemImageUrl, // Set the image URL
				});
			} catch (error) {
				console.error("Error fetching item:", error.message);
			}
		};

		fetchItem();
	}, [id]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputs({
			...inputs,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.put(`http://localhost:5000/items/${id}`, inputs);
			console.log("Item updated successfully");
		} catch (error) {
			console.error("Error updating item:", error.message);
		}
	};

	return (
		<div className='container'>
			<h2 className='text-center mb-3'>Update Item: {id}</h2>
			<form className='update-item-form mt-2 w-75 p-2 mx-auto' onSubmit={handleSubmit}>
				<div className='form-group row mt-3'>
					<div className='col-sm-10 mx-auto'>
						<input
							type='text'
							className='form-control'
							id='item-name'
							name='itemName'
							placeholder='Item Name'
							value={inputs.itemName}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className='form-group row mt-3'>
					<div className='col-sm-10 mx-auto'>
						<input
							type='text'
							className='form-control'
							id='item-description'
							name='itemDescription'
							placeholder='Item Description'
							value={inputs.itemDescription}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className='row'>
					<div className='col-5 mx-auto'>
						<div className='form-group mt-3'>
							<input
								type='text'
								className='form-control w-75'
								id='item-price'
								name='itemPrice'
								placeholder='Item Price'
								value={inputs.itemPrice}
								onChange={handleChange}
							/>
							<select
								className='form-select w-100 mt-2'
								name='itemCategory'
								value={inputs.itemCategory}
								onChange={handleChange}>
								<option value='' disabled>
									Select Category
								</option>
								<option value='Es001'>One</option>
								<option value='ER022'>Two</option>
								<option value='AS001'>Three</option>
							</select>

							<select
								className='form-select w-100 mt-2'
								name='itemSubCategory'
								value={inputs.itemSubCategory}
								onChange={handleChange}>
								<option value='' disabled>
									Select Sub Category
								</option>
								<option value='Es001'>One</option>
								<option value='ER022'>Two</option>
								<option value='AS001'>Three</option>
							</select>
						</div>
					</div>
					<div className='col-5 mx-auto'>
						<div className='custom-file border' style={{ width: 180, height: 205 }}>
							<input
								type='file'
								id='file-upload'
								style={{ display: "none", width: 180, height: 205 }}
							/>
							{/* Display the image using the itemImageUrl */}
							<img
								src={inputs.itemImageUrl}
								alt='Item'
								className='img-fluid'
								style={{ width: 180, height: 205 }}
							/>
						</div>
					</div>
				</div>
				<div className='button text-center'>
					<button type='submit' className='btn btn-primary w-50 mt-4 mb-5'>
						Submit
					</button>
				</div>
				{/* Submit button and other form fields */}
			</form>
		</div>
	);
};

export default UpdateItem;
