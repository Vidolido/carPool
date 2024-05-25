'use server';
import { NextResponse } from 'next/server';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Transaction from '@/db/models/Transaction';

export async function GET() {
	try {
		await dbConnect();
		const transactions = await Transaction.find().populate('vehicle').exec();
		// console.log(transactionsOne, 'transactionOne');
		// const transactions = await Transaction.find({ status: 'pending' });
		return NextResponse.json({ transactions }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
