import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
	addItemStart,
	addItemSuccess,
	addItemFailure,
	uploadImageStart,
	uploadImageSuccess,
	uploadImageFailure,
	resetState,
} from "../store/slices/itemSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import firebaseconfig from "../firebaseConfig";
import sample_image from "../images/placeholder-image.jpg";

const AddItem = () => {
	const dispatch = useDispatch();
	const [selectedFile, setSelectedFile] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);
	const [inputs, setInputs] = useState({
		itemName: "",
		itemDescription: "",
		itemPrice: "",
		itemCategory: "",
		itemSubCategory: "",
	});

	const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);

        // Read and display the selected image
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    };

	const handleChange = (e) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});
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

				const itemData = {
					itemName: inputs.itemName,
					itemDescription: inputs.itemDescription,
					itemPrice: inputs.itemPrice,
					itemCategory: inputs.itemCategory,
					itemSubCategory: inputs.itemSubCategory,
					itemImageUrl: downloadURL,
				};

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
