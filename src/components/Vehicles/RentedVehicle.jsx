'use client';
import { returnVehicle } from '@/serverActions/vehicles';

const RentedVehicle = ({ transactions }) => {
	return (
		<div>
			<h2>Vehicles in use</h2>
			<div>
				{transactions?.map((transaction) => {
					return (
						<div key={transaction._id} className='flex gap-4'>
							<p>{transaction.vehicle.plates}</p>
							<p>{transaction.user}</p>
							<p>{transaction.location}</p>
							<p>{transaction.rentTime}</p>
							<button
								type='button'
								className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-semibold pt-[1px] pb-[3px] px-5 rounded'
								onClick={async () => {
									await returnVehicle(transaction._id);
								}}>
								Return
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default RentedVehicle;
