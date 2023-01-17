import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		mongoose.set('strictQuery', false);
		await mongoose.connect(String(process.env.MONGODB_URI));
		console.log('Connected to DB');
	} catch (err) {
		throw new Error(`Failed to connect to MongoDB, ${err}`);
	}
};

export default connectDB;
