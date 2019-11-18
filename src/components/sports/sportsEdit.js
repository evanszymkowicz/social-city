import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const SportsCard = ({ id, name, image, address, date, hours, minutes }) => {
	return (
		<Link to={`/sports/${id}`}>
			<div className="card is-box-shadow">
				<div className="card-image">
					<figure className="image is-4by3">
						<img src={image} alt={name}  className="sportImage"/>
					</figure>
				</div>
				<div className="card-content">
					<div className="media">
						<div className="media-left">
							<div className="media-content">
								<p> {moment(date).format("MMM").toUpperCase()}</p>
								<p> {moment(date).format("DD")} </p>
							</div>
						</div>
						<div className="content">
							<div className="media-right">
								<h6><strong>{name}</strong></h6>
								<span className="index-span">{moment(date).format("ddd, MMMM D")}</span>
								<span className="index-span"> at {("0" + hours).slice(-2)}:{("0" + minutes).slice(-2)}</span>
								<p className="index-span-p">{address}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default SportsCard;
