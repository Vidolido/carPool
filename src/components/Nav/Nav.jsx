import NavLinks from './NavLinks';

const links = {
	home: {
		label: 'Pool',
		path: '/',
	},
	vehicleList: {
		label: 'Vehicles',
		path: '/vehicleList',
	},
	// userList: {
	// 	label: 'Users',
	// 	path: '/userList',
	// },
	profile: {
		label: 'Profile',
		path: '/profile',
	},
	login: {
		label: 'Login',
		path: '/login',
	},
};

const Nav = () => {
	return (
		<header className='flex justify-between'>
			<div>Logo</div>
			<nav className='flex justify-between gap-2 p-5'>
				{Object.entries(links).map(([id, link]) => {
					return <NavLinks key={id} link={link} />;
				})}
			</nav>
		</header>
	);
};

export default Nav;
