// components
import VehiclePoolForm from '@/components/Vehicles/VehiclePoolForm';
import RentedVehicle from '@/components/Vehicles/RentedVehicle';
import VehicleError from '@/components/Errors/VehicleError';
import MakeReservation from '@/components/Vehicles/MakeReservation';
import ReservedVehicle from '@/components/Vehicles/ReservedVehicle';
// import VehicleForm from '@/components/Vehicles/VehicleForm';

const users = [
	{
		id: 1,
		name: 'Boshko Boshkovski',
		workId: '2020',
		vehicleId: '',
	},
	{
		id: 2,
		name: 'Vane Vanevski',
		workId: '2021',
		vehicleId: '',
	},
	{
		id: 3,
		name: 'Bekrija Delija',
		workId: '2022',
		vehicleId: '',
	},
];

const locations = ['Okta', 'Skopje', 'Kumanovo'];

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
		(vehicle) =>
			vehicle.vehicleType === 'vehiclePool' && vehicle.inUse === false
	);
	const reservationVehicles = vehicles.filter(
		(vehicle) => vehicle.vehicleType === 'vehiclePool'
	);

	const { transactions } = await getTransactions();

	const pendingTransactions = transactions.filter(
		(transaction) => transaction.status === 'pending'
	);

	const reservedTransactions = transactions.filter(
		(transaction) => transaction.status === 'reserved'
	);
	// console.log(reservedTransactions, 'OVIE');
	return (
		<main>
			<h1>Available Vehicles</h1>
			<VehiclePoolForm
				poolVehicles={poolVehicles}
				users={users}
				locations={locations}
			/>
			<VehicleError />
			<MakeReservation
				vehicles={reservationVehicles}
				users={users}
				locations={locations}
			/>

			<br />
			<hr />
			<br />
			<RentedVehicle transactions={pendingTransactions} />
			<br />
			<hr />
			<br />
			<ReservedVehicle transactions={reservedTransactions} />
		</main>
	);
}
