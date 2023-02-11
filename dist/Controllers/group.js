"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGroup = exports.deleteGroup = exports.createGroup = exports.getGroups = void 0;
const group_1 = __importDefault(require("../Models/group"));
const app_1 = require("../app");
const getGroups = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groups = yield group_1.default.find({ userId: res.locals.userId }).populate('todos');
        yield app_1.redisClient.set(res.locals.userId, JSON.stringify(groups), {
            EX: 30,
            NX: true,
        }); // NOTE  30 second for testing purpose
        res.status(200).json({ fromCache: false, groups });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getGroups = getGroups;
const createGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, todos, color, } = req.body;
        const group = new group_1.default({ name, color, todos, userId: res.locals.userId });
        yield group.save();
        res.status(200).json({ msg: 'group created sucessfully!', id: group._id });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.createGroup = createGroup;
const deleteGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.userId;
        const { groupId } = req.body;
        const group = yield group_1.default.findById(groupId);
        if (group && group.userId == userId) {
            yield group_1.default.findByIdAndDelete(groupId);
            res.status(200).json('group is deleted sucessfully!');
        }
        else {
            res.status(404).json('there is no such group');
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.deleteGroup = deleteGroup;
const updateGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.userId;
        const { groupId } = req.body;
        const group = yield group_1.default.findById(groupId);
        if (group && group.userId == userId) {
            yield group_1.default.findByIdAndUpdate(groupId, { $set: req.body });
            res.status(200).json('group is updated sucessfully!');
        }
        else {
            res.status(404).json('there is no such group');
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.updateGroup = updateGroup;
