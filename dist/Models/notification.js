"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const notificationSchema = new mongoose_1.Schema({
    message: {
        type: String,
        required: true,
    },
    seen: {
        type: Boolean,
        required: true,
        default: false,
    },
    userId: {
        required: true,
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
    },
}, {
    timestamps: true,
});
const Notification = (0, mongoose_1.model)('notification', notificationSchema);
exports.default = Notification;
