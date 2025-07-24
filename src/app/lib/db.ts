import { MongoClient, type MongoClientOptions } from 'mongodb';

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

const options: MongoClientOptions = {
  // Connection behavior
  retryWrites: true,
  retryReads: true,
  writeConcern: { w: 'majority' },
  
  // Connection pooling
  maxPoolSize: process.env.NODE_ENV === 'production' ? 10 : 5,
  minPoolSize: 1,
  maxIdleTimeMS: 30000,
  waitQueueTimeoutMS: 10000,
  
  // Timeouts
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000,
  serverSelectionTimeoutMS: 10000,
  
  // TLS/SSL configuration
  tls: process.env.NODE_ENV === 'production',
  tlsAllowInvalidCertificates: process.env.NODE_ENV !== 'production',
  
  // Compression
  compressors: ['zstd', 'snappy', 'zlib'],
  zlibCompressionLevel: 3,
  
  // Application identification
  appName: 'nextjs-app'
};

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development, reuse connection across module reloads
  if (!global._mongoClientPromise) {
    const client = new MongoClient(MONGODB_URI, options);
    global._mongoClientPromise = client.connect();
    
    process.on('beforeExit', async () => {
      await client.close();
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create new connection
  const client = new MongoClient(MONGODB_URI, options);
  clientPromise = client.connect();
  
  // For serverless environments, adjust pool size
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    clientPromise = clientPromise.then(connectedClient => {
      // Create a new client with adjusted pool size
      const serverlessOptions = {
        ...options,
        minPoolSize: 2
      };
      const serverlessClient = new MongoClient(MONGODB_URI, serverlessOptions);
      return serverlessClient.connect();
    });
  }
}

export default clientPromise;