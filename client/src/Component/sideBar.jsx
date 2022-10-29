import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';

const SideBar = () => {
	const [matches] = useState(window.matchMedia("(max-width: 600px)").matches)
	const [etat, setEtat] = useState(false);

	const [data, setData] = useState([]);
	const toggleSideBar = () => etat ? setEtat(false) : setEtat(true)
	const search = (e) => {
		e.preventDefault()
		console.log("rechercher");
	}
	let path = window.location.pathname;
	let link = "/";
	if (path === "/" || path === "/home") link = path;

	useEffect(() => {
		getUsers(localStorage.getItem("userId"));
	}, [])
	const getUsers = (id) => {
		axios.get(`/api/users/${id}`)
			.then(res => {
				setData(res.data);
			}).catch(error => console.warn(error))
	}
	return (
		<div className="side_bar_content" onClick={matches ? () => etat ? setEtat(false) : null : null}>
			<div className={etat === true ? "sidebar open" : "sidebar"}>
				<div className="bar">
					<i onClick={toggleSideBar} className={etat ? "fas fa-times" : "fas fa-bars"} id="btn"></i>
				</div>
				<br />
				<ul className="nav_list">
					<li className="li_search">
						<form onSubmit={search}>
							<i
								type='submit'
								onClick={() => etat ? document.getElementById("search").click() : toggleSideBar()}
								className="fa s fa-search"
							></i>
							<input type="search" placeholder="rechercher" />
							<button id='search' hidden></button>
						</form>
					</li>
					<li>
						<NavLink
							exact to={link}
							id='home'
							activeClassName="active"
						>
							<i className="fas fa-home"></i>
							<span className="links_name">Accueil</span>
						</NavLink>
						<span className="tooltip">Accueil</span>
					</li>
					<li>
						<NavLink
							to="/analytics"
							activeClassName="active"
						>
							<i className="fas fa-chart-pie"></i>
							<span className="links_name">Statistiques</span>
						</NavLink>
						<span className="tooltip">Statistiques</span>
					</li>
					<li>
						<NavLink
							to="/recettes" activeClassName="active"
						>
							<i className="fas fa-cash-register"></i>
							<span className="links_name">recettes</span>
						</NavLink>
						<span className="tooltip">recettes</span>
					</li>
					<li>
						<NavLink
							to="/depenses" activeClassName="active"
						>
							<i className="fas fa-shopping-cart"></i>
							<span className="links_name">dépenses</span>
						</NavLink>
						<span className="tooltip">dépenses</span>
					</li>
					<li>
						<NavLink
							to="/employees" activeClassName="active"
						>
							<i className="fas fa-user-friends"></i>
							<span className="links_name">employés</span>
						</NavLink>
						<span className="tooltip">employés</span>
					</li>
					<li>
						<NavLink
							to="/rapport" activeClassName="active"
						>
							<i className="fas fa-align-center"></i>
							<span className="links_name">rapport</span>
						</NavLink>
						<span className="tooltip">rapport</span>
					</li>
					<li>
						<NavLink
							to="/helps" activeClassName="active"
						>
							<i className="fas fa-info"></i>
							<span className="links_name">centre d'aide</span>
						</NavLink>
						<span className="tooltip">centre d'aide</span>
					</li>
					<li>
						<NavLink
							to="/settings" activeClassName="active"
						>
							<i className="fas fa-cog"></i>
							<span className="links_name">paramètres</span>
						</NavLink>
						<span className="tooltip">paramètres</span>
					</li>
					{
						(data.role === 'super-admin') &&
						<li>
							<NavLink
								to="/admin" activeClassName="active"
							>
								<i style={{ color: "var(--yellow)" }} className="fas fa-crown"></i>
								<span className="links_name">super admin</span>
							</NavLink>
							<span className="tooltip">super admin</span>
						</li>
					}
				</ul>
				<span className='version'>{`version ${process.env.REACT_APP_VERSION}`}</span>
			</div>
		</div>
	);
};

export default SideBar;