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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var dotenv = require("dotenv");
var blog_schema_1 = require("./blog.schema");
dotenv.config(); // loads environment variables from .env
// --- Connect to MongoDB ---
var connectDB = function () { return __awaiter(void 0, void 0, void 0, function () {
    var conn, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, mongoose_1.default.connect("mongodb://localhost:27017/bs")];
            case 1:
                conn = _a.sent();
                console.log("\u2705 MongoDB Connected: ".concat(conn.connection.host));
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error("❌ MongoDB connection failed:", error_1);
                process.exit(1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// --- Sample Seeder Data ---
var seedBlogs = [
    {
        title: "Mastering the MERN Stack in 2025",
        content: "The MERN stack remains one of the most powerful combinations for building full-stack web applications. This guide explores new trends and tools in 2025.",
        slug: "mastering-mern-stack-2025",
        author: new mongoose_1.default.Types.ObjectId("690cd1a8a7a6f608483a3bdd"),
        tag: ["MERN", "Web Development", "JavaScript"],
        category: "Programming",
    },
    {
        title: "Understanding NestJS: A Modern Backend Framework",
        content: "NestJS combines TypeScript, modular design, and scalability — making it perfect for building enterprise-grade applications.",
        slug: "understanding-nestjs-modern-backend",
        author: new mongoose_1.default.Types.ObjectId("690cd1a8a7a6f608483a3bdd"),
        tag: ["NestJS", "Backend", "TypeScript"],
        category: "Technology",
    },
    {
        title: "Exploring AI Tools for Developers",
        content: "From Copilot to ChatGPT, AI is transforming how developers write and debug code. Let’s explore the top AI tools in 2025.",
        slug: "exploring-ai-tools-for-developers",
        author: new mongoose_1.default.Types.ObjectId("690cd1a8a7a6f608483a3bdd"),
        tag: ["AI", "Machine Learning", "Tools"],
        category: "Artificial Intelligence",
    },
];
// --- Seeder Function ---
var importData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, connectDB()];
            case 1:
                _a.sent();
                return [4 /*yield*/, blog_schema_1.default.deleteMany()];
            case 2:
                _a.sent(); // Clear existing data
                console.log("🗑️  Existing blogs removed");
                return [4 /*yield*/, blog_schema_1.default.insertMany(seedBlogs)];
            case 3:
                _a.sent();
                console.log("🌱 Blog data seeded successfully!");
                process.exit(0);
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.error("❌ Error seeding data:", error_2);
                process.exit(1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
importData();
