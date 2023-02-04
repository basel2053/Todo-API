"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const groupSchema = new mongoose_1.Schema({
    name: {
        required: true,
        type: String,
    },
    color: String,
    todos: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'todo' }],
    userId: {
        required: true,
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
    },
});
const Group = (0, mongoose_1.model)('group', groupSchema);
exports.default = Group;
