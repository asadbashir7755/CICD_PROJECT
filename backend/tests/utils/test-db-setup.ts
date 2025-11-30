import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer: MongoMemoryServer;

/**
 * Connect to the in-memory database.
 */
export const connectTestDB = async () => {
    // Create an in-memory MongoDB instance
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    // Connect mongoose to the in-memory database
    await mongoose.connect(mongoUri);
};

/**
 * Drop database, close the connection and stop the in-memory server.
 */
export const closeTestDB = async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    }
    if (mongoServer) {
        await mongoServer.stop();
    }
};

/**
 * Remove all the data for all db collections.
 */
export const clearTestDB = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
};
