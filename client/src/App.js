import React from 'react';
import TopBar from './Component/topBar';
import Sidebar from './Component/sideBar';
import Routeur from './Routeur';
import Login from './Pages/login';
// console.log(test);


function App() {
	const admin = localStorage.getItem("admin_hotel")
	return (
		<>
			{admin !== 'connected' ? (
				<Login />
			) : (
				<div className="app">
					<header>
						<TopBar />
					</header>
					<section>
						<nav>
							<Sidebar />
						</nav>
						<article>
							<Routeur />
						</article>
					</section>
				</div>
			)}
		</>
	);
}

export default App;
