import mongoose, { Types } from "mongoose";
import { blogDto } from "./blog.dto";

const schema = mongoose.Schema;

const blogSchema = new schema<blogDto>({
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
  category : {
    type : String
  }
}, { timestamps: true });

export default mongoose.model<blogDto>("Blog" , blogSchema);
 
