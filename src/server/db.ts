import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/labour_vn';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// In Next.js (App Router) dev mode, modules can reload; cache the connection globally
interface GlobalWithMongoose {
  mongooseConn?: typeof mongoose;
  mongoosePromise?: Promise<typeof mongoose>;
}

const globalWithMongoose = global as unknown as GlobalWithMongoose;

async function getDb() {
  if (globalWithMongoose.mongooseConn) return globalWithMongoose.mongooseConn;
  if (!globalWithMongoose.mongoosePromise) {
    globalWithMongoose.mongoosePromise = mongoose.connect(MONGODB_URI, {
      autoIndex: process.env.NODE_ENV !== "production",
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
    });
  }
  globalWithMongoose.mongooseConn = await globalWithMongoose.mongoosePromise;
  return globalWithMongoose.mongooseConn;
}

export { getDb };
