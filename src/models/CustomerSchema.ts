const mongoose = require('mongoose');
const { Schema } = mongoose; 

const customerSchema = new Schema({
  id: Number,
  firstName: String,
  lastName: String
});

const Customers = mongoose.model('customers', customerSchema);


export {Customers}