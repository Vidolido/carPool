import mongoose, { connect } from 'mongoose';

// export const connect = async () => {
// const dbUser = process.env.MONGO_USER;
// const dbPass = process.env.MONGO_PASS;
// const dbURL = process.env.MONGO_URL;
// const dbName = process.env.MONGO_DB_NAME;

// const connectionString = `mongodb+srv://${dbUser}:${dbPass}@${dbURL}/${dbName}?retryWrites=true&w=majority`;
const connectionString = process.env.MONGO_URI;

if (!connectionString) {
	throw new Error('Please define a db');
}

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 45000,
			family: 4, // Use IPv4, skip trying IPv6
		};

		cached.promise = connect(connectionString, opts).then((mongoose) => {
			return mongoose;
		});
	}

	try {
		cached.conn = await cached.promise;
	} catch (error) {
		cached.promise = null;
		throw error;
	}
	return cached.conn;
}
export default dbConnect;
