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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.loginUser = exports.createUser = void 0;
const userService = __importStar(require("./user.service"));
const http_errors_1 = __importDefault(require("http-errors"));
const response_helper_1 = require("../../common/helper/response.helper");
const jwt_services_1 = require("../../services/jwt.services");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, gmail } = req.body;
    const existUser = yield userService.getUserByGmail(gmail);
    if (existUser) {
        throw (0, http_errors_1.default)(402, "user with this gmail alreay exist !");
    }
    const result = yield userService.createUser(req.body);
    res.send((0, response_helper_1.createResponse)(result, "User created succesfully"));
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gmail, password } = req.body;
    console.log(req.body);
    if (!gmail || !password) {
        throw (0, http_errors_1.default)(400, "all flied required !");
    }
    const user = yield userService.getUserByGmail(gmail);
    if (!user) {
        throw (0, http_errors_1.default)(404, "user not found ");
    }
    const isValid = yield (0, jwt_services_1.validPassword)(password, user.password);
    if (!isValid) {
        throw (0, http_errors_1.default)(403, "credentials are not valid !");
    }
    const token = (0, jwt_services_1.generateToken)(user);
    const result = {
        user: user,
        token: token,
    };
    res.send((0, response_helper_1.createResponse)(result, "login sucess !"));
});
exports.loginUser = loginUser;
