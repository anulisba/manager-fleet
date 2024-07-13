const mongoose = require('mongoose');

const scratchSchema = new mongoose.Schema({
    vehicleName: { type: String, required: true },
    vehicleNumber: { type: String, required: true, unique: true },
    vehicleType: { type: String, default: null },
    scratchLSV: { type: [String], default: [] },
    scratchRSV: { type: [String], default: [] },
    scratchFV: { type: [String], default: [] },
    scratchTV: { type: [String], default: [] },
    scratchBV: { type: [String], default: [] },
    scratchOrgLsv: { type: String, default: null },
    scratchOrgRsv: { type: String, default: null },
    scratchFvOrg: { type: String, default: null },
    scratchTvOrg: { type: String, default: null },
    scratchBvOrg: { type: String, default: null },
});

module.exports = mongoose.model('scratch', scratchSchema);