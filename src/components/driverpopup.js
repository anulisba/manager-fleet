import React, { useState, useEffect } from 'react';
import CustomAlert from './customAlert';
import './driverpopup.css' // Import the custom alert component
// Assuming you create popupform.css for styling

const DriverPopupForm = ({ driver, onSubmit, onClose }) => {
    const [driverName, setDriverName] = useState("");
    const [driverUsername, setDriverUsername] = useState("");
    const [driverPassword, setDriverPassword] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [driverLicenceNumber, setDriverLicenceNumber] = useState("");
    const [driverLicenceExpiryDate, setDriverLicenceExpiryDate] = useState("");
    const [alertMessage, setAlertMessage] = useState(""); // State for alert message

    useEffect(() => {
        if (driver) {
            setDriverName(driver.driverName || "");
            setDriverUsername(driver.driverUsername || "");
            setDriverPassword(driver.driverPassword || "");
            setMobileNumber(driver.mobileNumber || "");
            setDriverLicenceNumber(driver.driverLicenceNumber || "");
            setDriverLicenceExpiryDate(driver.driverLicenceNumber ? new Date(driver.driverLicenceExpiryDate).toISOString().split('T')[0] : "");
        }
    }, [driver]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            id: driver._id,
            driverName,
            driverUsername,
            driverPassword,
            mobileNumber,
            driverLicenceNumber,
            driverLicenceExpiryDate,
        };
        try {
            const response = await fetch(`http://localhost:5000/updatedriver`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setAlertMessage('Driver updated successfully!');
                onSubmit(formData);
                onClose();
            } else {
                const errorText = await response.text();
                setAlertMessage(`Error updating driver: ${errorText}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setAlertMessage('Error updating driver');
        }
    };

    const closeAlert = () => {
        setAlertMessage("");
    };

    return (
        <div className="popup-form-overlay-driv">
            <div className="popup-form-container-driv">
                <span className="close-popup-driv" onClick={onClose}>&times;</span>
                <form className="popup-form-driv" style={{ paddingRight: '50px' }} onSubmit={handleSubmit}>
                    <h2>Edit Driver Details</h2>
                    <div className="popup-form-field-row-driv">
                        <div className="popup-form-field-column-driv">
                            <label htmlFor="drivername">Driver Name</label>
                            <input
                                type="text"
                                name="drivername"
                                id="drivername"
                                placeholder="Driver Name"
                                className="popup-input-field-driv"
                                value={driverName}
                                onChange={(e) => setDriverName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="popup-form-field-column-driv">
                            <label htmlFor="driverusername">Driver ID</label>
                            <input
                                type="text"
                                name="driverusername"
                                id="driverusername"
                                placeholder="Driver ID"
                                className="popup-input-field-driv"
                                value={driverUsername}
                                onChange={(e) => setDriverUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="popup-form-field-row-driv">
                        <div className="popup-form-field-column-driv">
                            <label htmlFor="driverpassword">Password</label>
                            <input
                                type="text"
                                name="driverpassword"
                                id="driverpassword"
                                placeholder='Password'
                                className="popup-input-field-driv"
                                value={driverPassword}
                                onChange={(e) => setDriverPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="popup-form-field-column-driv">
                            <label htmlFor="drivermobile">Mobile Number</label>
                            <input
                                type="text"
                                name="drivermobile"
                                id="drivermobile"
                                placeholder='Mobile Number'
                                className="popup-input-field-driv"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="popup-form-field-row-driv">
                        <div className="popup-form-field-column-driv">
                            <label htmlFor="driverlicenceno">Driver Licence Number</label>
                            <input
                                type="text"
                                name="driverlicenceno"
                                id="driverlicenceno"
                                className="popup-input-field-driv"
                                placeholder='Licence Number'
                                value={driverLicenceNumber}
                                onChange={(e) => setDriverLicenceNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="popup-form-field-column-driv">
                            <label htmlFor="driverlicenceexp">Driver Licence Expiry</label>
                            <input
                                type="date"
                                name="driverlicenceexp"
                                id="driverlicenceexp"
                                className="popup-input-field-driv"
                                value={driverLicenceExpiryDate}
                                onChange={(e) => setDriverLicenceExpiryDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="popup-submit-button-driv">Submit</button>
                </form>
                {alertMessage && <CustomAlert message={alertMessage} onClose={closeAlert} />}
            </div>
        </div>
    );
};

export default DriverPopupForm;
