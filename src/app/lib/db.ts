import { MongoClient } from 'mongodb';

declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error('Missing environment variable: MONGODB_URI');
}

const options = {
    retryWrites: true,
    retryReads: true,
    maxPoolSize: 10, // Reduced from 50 (see explanation below) :cite[2]:cite[5]
    socketTimeoutMS: 30000,
    connectTimeoutMS: 30000,
    serverSelectionTimeoutMS: 5000,
    heartbeatFrequencyMS: 10000
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(MONGODB_URI, options);
        global._mongoClientPromise = client.connect();
        // Avoid memory leaks by cleaning up on process exit :cite[7]
        process.on('exit', () => {
            if (client) client.close();
        });
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(MONGODB_URI, options);
    clientPromise = client.connect();
}

export default clientPromise;