'use server';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Vehicle from '@/db/models/Vehicle';
import Transaction from '@/db/models/Transaction';
import { revalidatePath } from 'next/cache';

export async function addNewVehicle(formData) {
	const payload = {
		user: formData.get('user'),
		plates: formData.get('plates'),
		color: formData.get('color'),
		equipment: formData.get('equipment'),
		insurance: formData.get('insurance'),
		vehicleType: formData.get('vehicleType'),
		inUse: formData.get('inUse') === 'on' ? true : false,
		registration: {
			last: formData.get('registrationLast'),
			next: formData.get('registrationNext'),
		},
		service: {
			small: {
				km: formData.get('smallServiceKM'),
				date: formData.get('smallServiceDate'),
			},
			big: {
				km: formData.get('bigServiceKM'),
				date: formData.get('bigServiceDate'),
			},
			km: formData.get('serviceKM'),
		},
		tireChange: {
			summer: formData.get('tireChangeSummer'),
			winter: formData.get('tireChangeWinter'),
		},
	};
	// console.log(payload, 'the payload');
	try {
		await dbConnect();
		await Vehicle.create(payload);
	} catch (error) {
		console.log('addNewVehicle error:', error);
		throw Error('Could not add vehicle to database: ' + error);
	}
}

export async function rentVehicle(formData) {
	// console.log(formData);
	const payload = {
		user: formData.get('userId'),
		vehicle: formData.get('vehicleId'),
		location: formData.get('location'),
		date: new Date(),
		rentTime: new Date(),
		status: 'pending',
	};

	// console.log(payload);

	try {
		await dbConnect();
		if (payload.user === 'none') {
			// console.log('IT IS');
			return;
			// return { error: 'Please choose a user.' };
		} else {
			await Vehicle.updateOne(
				{ _id: payload.vehicle },
				{ user: payload.user, inUse: true }
			);
			await Transaction.create(payload);
			revalidatePath('/', 'page');
		}
	} catch (error) {
		console.log('rentVehicle error:', error);
		throw Error('Could not insert transaction to database: ' + error);
	}
}

export const returnVehicle = async (transactionId, vehicleId) => {
	console.log(transactionId, vehicleId, 'the transactionId, vehicleId');
	try {
		await dbConnect();
		await Vehicle.updateOne({ _id: vehicleId }, { user: 'none', inUse: false });
		await Transaction.updateOne(
			{ _id: transactionId },
			{ status: 'complete', returnTime: new Date() }
		);
		revalidatePath('/', 'page');
	} catch (error) {
		console.log('returnVehicle error:', error);
		throw Error('Could not insert transaction to database: ' + error);
	}
};

// Vehicle Profile
export const getTransactionsByDate = async (from, to) => {
	const fromDate = new Date(from).toISOString().split('T')[0];
	const tomorow = new Date(from);
	tomorow.setDate(new Date(from).getDate() + 1);
	const toDate = !to
		? tomorow
		: new Date(new Date(to).setDate(new Date(to).getDate() + 1));

	const payload = {
		date: { $gte: fromDate, $lt: toDate },
		status: 'complete',
	};

	try {
		await dbConnect();
		const transactions = await Transaction.find(payload);
		return JSON.stringify(transactions);
	} catch (error) {
		console.log('returnVehicle error:', error);
		throw Error('Could not insert transaction to database: ' + error);
	}
};
