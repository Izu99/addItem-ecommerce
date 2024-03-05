import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	addItemStart,
	uploadImageStart,
	uploadImageSuccess,
	uploadImageFailure,
} from "../store/slices/itemSlice";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import firebaseconfig from "../firebaseConfig";
import sample_image from "../images/placeholder-image.jpg";

const AddItem = () => {
	const dispatch = useDispatch();
	const [selectedFile, setSelectedFile] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);
	const [tagInput, setTagInput] = useState("");
	// Assuming this is part of your component
	const [tags, setTags] = useState([]);

	const [inputs, setInputs] = useState({
		itemName: "",
		itemDescription: "",
		itemPrice: "",
		itemCategory: "",
		itemSubCategory: "",
		itemTags: "", // New field for tags
	});

	const [categories, setCategories] = useState([]);
	const [subcategories, setSubcategories] = useState([]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get("http://localhost:5000/categories");
				setCategories(response.data);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};

		fetchCategories();
	}, []);

	const fetchSubcategories = async (category) => {
		try {
			const response = await axios.get(`http://localhost:5000/subcategories/${category}`);
			setSubcategories(response.data);
		} catch (error) {
			console.error("Error fetching subcategories:", error);
		}
	};

	const handleFileChange = (e) => {
		setSelectedFile(e.target.files[0]);

		const reader = new FileReader();
		reader.onloadend = () => {
			setImageUrl(reader.result);
		};
		reader.readAsDataURL(e.target.files[0]);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputs({
			...inputs,
			[name]: value,
		});

		if (name === "itemCategory") {
			fetchSubcategories(value);
		}
	};

	const handleTagInputChange = (e) => {
		setTagInput(e.target.value);
	};

	const handleAddTag = () => {
		if (tagInput.trim()) {
			setTags([...tags, tagInput.trim()]);
			setTagInput(""); // Clear the input field
		}
	};

	// Function to handle tag removal
	const handleRemoveTag = (indexToRemove) => {
		const updatedTags = tags.filter((_, index) => index !== indexToRemove);
		setTags(updatedTags);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (selectedFile) {
			try {
				dispatch(uploadImageStart());
				const storageRef = firebase.storage().ref();
				const fileRef = storageRef.child(selectedFile.name);
				const snapshot = await fileRef.put(selectedFile);
				const downloadURL = await snapshot.ref.getDownloadURL();
				dispatch(uploadImageSuccess(downloadURL));

				// Split and trim tags
				// const itemTags = tags.map((tag) => tag.trim());
				const itemTags = tags.map((tag) => tag.trim()).join(", ");

				const itemData = {
					itemName: inputs.itemName,
					itemDescription: inputs.itemDescription,
					itemPrice: inputs.itemPrice,
					itemCategory: inputs.itemCategory,
					itemSubCategory: inputs.itemSubCategory,
					itemTags: itemTags, // Include the processed tags
					itemImageUrl: downloadURL,
				};
				console.log(itemData);

				const res = await axios.post("http://localhost:5000/items", itemData);
			} catch (error) {
				dispatch(uploadImageFailure(error.message));
				console.error("Error:", error);
			}
		} else {
			console.log("No file selected");
		}
	};

	return (
		<div className='container'>
			<h2 className='text-center mb-3'>Item Add</h2>
			<form className='add-item-form mt-2 w-75 p-2 mx-auto' onSubmit={handleSubmit}>
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
								{categories.map((category) => (
									<option key={category} value={category}>
										{category}
									</option>
								))}
							</select>

							{inputs.itemCategory && (
								<div className='form-group row mt-3'>
									<div className='col-sm-10 mx-auto'>
										<select
											className='form-select w-100 mt-2'
											name='itemSubCategory'
											value={inputs.itemSubCategory}
											onChange={handleChange}>
											<option value='' disabled>
												Select Sub Category
											</option>
											{subcategories.map((subcategory) => (
												<option key={subcategory} value={subcategory}>
													{subcategory}
												</option>
											))}
										</select>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				{/* Other input fields */}
				<div className='form-group row mt-3'>
					<div className='col-sm-10 mx-auto'>
						<textarea
							className='form-control'
							id='tags'
							name='tags'
							placeholder='Tags (separate by commas)'
							value={tagInput}
							onChange={handleTagInputChange}></textarea>
					</div>
					<button className='btn btn-primary' onClick={handleAddTag}>
						Add Tag
					</button>
				</div>
				<div>
					<div className='row'>
						<div className='col-1'>
							<p className='d-flex'>Tags: </p>
						</div>
						<div className='col-11'>
							{tags.map((tag, index) => (
								<div
									key={index}
									className='badge bg-secondary m-1 py-2 px-1'
									style={{ fontSize: "14px" }}>
									#{tag}
									<button
										className='btn-close ps-3'
										style={{ fontSize: "8px" }}
										onClick={() => handleRemoveTag(index)}
										aria-label='close'></button>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* File upload field */}
				<div className='col-5 mx-auto'>
					<div className='custom-file border' style={{ width: 180, height: 205 }}>
						<input
							type='file'
							id='file-upload'
							style={{ display: "none", width: 180, height: 205 }}
							onChange={handleFileChange}
						/>
						<label htmlFor='file-upload' className='upload-btn'>
							<img
								src={imageUrl || sample_image}
								alt='Sample'
								className='img-fluid'
								style={{ width: 180, height: 205 }}
							/>
						</label>
					</div>
				</div>
				<div className='button text-center'>
					<button
						type='submit'
						className='btn btn-primary w-50 mt-4 mb-5'
						onChange={handleFileChange}>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddItem;
