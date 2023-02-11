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
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const cacheGroups = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cachedGroups = yield app_1.redisClient.get(res.locals.userId);
        if (cachedGroups) {
            res
                .status(200)
                .json({ fromCache: true, groups: JSON.parse(cachedGroups) });
        }
        else {
            next();
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.default = cacheGroups;
