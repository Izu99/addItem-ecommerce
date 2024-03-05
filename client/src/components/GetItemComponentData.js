// GetItemDataComponent.js

// Import necessary dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteItemModal from "./DeleteItemsModel"; // Import the DeleteItemModal component
import { NavLink } from "react-router-dom"; // Import NavLink from React Router
import "../styles/ViewItems.css";

const GetItemDataComponent = () => {
    // State to manage modal visibility
    const [showModal, setShowModal] = useState(false);
    // State to store the item to delete
    const [itemToDelete, setItemToDelete] = useState(null);
    // State to store items fetched from the backend
    const [items, setItems] = useState([]);

    // Function to fetch items from the backend when the component mounts
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get("http://localhost:5000/items");
                setItems(response.data);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);

    // Function to handle modal close
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Function to handle modal open
    const handleShowModal = (item) => {
        setItemToDelete(item);
        setShowModal(true);
    };

    // Function to handle item deletion
    const handleDeleteItem = async () => {
        try {
            // Make an HTTP request to delete the item
            await axios.delete(`http://localhost:5000/items/${itemToDelete._id}`);
            // Remove the deleted item from the list
            setItems(items.filter((item) => item._id !== itemToDelete._id));
            // Close the modal
            setShowModal(false);
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <div className='container'>
            <h1 className='mt-4 mb-4'>Item List</h1>
            <div className='row'>
                {items.map((item) => (
                    <div key={item._id} className='col-lg-3 col-md-4 mb-4 col-sm-6 col-xm-2'>
                        <div className='card'>
                            <div className='card-head'>
                                <p className='card-title'>{item.itemName}</p>
                                <div className='card-img-actions text-center'>
                                    <img src={item.itemImageUrl} className='card-img img-fluid' alt={item.itemName} />
                                </div>
                            </div>
                            <div className='card-body'>
                                <p className='card-text'>{item.itemDescription}</p>
                                <p className='card-text'>Price: ${item.itemPrice}</p>
                                <p className='card-text'>Category: {item.itemCategory}</p>
                                <p className='card-text'>Subcategory: {item.itemSubCategory}</p>
                                <button onClick={() => handleShowModal(item)}>Delete</button>
                                <NavLink to={`/update/${item._id}`} className='update-link'>
                                    <i className='fas fa-pencil-alt'></i> Update
                                </NavLink>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Render the DeleteItemModal component */}
            <DeleteItemModal
                show={showModal}
                handleClose={handleCloseModal}
                handleDelete={handleDeleteItem}
                itemName={itemToDelete ? itemToDelete.itemName : ""}
            />
        </div>
    );
};

export default GetItemDataComponent;
