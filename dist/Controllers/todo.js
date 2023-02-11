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
exports.getTodosDev = exports.search = exports.updateTodo = exports.deleteTodo = exports.createTodo = exports.getTodos = exports.getAllTodos = void 0;
const todo_1 = __importDefault(require("../Models/todo"));
const assignNotification_1 = __importDefault(require("../Utilities/assignNotification"));
const cancelNotification_1 = __importDefault(require("../Utilities/cancelNotification"));
const todosPerPage = 6;
const getAllTodos = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo_1.default.find({ userId: res.locals.userId });
        res.status(200).json({ todos });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getAllTodos = getAllTodos;
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const todos = yield todo_1.default.find({ userId: res.locals.userId })
            .skip((page - 1) * todosPerPage)
            .limit(todosPerPage);
        const todosCount = yield todo_1.default.find({
            userId: res.locals.userId,
        }).countDocuments();
        res.status(200).json({ todos, todosCount, page });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getTodos = getTodos;
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, status, endDate } = req.body;
        const todo = new todo_1.default({
            title,
            status,
            endDate: endDate ? endDate : undefined,
            userId: res.locals.userId,
        });
        yield todo.save();
        if (endDate) {
            (0, assignNotification_1.default)(todo._id.toString(), new Date(endDate), title, res.locals.userId, false);
        }
        res.status(200).json({ msg: 'todo created sucessfully!', id: todo._id });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.createTodo = createTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.userId;
        const { todoId } = req.body;
        const todo = yield todo_1.default.findById(todoId);
        if (todo && todo.userId == userId) {
            yield todo_1.default.findByIdAndDelete(todoId);
            (0, cancelNotification_1.default)(todo._id.toString());
            res.status(200).json('todo is deleted sucessfully!');
        }
        else {
            res.status(404).json('there is no such a todo');
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.deleteTodo = deleteTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.userId;
        const { todoId } = req.body;
        const todo = yield todo_1.default.findById(todoId);
        if (todo && todo.userId == userId) {
            yield todo_1.default.findByIdAndUpdate(todoId, { $set: req.body });
            if (req.body.endDate) {
                (0, assignNotification_1.default)(todo._id.toString(), new Date(req.body.endDate), req.body.title, res.locals.userId, true);
            }
            res.status(200).json('todo is updated sucessfully!');
        }
        else {
            res.status(404).json('there is no such a todo');
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.updateTodo = updateTodo;
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const { status } = req.query;
        let todos;
        let todosCount;
        const { date } = req.body;
        if (date) {
            todosCount = yield todo_1.default.aggregate([
                {
                    $project: {
                        month: { $month: '$endDate' },
                        day: { $dayOfMonth: '$endDate' },
                    },
                },
                {
                    $match: {
                        day: new Date(date).getDate(),
                        month: new Date(date).getMonth() + 1,
                    },
                },
                {
                    $count: 'count',
                },
            ]);
            todos = yield todo_1.default.aggregate([
                {
                    $project: {
                        month: { $month: '$endDate' },
                        day: { $dayOfMonth: '$endDate' },
                        _id: 1,
                        title: 1,
                        status: 1,
                        endDate: 1,
                    },
                },
                {
                    $match: {
                        day: new Date(date).getDate(),
                        month: new Date(date).getMonth() + 1,
                    },
                },
                {
                    $skip: (page - 1) * todosPerPage,
                },
                {
                    $limit: todosPerPage,
                },
                {
                    $project: {
                        day: 0,
                        month: 0,
                    },
                },
            ]);
            todosCount = todosCount.length > 0 ? todosCount[0].count : 0;
        }
        else if (status) {
            todosCount = yield todo_1.default.find({
                status: status,
            }).countDocuments();
            todos = yield todo_1.default.find({ status: status })
                .skip((page - 1) * todosPerPage)
                .limit(todosPerPage);
        }
        else {
            const { query } = req.body;
            todosCount = yield todo_1.default.find({
                title: { $regex: query, $options: 'i' },
            }).countDocuments();
            todos = yield todo_1.default.find({ title: { $regex: query, $options: 'i' } })
                .skip((page - 1) * todosPerPage)
                .limit(todosPerPage);
        }
        res.status(200).json({ todos, todosCount, page });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.search = search;
// IMPORTANT  For dev only
const getTodosDev = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo_1.default.find();
        res.status(200).json(todos);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getTodosDev = getTodosDev;
