let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let user = new Schema(
    {
        userId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            unique: true,
            required: true,
        },

        password: {
            type: String,
            required: true
        },

        mobile: {
            type: Number,
            unique: true,
            required: true
        },

        state: {
            type: String,
            required: true
        },

        district: {
            type: String,
            required: true
        },

        address: {
            type: String,
            required: true
        },

        pincode: {
            type: Number,
            required: true
        },

    },
    { timestamps: true }
);

const UserModel = mongoose.model("Users", user);

module.exports = UserModel;
