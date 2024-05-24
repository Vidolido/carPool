'use server';
// import { getTransactions } from '@/app/page';

import PoolTransactionsDisplay from '@/components/ProfileRentals/PoolTransactionsDisplay';
import ProfileRentalsForm from '@/components/ProfileRentals/ProfileRentalsForm';

const page = async () => {
	return (
		<div>
			<ProfileRentalsForm />
			<hr />
			<PoolTransactionsDisplay />
		</div>
	);
};

export default page;
