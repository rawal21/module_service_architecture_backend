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
exports.generateToken = exports.validPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validPassword = (value, password) => __awaiter(void 0, void 0, void 0, function* () {
    const campare = yield bcrypt_1.default.compare(value, password);
    return campare;
});
exports.validPassword = validPassword;
const generateToken = (user) => {
    const payload = {
        _id: user._id,
        username: user.username,
        gmail: user.gmail
    };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT, {
        expiresIn: '7d'
    });
    return token;
};
exports.generateToken = generateToken;
