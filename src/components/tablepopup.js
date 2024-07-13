// tablepopup.js
import React, { useState } from 'react';
import './tablepopup.css'

const TablePopup = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        vehicleNumber: '',
        workshopVisitDate: '',
        dropBox: '',
        nextOilChange: '',
        nextTyreChange: '',
        noOfDays: '',
        complaintDetail: '',
        amountSpent: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className='popup-form-overlay-table'>
            <div className="popup-form-container-table">
                <div className="popup-form-table">
                    <span className="close-popup-table" onClick={onClose}>&times;</span>
                    <h2>Add Workshop Visit</h2>
                    <form className="popup-form" onSubmit={handleSubmit}>
                        <div className="popup-form-field-row">
                            <div className="popup-form-field-column">
                                <label>Vehicle Number</label>
                                <input name="vehicleNumber" className='popup-input-field' value={formData.vehicleNumber} onChange={handleChange} required />
                            </div>
                            <div className="popup-form-field-column">
                                <label>Workshop Visit Date</label>
                                <input type="date" name="workshopVisitDate" className='popup-input-field' value={formData.workshopVisitDate} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="popup-form-field-row">
                            <div className="popup-form-field-column">
                                <label>Next Oil Change</label>
                                <input type="text" className='popup-input-field' name="nextOilChange" value={formData.nextOilChange} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="popup-form-field-row">
                            <div className="popup-form-field-column">
                                <label>Next Tyre Change</label>
                                <input type="text" className='popup-input-field' name="nextTyreChange" value={formData.nextTyreChange} onChange={handleChange} required />
                            </div>
                            <div className="popup-form-field-column">
                                <label>No of Days</label>
                                <input type="number" className='popup-input-field' name="noOfDays" value={formData.noOfDays} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="popup-form-field-row">
                            <div className="popup-form-field-column">
                                <label>Complaint Detail</label>
                                <input name="complaintDetail" className='popup-input-field' value={formData.complaintDetail} onChange={handleChange} required />
                            </div>
                            <div className="popup-form-field-column">
                                <label>Amount Spent</label>
                                <input type="number" className='popup-input-field' name="amountSpent" value={formData.amountSpent} onChange={handleChange} required />
                            </div>
                        </div>
                        <button className='c-submit-button' type="submit">Submit</button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default TablePopup;
