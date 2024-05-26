'use client';
import { useVehicleContext } from '@/state/errorState/vehicleContext';
import PoolTransactionCard from './PoolTransactionCard';

const PoolTransactionsDisplay = () => {
	const { state } = useVehicleContext();
	const transactionsByDate = state?.profile.transactions;

	// console.log(transactionsByDate, 'OVIJA');

	return (
		<div>
			Pool Transactions Display
			{/* {transactionsByDate?.map((transaction) => {
				return <div key={transaction._id}>{transaction._id}</div>;
			})} */}
			<div className='flex flex-wrap gap-2'>
				{transactionsByDate?.map((transaction) => (
					<PoolTransactionCard
						key={transaction._id}
						transaction={transaction}
					/>
				))}
			</div>
		</div>
	);
};

export default PoolTransactionsDisplay;
