"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoController = __importStar(require("../Controllers/todo"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const validateTodo_1 = __importDefault(require("../middleware/validateTodo"));
const router = (0, express_1.Router)();
router.get('/', verifyToken_1.default, todoController.getTodos);
router.post('/', verifyToken_1.default, validateTodo_1.default, todoController.createTodo);
router.delete('/', verifyToken_1.default, todoController.deleteTodo);
router.patch('/', verifyToken_1.default, validateTodo_1.default, todoController.updateTodo);
router.get('/all', verifyToken_1.default, todoController.getAllTodos);
router.post('/search', verifyToken_1.default, todoController.search);
// IMPORTANT  for development purpose only
router.get('/v1/dev', verifyToken_1.default, todoController.getTodosDev);
exports.default = router;
