import React from "react";
import { Link } from "react-router-dom";

const TeamSection = ({ id, name, image, location }) => {
	return (
		<Link to={`/teams/${id}`}>
			<div className="wrapper">
				<div className="hero teamHero is-medium is-bold parent">
					<div className="hero-body child" style={{ backgroundImage: `url(${image})`}}>
						<h1 className="title has-text-white">{name}</h1>
						<p className="team-txt subtitle is-6">{location}</p>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default TeamSection;
