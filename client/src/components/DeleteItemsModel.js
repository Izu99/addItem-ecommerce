// DeleteItemsModel.js
import React from "react";

const DeleteItemsModel = ({ show, handleClose, handleDelete, itemName }) => {
	return (
		<div className={`modal fade ${show ? "show" : ""}`} style={{ display: show ? "flex" : "none",marginTop:'auto', alignItems:'center', justifyContent:'center' }}>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Delete Item</h5>
						<button type="button" className="btn-close" onClick={handleClose}></button>
					</div>
					<div className="modal-body">
						<p>Are you sure you want to delete {itemName}?</p>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
						<button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteItemsModel;
