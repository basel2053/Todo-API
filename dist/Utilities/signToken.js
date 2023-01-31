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
const jsonwebtoken_1 = require("jsonwebtoken");
const util_1 = require("util");
const signTokenAsync = (0, util_1.promisify)(jsonwebtoken_1.sign);
const signToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield signTokenAsync({ user }, process.env.JWT_SECRET)); // pass third argument for expiration date {expiresIn:"1h"}
});
exports.default = signToken;
