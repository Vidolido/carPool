const ReservedVehicle = ({ transactions }) => {
	// console.log(transactions, 'The transactions');
	return (
		<div>
			<h2>Reserved Vehicles</h2>
			{transactions?.map((transaction) => {
				return (
					<div key={transaction._id} className='flex gap-4'>
						<p>{transaction.vehicle.plates}</p>
						<p>{transaction.user}</p>
						<p>{transaction.location}</p>
						<p>{transaction.rentTime}</p>
						<p>{new Date(transaction.date).toLocaleTimeString()}</p>
						{/* <button
								type='button'
								className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-semibold pt-[1px] pb-[3px] px-5 rounded'
								onClick={async () => {
									await returnVehicle(
										transaction._id,
										transaction?.vehicle._id
									);
								}}>
								Return
							</button> */}
					</div>
				);
			})}
		</div>
	);
};

export default ReservedVehicle;
