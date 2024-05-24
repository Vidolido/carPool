import { rentVehicle } from '@/serverActions/vehicles';
import SubmitButton from '../Buttons/SubmitButton';

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

const VehiclePoolForm = ({ poolVehicles }) => {
	return (
		<form action={rentVehicle} className='flex gap-4'>
			<select
				name='vehicleId'
				className='w-[250px] self-end border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none cursor-pointer'>
				{poolVehicles.map((vehicle) => {
					return (
						<option key={vehicle._id} value={vehicle._id}>
							{vehicle.plates}
						</option>
					);
				})}
			</select>
			<select
				name='userId'
				className='w-[250px] self-end border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none cursor-pointer'>
				<option value='none'>--</option>
				{users.map((user) => {
					return (
						<option key={user.id} value={user.name}>
							{user.name}
						</option>
					);
				})}
			</select>
			<select
				name='location'
				className='w-[250px] self-end border-2 border-grey-50 border-opacity-60 rounded px-2 py-[1px] hover:border-red-200 focus:outline-none cursor-pointer'>
				{locations.map((location) => {
					return (
						<option key={location} value={location}>
							{location}
						</option>
					);
				})}
			</select>
			<SubmitButton label='Use' element='userId' />
		</form>
	);
};

export default VehiclePoolForm;
