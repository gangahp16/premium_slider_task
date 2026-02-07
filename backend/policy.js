const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  policyName: {
    type: String,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  premium: {
    type: Number,
    required: true
  },
  policyType: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Policy", policySchema);