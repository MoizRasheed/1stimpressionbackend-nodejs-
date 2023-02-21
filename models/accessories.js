
const { model, Schema } = require("mongoose");

const accessoriesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    avatar: [
        {
            url:{
                type: String,
                default: ""
            },
            video:{
                type: Boolean
            }
        }
    ]
},
    { timestamps: true }
);

module.exports = model("accessories", accessoriesSchema);