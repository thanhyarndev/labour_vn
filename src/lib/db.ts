import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
throw new Error("Missing MONGODB_URI in environment");
}


// In Next.js (App Router) dev mode, modules can reload; cache the connection globally
interface GlobalWithMongoose {
mongooseConn?: typeof mongoose;
mongoosePromise?: Promise<typeof mongoose>;
}


const globalWithMongoose = global as unknown as GlobalWithMongoose;


export async function connectToDatabase() {
if (globalWithMongoose.mongooseConn) return globalWithMongoose.mongooseConn;
if (!globalWithMongoose.mongoosePromise) {
// Optimized connection settings for Vercel serverless
mongoose.set('bufferCommands', false);

globalWithMongoose.mongoosePromise = mongoose.connect(MONGODB_URI, {
autoIndex: process.env.NODE_ENV !== "production",
maxPoolSize: 5, // Reduced for serverless
serverSelectionTimeoutMS: 5000, // Reduced timeout
socketTimeoutMS: 45000,
connectTimeoutMS: 10000,
bufferCommands: false,
});
}
globalWithMongoose.mongooseConn = await globalWithMongoose.mongoosePromise;
return globalWithMongoose.mongooseConn;
}