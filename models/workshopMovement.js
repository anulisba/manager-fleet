const mongoose = require('mongoose');

const workshopMovementSchema = new mongoose.Schema({
    vehicleNumber: { type: String, required: true },
    workshopVisitDate: { type: Date, required: true },
    dropBox: { type: String, default: null },
    nextOilChange: { type: String, required: true },
    nextTyreChange: { type: String, required: true },
    noOfDays: { type: Number, required: true },
    complaintDetail: { type: String, required: true },
    amountSpent: { type: Number, required: true },
});

module.exports = mongoose.model('WorkshopMovement', workshopMovementSchema);
