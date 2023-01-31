"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const mongoose_1 = require("mongoose");
const groupSchema = new mongoose_1.Schema({
    name: {
        required: true,
        type: String,
    },
    userId: {
        required: true,
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
    },
});
exports.Group = (0, mongoose_1.model)('group', groupSchema);
