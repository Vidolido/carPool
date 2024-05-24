'use client';
import { useVehicleContext } from '@/state/errorState/vehicleContext';

const VehicleError = () => {
	const { state } = useVehicleContext();

	return <div>{state.error}</div>;
};

export default VehicleError;
