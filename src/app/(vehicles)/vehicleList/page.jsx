import SedanSvg from '@/../public/sedan.svg';
import PickUpSvg from '@/../public/pickup.svg';
import SUVSvg from '@/../public/suv.svg';

import Link from 'next/link';
import { getVehicles } from '@/app/page';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
	const { vehicles } = await getVehicles();

	return (
		<div>
			<h1>Vehicles List</h1>
			<div>
				{vehicles.map((vehicle) => {
					return (
						<Link
							key={vehicle._id}
							href={`/vehicleList/${vehicle._id}`}
							className='flex gap-4 items-center h-12 odd:bg-slate-200'>
							<div className='w-12 flex justify-center items-center'>
								<SedanSvg className='w-10 h-10' />
							</div>
							{/* <PickUpSvg className='w-[30px] h-[30px]  fill-red-700' /> */}
							{/* <SUVSvg className='w-[30px] h-[30px]' /> */}
							<p className='text-center'>{vehicle.plates}</p>
							<p className='text-center'>{vehicle.user}</p>
							<p className='text-center'>{vehicle.vehicleType}</p>
						</Link>
					);
				})}
			</div>
			<Link
				href='/addVehicles'
				className='border border-red-300 hover:bg-red-300 rounded p-1'>
				Add Vehicle
			</Link>
		</div>
	);
};

export default page;
