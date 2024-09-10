import React from 'react';
import './ConfirmDeleteModal.css';

function ConfirmDeleteModal({ onClose, onConfirm }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Are you sure you want to delete?</h3>
                <div className="modal-buttons">
                    <button onClick={onConfirm} className="confirm-button">Yes, Delete</button>
                    <button onClick={onClose} className="cancel-button">Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDeleteModal;
