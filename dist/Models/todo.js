"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
    title: {
        required: true,
        type: String,
    },
    status: {
        type: String,
        default: 'unfinished',
    },
    endDate: {
        type: Date,
    },
    groupId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'group',
    },
    userId: {
        required: true,
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
    },
}, { timestamps: true });
const Todo = (0, mongoose_1.model)('todo', todoSchema);
exports.default = Todo;
