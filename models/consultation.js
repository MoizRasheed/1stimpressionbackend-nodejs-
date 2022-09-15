
const { model, Schema } = require("mongoose");

const consultantSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

module.exports = model("Consultant", consultantSchema);