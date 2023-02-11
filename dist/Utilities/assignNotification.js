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
const node_schedule_1 = __importDefault(require("node-schedule"));
const notification_1 = __importDefault(require("../Models/notification"));
const user_1 = __importDefault(require("../Models/user"));
const sendmail_1 = __importDefault(require("./sendmail"));
const assignNotification = (todoId, date, todoTitle, userId, update) => {
    if (update) {
        node_schedule_1.default.cancelJob(todoId);
    }
    const minutes = 30;
    node_schedule_1.default.scheduleJob(todoId, new Date(date.getTime() - minutes * 60000), () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const notification = new notification_1.default({
                message: `Remember to finish your todo: ${todoTitle}`,
                userId,
            });
            yield notification.save();
            const user = yield user_1.default.findById(userId);
            const to = user === null || user === void 0 ? void 0 : user.email;
            const from = 'ogswebproject@gmail.com';
            const subject = 'Todo Reminder';
            const output = `
        <p>Remember to finish your todo: ${todoTitle}</p>
        `;
            (0, sendmail_1.default)(to, from, subject, output);
        }
        catch (err) {
            console.log(err);
        }
    }));
};
exports.default = assignNotification;
