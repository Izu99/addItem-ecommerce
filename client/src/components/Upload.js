import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { addItem } from '../store/slices/itemSlice';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import axios from 'axios'; // Import axios
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import sample_image from '../images/placeholder-image.jpg'

const AddItem = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [imgUrl, setImgUrl] = useState("");
    const [inputs, setInputs] = useState({
        itemName: "",
        itemDescription: "",
        itemPrice: "",
        itemCategory: "",
        itemSubCategory: ""
    });

    const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(selectedFile.name);
            fileRef.put(selectedFile)
                .then((snapshot) => {
                    snapshot.ref.getDownloadURL()
                        .then((downloadURL) => {
                            console.log(downloadURL);
                            setImgUrl(downloadURL);

                            // Send a POST request to the server with the image URL
                            fetch('http://localhost:5000/api/images', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ itemImageUrl: downloadURL }),
                            })
                            .then((response) => response.json())
                            .then((data) => console.log(data))
                            .catch((error) => console.error('Error:', error));

                            // Create a p tag with the message and URL
                            const pTag = document.createElement("p");
                            pTag.textContent = `File uploaded successfully. URL: ${downloadURL}`;
                            document.body.appendChild(pTag);
                        });
                });
        } else {
            console.log("No file selected");
        }
    };

    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const sendRequest = async () => {
            try {
                const res = await axios.post('http://localhost:5000/api/login', {
                    itemName: inputs.itemName,
                    itemDescription: inputs.itemDescription,
                    itemPrice: inputs.itemPrice,
                    itemCategory: inputs.itemCategory,
                    itemSubCategory: inputs.itemSubCategory
                });
                const data = await res.data;
                return data;
            } catch (err) {
                console.log(err);
            }
        };

        // this is a sample code

        sendRequest()
        .then(() => {
            // Dispatch the addItem action
            dispatch(addItem.addItem());

            // Navigate to '/item' route after successful form submission
            history.push("/item");
        })
        .catch((err) => {
            console.log(err);
            // Handle error if the request fails
        });
    };

    return (
        <div className="container">
            <h2 className='text-center mb-3'>Item Add</h2>
            <form className='add-item-form mt-2 w-75 p-2 mx-auto' onSubmit={handleSubmit}>
                <div className="form-group row mt-3">
                    <div className="col-sm-10 mx-auto">
                        <input type="text" className="form-control" id="item-name" placeholder="Item Name" value={inputs.itemName} />
                    </div>
                </div>
                <div className="form-group row mt-3">
                    <div className="col-sm-10 mx-auto">
                        <input type="text" className="form-control" id="item-description" placeholder="Item Description" value={inputs.itemDescription} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-5 mx-auto">
                        <div className="form-group mt-3">
                            <input type="text" className="form-control w-75" id="item-price" placeholder="Item Price" value={inputs.itemPrice} />
                            <select className="form-select w-100 mt-2" value={inputs.itemCategory}>
                                <option selected>Category</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <select className="form-select w-100 mt-2" value={inputs.itemSubCategory}>
                                <option selected>Sub Category</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-5 mt-3">
                        <div className="custom-file border" style={{ width: 180, height: 205 }}>
                            <input
                                type="file"
                                id="file-upload"
                                style={{ display: 'none', width: 180, height: 205 }}
                                onChange={handleFileUpload}
                            />
                            <label htmlFor="file-upload" className="upload-btn">
                                <img
                                    src={imgUrl || sample_image}
                                    alt="Sample"
                                    className="img-fluid"
                                    style={{ width: 180, height: 205 }}
                                />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="button text-center">
                    <button type='submit' className='btn btn-primary w-50 mt-4 mb-5'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddItem;





// import React, { useState } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/storage';
// import sample_image from '../images/placeholder-image.jpg'

// const Upload = () => {
//     const [imgUrl, setImgUrl] = useState("");

//     const handleFileUpload = (event) => {
//         const selectedFile = event.target.files[0];
//         if (selectedFile) {
//             const storageRef = firebase.storage().ref();
//             const fileRef = storageRef.child(selectedFile.name);
//             fileRef.put(selectedFile)
//                 .then((snapshot) => {
//                     snapshot.ref.getDownloadURL()
//                         .then((downloadURL) => {
//                             console.log(downloadURL);
//                             setImgUrl(downloadURL);

//                             // Send a POST request to the server with the image URL
//                             fetch('http://localhost:5000/api/images', {
//                                 method: 'POST',
//                                 headers: { 'Content-Type': 'application/json' },
//                                 body: JSON.stringify({ itemImageUrl: downloadURL }),
//                             })
//                                 .then((response) => response.json())
//                                 .then((data) => console.log(data))
//                                 .catch((error) => console.error('Error:', error));

//                             // Create a p tag with the message and URL
//                             const pTag = document.createElement("p");
//                             pTag.textContent = `File uploaded successfully. URL: ${downloadURL}`;
//                             document.body.appendChild(pTag);
//                         });
//                 });
//         } else {
//             console.log("No file selected");
//         }
//     };

//     return (
//         <div>
//             <form>
//                 <div className="container">
//                     <h2 className='text-center mb-3'>Item Add</h2>
//                     <form className='add-item-form mt-2'>
//                         <label htmlFor="item-number" className='ms-2 border py-1 px-3'>ES001</label>
//                         <div className="form-group row mt-3">

//                             <div className="col-sm-10">
//                                 <input type="text" className="form-control" id="item-name" placeholder="Item Name" />
//                             </div>
//                         </div>
//                         <div className="form-group row mt-3">

//                             <div className="col-sm-10">
//                                 <input type="text" className="form-control" id="item-description" placeholder="Item Description" />
//                             </div>
//                         </div>
//                         <div className="form-group row mt-3">
//                             <div className="col-sm-10 d-flex">
//                                 <input type="text" className="form-control w- me-1" id="item-price" placeholder="Item Price" />

//                                 <select className="form-select w-">
//                                     <option selected>Open this select menu</option>
//                                     <option value="1">One</option>
//                                     <option value="2">Two</option>
//                                     <option value="3">Three</option>
//                                 </select>

//                                 <select className="form-select w-">
//                                     <option selected>Open this select menu</option>
//                                     <option value="1">One</option>
//                                     <option value="2">Two</option>
//                                     <option value="3">Three</option>
//                                 </select>
//                             </div>
//                         </div>
//                         <div className="form-group row mt-3">
//                             <label htmlFor="file-upload" className="col-sm-2 col-form-label">Upload Image</label>
//                             <div className="col-sm-10">
//                                 <div className="custom-file">
//                                     <input
//                                         type="file"
//                                         id="file-upload"
//                                         style={{ display: 'none' }}
//                                         onChange={handleFileUpload}
//                                     />
//                                     <label htmlFor="file-upload" className="upload-btn">
//                                         <img
//                                             src={imgUrl || sample_image}
//                                             alt="Sample"
//                                             className="img-fluid"
//                                             style={{ width: 150, height: 150 }}
//                                         />

//                                     </label>
//                                 </div>
//                             </div>
//                         </div>


//                     </form>
//                 </div>



//             </form >
//         </div >
//     );
// };

// export default Upload;
