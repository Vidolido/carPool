'use client';
import { createContext, useContext, useState } from 'react';

export const VehicleContext = createContext();

export const VehicleContextProvider = ({ children }) => {
	const [state, setState] = useState({
		error: '',
		reservationError: '',
		profile: { dateSearch: [] },
	});

	return (
		<VehicleContext.Provider value={{ state, setState }}>
			{children}
		</VehicleContext.Provider>
	);
};

export const useVehicleContext = () => {
	return useContext(VehicleContext);
};
