"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const todoSchema = joi_1.default.object({
    title: joi_1.default.string().min(2).max(50),
    status: joi_1.default.string().valid('unfinished', 'finished').optional(),
    endDate: joi_1.default.date().greater('now').allow('').optional(),
    todoId: joi_1.default.optional(),
});
exports.default = todoSchema;
