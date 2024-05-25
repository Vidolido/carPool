'use client';
import { useVehicleContext } from '@/state/errorState/vehicleContext';

const VehicleError = ({ errorFrom }) => {
	const { state } = useVehicleContext();

	return <div>{state.error[errorFrom]}</div>;
};

export default VehicleError;
