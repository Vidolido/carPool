'use client';
import { useVehicleContext } from '@/state/errorState/vehicleContext';

const PoolTransactionsDisplay = () => {
	const { state } = useVehicleContext();
	const transactionsByDate = state?.profile.transactions;

	console.log(transactionsByDate, 'OVIJA');

	return (
		<div>
			Pool Transactions Display
			{transactionsByDate?.map((transaction) => {
				return <div key={transaction._id}>{transaction._id}</div>;
			})}
		</div>
	);
};

export default PoolTransactionsDisplay;
