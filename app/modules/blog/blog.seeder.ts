import mongoose from "mongoose";
import  * as dotenv from "dotenv";
import blogSchema from "./blog.schema";

dotenv.config(); // loads environment variables from .env

// --- Connect to MongoDB ---
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/bs");
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

// --- Sample Seeder Data ---
const seedBlogs = [
  {
    title: "Mastering the MERN Stack in 2025",
    content:
      "The MERN stack remains one of the most powerful combinations for building full-stack web applications. This guide explores new trends and tools in 2025.",
    slug: "mastering-mern-stack-2025",
    author: new mongoose.Types.ObjectId("690cd1a8a7a6f608483a3bdd"),
    tag: ["MERN", "Web Development", "JavaScript"],
    category: "Programming",
  },
  {
    title: "Understanding NestJS: A Modern Backend Framework",
    content:
      "NestJS combines TypeScript, modular design, and scalability — making it perfect for building enterprise-grade applications.",
    slug: "understanding-nestjs-modern-backend",
    author: new mongoose.Types.ObjectId("690cd1a8a7a6f608483a3bdd"),
    tag: ["NestJS", "Backend", "TypeScript"],
    category: "Technology",
  },
  {
    title: "Exploring AI Tools for Developers",
    content:
      "From Copilot to ChatGPT, AI is transforming how developers write and debug code. Let’s explore the top AI tools in 2025.",
    slug: "exploring-ai-tools-for-developers",
    author: new mongoose.Types.ObjectId("690cd1a8a7a6f608483a3bdd"),
    tag: ["AI", "Machine Learning", "Tools"],
    category: "Artificial Intelligence",
  },
];

// --- Seeder Function ---
const importData = async () => {
  try {
    await connectDB();

    await blogSchema.deleteMany(); // Clear existing data
    console.log("🗑️  Existing blogs removed");

    await blogSchema.insertMany(seedBlogs);
    console.log("🌱 Blog data seeded successfully!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

importData();
