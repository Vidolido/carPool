'use client';

import { useState } from 'react';
import ReservationForm from './ReservationForm';

const MakeReservation = ({ vehicles, users, locations }) => {
	const [showItems, setShowItems] = useState(false);
	const handleClick = (e) => {
		console.log(e);
		setShowItems(!showItems);
	};
	return (
		<div>
			<button onClick={handleClick}>Make a reservation</button>
			<ReservationForm
				vehicles={vehicles}
				users={users}
				locations={locations}
			/>
		</div>
	);
};

export default MakeReservation;
