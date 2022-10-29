import React, { useState } from 'react';
import TabRecettes from '../Component/tabRecettes';
import TitleBar from '../Component/titleBar';

const Recettes = () => {
	const [depart, setDepart] = useState("bar")
	// console.log(match.params.depart); 	
	return (
		<div className="recettes">
			<TitleBar title="les recettes"/>
			<nav className="tab_recette">
				<div className="onglets">
					<button
						className={depart === "bar" ? "active" : ""}
						onClick={() => setDepart("bar")}
					>bar</button>
					<button
						className={depart === "hebergement" ? "active" : ""}
						onClick={() => setDepart("hebergement")}
					>hebergement</button>
					<button
						className={depart === "restaurant" ? "active" : ""}
						onClick={() => setDepart("restaurant")}
					>restaurant</button>
				</div>
				{depart === "bar" &&
					<TabRecettes
						rapport={false}
						departement="bar"
						children={""}
					/>
				}
				{depart === "hebergement" &&
					<TabRecettes
						rapport={false}
						departement="hebergement"
						children={""}
					/>
				}
				{depart === "restaurant" &&
					<TabRecettes
						rapport={false}
						departement="restaurant"
						children={""}
					/>
				}
			</nav>
		</div >
	);
};

export default Recettes;