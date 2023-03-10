"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_schedule_1 = __importDefault(require("node-schedule"));
const cancelNotification = (todoId) => {
    node_schedule_1.default.cancelJob(todoId);
};
exports.default = cancelNotification;
