'use client';
import { useFormStatus } from 'react-dom';
import { useVehicleContext } from '@/state/errorState/vehicleContext';
import {
	checkIfUserRented,
	getTransactionsByDate,
} from '@/serverActions/vehicles';
import { useEffect } from 'react';

const SubmitButton = ({ label, element }) => {
	const { pending } = useFormStatus();

	const { state, setState } = useVehicleContext();

	useEffect(() => {
		setState({
			error: {},
			profile: {
				transactions: [],
			},
		});
	}, [element, setState]);

	const handleClick = async (e) => {
		e.preventDefault();
		const checkValue = e.target.form.elements?.namedItem(element)
			? e.target.form.elements?.namedItem(element)
			: null;

		if (checkValue === null) {
			setState((prevState) => {
				return { ...prevState, error: {} };
			});
			e.target.form.requestSubmit();
			return;
		}

		if (checkValue.name === 'userId') {
			e.preventDefault();
			console.log(label);
			// let error = label !== 'Use' ?
			if (checkValue.value === 'none') {
				setState((prevState) => {
					if (label === 'Reserve') {
						return {
							...prevState,
							error: {
								...prevState.error,
								reservationError: 'Please select a user.',
							},
						};
					} else {
						return {
							...prevState,
							error: {
								...prevState.error,
								useVehicle: 'Please select a user.',
							},
						};
					}
				});
				return;
			}

			// Ова да го поправам
			const hasUserRented = JSON.parse(
				await checkIfUserRented(checkValue.value)
			);

			if (hasUserRented) {
				console.log('THIS IS THE IT');
				setState((prevState) => ({
					...prevState,
					error: {
						...prevState.error,
						useVehicle: 'You have already requested a vehicle for use.',
					},
				}));
			} else {
				e.target.form.requestSubmit();
				setState((prevState) => ({
					...prevState,
					error: { ...prevState.error, useVehicle: '' },
				}));
			}
		}

		if (checkValue.name === 'from') {
			e.preventDefault();
			// console.log('PRESSED');
			const from = e.target.form.elements?.namedItem('from').value;
			if (from === '') {
				setState((prevState) => {
					return {
						...prevState,
						error: {
							profileTransactions: 'Please enter a date.',
						},
						profile: {
							transactions: [],
						},
					};
				});
				return;
			}
			const to = e.target.form.elements?.namedItem('to').value;
			console.log(new Date(from) > new Date(to));

			// console.log(from, to, 'OVA SEA');
			const transactions = JSON.parse(await getTransactionsByDate(from, to));
			// console.log(transactions, 'transactions');
			setState((prevState) => {
				return {
					...prevState,
					error: {
						profileTransactions: '',
					},
					profile: {
						transactions,
					},
				};
			});
		}
	};
	console.log(state, 'THE STATE');
	return (
		<button
			className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-semibold pt-[1px] pb-[3px] px-5 rounded'
			type='submit'
			aria-disabled={pending}
			onClick={handleClick}
			disabled={pending && 'disabled'}>
			{label}
		</button>
	);
};

export default SubmitButton;
