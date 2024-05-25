'use client';
import { useVehicleContext } from '@/state/errorState/vehicleContext';

const ReservationError = () => {
	const { state } = useVehicleContext();

	return <div>{state.reservationError}</div>;
};

export default ReservationError;
