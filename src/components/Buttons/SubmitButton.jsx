'use client';
import { useFormStatus } from 'react-dom';
import { useVehicleContext } from '@/state/errorState/vehicleContext';
import { getTransactionsByDate } from '@/serverActions/vehicles';

const SubmitButton = ({ label, element }) => {
	const { pending } = useFormStatus();

	const { setState } = useVehicleContext();

	// console.log(state, 'the STATE');

	const handleClick = async (e) => {
		const checkValue = e.target.form.elements?.namedItem(element)
			? e.target.form.elements?.namedItem(element)
			: null;

		if (checkValue === null) {
			e.target.form.requestSubmit();
			setState((prevState) => {
				return { ...prevState, error: '' };
			});
		}

		if (checkValue.value === 'none') {
			e.preventDefault();
			setState((prevState) => {
				return { ...prevState, error: 'Please select a user.' };
			});
		}

		if (checkValue.name === 'from') {
			e.preventDefault();
			// console.log('PRESSED');
			const from = e.target.form.elements?.namedItem('from').value;
			if (from === '') {
				setState((prevState) => {
					return {
						...prevState,
						error: 'Please enter a date.',
						profile: {
							transactions: [],
						},
					};
				});
				return;
			}
			const to = e.target.form.elements?.namedItem('to').value;
			console.log(from, to, 'OVA SEA');
			const transactions = JSON.parse(await getTransactionsByDate(from, to));
			// console.log(transactions, 'transactions');
			setState((prevState) => {
				return {
					...prevState,
					error: '',
					profile: {
						transactions,
					},
				};
			});
		}
	};
	console.log('BYPASS');
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
