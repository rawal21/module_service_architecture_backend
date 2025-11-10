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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
const blog_schema_1 = __importDefault(require("./blog.schema"));
dotenv.config(); // loads environment variables from .env
// --- Connect to MongoDB ---
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield mongoose_1.default.connect("mongodb://localhost:27017/bs");
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1);
    }
});
// --- Sample Seeder Data ---
const seedBlogs = [
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
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectDB();
        yield blog_schema_1.default.deleteMany(); // Clear existing data
        console.log("🗑️  Existing blogs removed");
        yield blog_schema_1.default.insertMany(seedBlogs);
        console.log("🌱 Blog data seeded successfully!");
        process.exit(0);
    }
    catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
});
importData();
