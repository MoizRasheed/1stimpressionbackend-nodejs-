
const { model, Schema } = require("mongoose");
const { video } = require("../cloud/cloudinary");

const accessoriesSchema = new Schema({
    name: {
        type: String,
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