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
exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../Models/user"));
const signToken_1 = __importDefault(require("../Utilities/signToken"));
const CustomError_1 = __importDefault(require("../helpers/CustomError"));
const { PEPPER, SR } = process.env;
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, password } = req.body;
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser) {
            return next((0, CustomError_1.default)(409, 'Email already used'));
        }
        const hashedPassword = yield bcrypt_1.default.hash(password + PEPPER, Number(SR));
        const user = new user_1.default({ email, name, password: hashedPassword });
        yield user.save();
        const token = yield (0, signToken_1.default)(user);
        res.status(200).json(`${token}`);
    }
    catch (err) {
        console.log('hey');
        res.status(500).json(err);
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.status(422).json('Wrong Credentials');
        }
        const validated = yield bcrypt_1.default.compare(password + PEPPER, user.password);
        if (!validated) {
            return res.status(422).json('Wrong Credentials');
        }
        const token = yield (0, signToken_1.default)(user);
        res.status(200).json(token);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.login = login;
