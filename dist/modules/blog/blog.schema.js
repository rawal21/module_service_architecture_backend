"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = mongoose_1.default.Schema;
const blogSchema = new schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    author: {
        type: schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tag: {
        type: [String],
        default: [],
    },
    category: {
        type: String
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Blog", blogSchema);
