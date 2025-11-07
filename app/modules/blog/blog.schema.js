"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var schema = mongoose_1.default.Schema;
var blogSchema = new schema({
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
