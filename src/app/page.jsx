// components
import VehiclePoolForm from '@/components/Vehicles/VehiclePoolForm';
import RentedVehicle from '@/components/Vehicles/RentedVehicle';
import VehicleError from '@/components/Errors/VehicleError';
// import VehicleForm from '@/components/Vehicles/VehicleForm';

export async function getVehicles() {
	const res = await fetch('http://localhost:3000/api/vehicles');

	if (!res.ok) {
		console.log(res);
		throw new Error('Failed to get vehicles from db. Reason: ' + res);
	}

	return res.json();
}

export async function getTransactions() {
	const res = await fetch('http://localhost:3000/api/transactions');

	if (!res.ok) {
		console.log(res);
		throw new Error('Failed to get transactions from db. Reason: ' + res);
	}

	return res.json();
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function page() {
	const { vehicles } = await getVehicles();
	const poolVehicles = vehicles.filter(
		(vehicle) => vehicle.vehicleType === 'vehiclePool'
	);
	const { transactions } = await getTransactions();
	// console.log(transactions, 'OVIE');
	return (
		<main>
			<h1>Available Vehicles</h1>
			<VehiclePoolForm poolVehicles={poolVehicles} />
			<VehicleError />

			<br />
			<hr />
			<br />
			<RentedVehicle transactions={transactions} />
			{/* <VehicleForm transactions={transactions} /> */}
		</main>
	);
}
