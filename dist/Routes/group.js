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
const groupsController = __importStar(require("../Controllers/group"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const validateGroup_1 = __importDefault(require("../middleware/validateGroup"));
const cacheGroups_1 = __importDefault(require("../middleware/cacheGroups"));
const router = (0, express_1.Router)();
router.get('/', verifyToken_1.default, cacheGroups_1.default, groupsController.getGroups);
router.post('/', verifyToken_1.default, validateGroup_1.default, groupsController.createGroup);
router.delete('/', verifyToken_1.default, groupsController.deleteGroup);
router.patch('/', verifyToken_1.default, validateGroup_1.default, groupsController.updateGroup);
exports.default = router;
