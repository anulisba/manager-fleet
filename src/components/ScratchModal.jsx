/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import './ScratchModal.css';

const ScratchModal = ({ show, vehicleNumber, onClose }) => {
  const [scratchImages, setScratchImages] = useState([]);
  const [vehicleName, setVehicleName] = useState('');

  useEffect(() => {
    const fetchScratchImages = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/fetch-scratch`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ vehicleNumber }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch scratch images');
        }

        const data = await response.json();
        console.log('Fetched Scratch Images:', data);
        setVehicleName(data.vehicleName);


        // Create an array of image objects with view and path, handling empty paths
        const imageObjects = [
          { vehicleNumber: vehicleNumber, view: 'LSV', ...data.scratchLsvData },
          { view: 'RSV', ...data.scratchRsvData },
          { view: 'FV', ...data.scratchFvData },
          { view: 'TV', ...data.scratchTvData },
          { view: 'BV', ...data.scratchBvData },
        ].filter(image => image.path);

        setScratchImages(imageObjects);
      } catch (error) {
        console.error('Error fetching scratch images:', error);
      }
    };

    if (show && vehicleNumber) {
      fetchScratchImages();
    }
  }, [show, vehicleNumber]);

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h1 className="modal-heading">SCRATCH GALLERY</h1>
        <h2>{`Vehicle: ${vehicleName}(${vehicleNumber})`}</h2> {/* Display the vehicle number below the heading */}
        <div className="images-container">
          {scratchImages.length > 0 ? (
            scratchImages.map((image, index) => (
              <div key={index} className="saved-image-container">
                <p>{`View: ${image.view}`}</p>
                <p>{`Image Name: ${image.name}`}</p>
                <p>{`Upload Date: ${image.date}`}</p>
                <img src={`http://localhost:5000/${image.path}`} alt={`Saved ${index}`} className="saved-image" />
              </div>
            ))
          ) : (
            <div className="saved-image-container">

              <p>No scratch images found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScratchModal;
