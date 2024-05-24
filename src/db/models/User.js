import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
	{
		name: String,
		vehicle: {
			type: mongoose.Types.ObjectId,
			ref: 'Vehicle',
		},
		workId: Number,
		role: String,
	},
	{ timestamps: true }
);
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
