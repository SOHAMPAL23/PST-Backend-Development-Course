const mongoose = require("mongoose");

const userSchema2 = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: addressSchema
});

const addressSchema = new mongoose.Schema({
  houseNumber: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// address schema 


