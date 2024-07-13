import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ show, onClose, onImageSave }) => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [view, setView] = useState('LSV');
  const [image, setImage] = useState(null);
  const [filename, setFilename] = useState('');
  const [imageName, setImageName] = useState('');
  const [vehicleFound, setVehicleFound] = useState(false);
  const [verifyMsg, setVerifyMsg] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setFilename(file.name);
    }
  };

  const handleSave = async () => {
    const currentDate = new Date().toLocaleString();
    if (image && filename) {
      try {
        const formData = new FormData();
        formData.append('vehicleNumber', vehicleNumber);
        formData.append('view', view);
        formData.append('image', image);
        formData.append('filename', imageName);

        const response = await fetch('http://localhost:5000/api/upload-image', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Image uploaded successfully');
        } else {
          console.error('Failed to upload image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }

      onClose();
    } else if (!imageName.trim() || !image) {
      return;
    }
    onImageSave(imageName, currentDate);
    setImageName('');
    onClose();
  };

  const handleVerify = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/verify-vehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vehicleNumber }),
      });
      const data = await response.json();
      if (data.found) {
        setVehicleFound(true);
        setVerifyMsg('Vehicle found');
      } else {
        setVehicleFound(false);
        setVerifyMsg('Vehicle not found');
      }
    } catch (error) {
      console.error('Error verifying vehicle:', error);
    }
  };

  if (!show) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Upload Image</h2>
        <input
          type="text"
          placeholder="Enter vehicle number"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
        />
        <select value={view} className='c-input-field' style={{ width: '50%' }} onChange={(e) => setView(e.target.value)}>
          <option value="LSV">LSV</option>
          <option value="RSV">RSV</option>
          <option value="FV">FV</option>
          <option value="TV">TV</option>
          <option value="BV">BV</option>
        </select>
        <button className='c-submit-button' style={{ alignSelf: 'center', marginTop: '10px' }} onClick={handleVerify}>Verify</button>
        <p>{verifyMsg}</p>
        <input
          type="file"
          onChange={handleImageChange}
          disabled={!vehicleFound}
        />
        <label htmlFor="image-name">
          <span className="mandatory"> </span>
        </label>
        <input
          type="text"
          placeholder="Enter image name"
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
        />
        {image && (
          <div className="image-preview">
            <h3>Preview</h3>
            <img src={URL.createObjectURL(image)} alt="Preview" />
          </div>
        )}
        <button
          className='save-btn'
          onClick={handleSave}
          disabled={!imageName.trim() || !vehicleFound}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Modal;
